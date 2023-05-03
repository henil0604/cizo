import axios, { type AxiosInstance, type AxiosResponse } from "axios";

type Methods = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "PATCH";

interface CizuClientOptions {
    host: string;
    endpoint: string;
}

interface Endpoint {
    path: string;
    name: string;
    methods: "any" | Methods[];
}

interface Schema {
    version?: string;
    endpoints: Endpoint[];
}

interface QueryOptions {
    method: Methods;
    data: {
        [key: string]: unknown;
    };
    params: {
        [key: string]: unknown;
    };
    other: any;
}

class CizuClient {
    options: CizuClientOptions;
    server: AxiosInstance;
    schema?: Schema;

    public constructor(options?: Partial<CizuClientOptions>) {
        this.options = {
            host: "http://localhost:3000",
            endpoint: "/_cizu-schema",
            ...options,
        };

        this.server = axios.create({
            baseURL: this.host,
        });

        this.schema = null;
    }

    public async init() {
        try {
            const schemaResponse = await this.server.get(this.endpoint);

            if (!schemaResponse.data) {
                console.log(
                    "Error",
                    `${this.schemaURL} did not provide any data`
                );
            }

            const schema: Schema = schemaResponse.data;

            // Endpoint Transformer
            schema.endpoints = schema.endpoints.map((endpoint) => {
                if (
                    endpoint.methods !== "any" &&
                    typeof endpoint.methods === "string"
                ) {
                    endpoint.methods = [endpoint.methods];
                }
                return endpoint;
            });

            this.schema = schema;
        } catch (error: any) {
            if (error.response) {
                console.log("Error", error.message);
            } else if (error.request) {
                console.error(`Failed to fetch '${this.schemaURL}'`);
            } else {
                console.log("Error", error.message);
            }
        }
    }

    public getEndpointByName(name: string) {
        if (!this.schema) return null;

        return (
            this.schema.endpoints.find((endpoint) => {
                return endpoint.name === name;
            }) || null
        );
    }

    public async query(name: string, options: Partial<QueryOptions>) {
        const endpoint = this.getEndpointByName(name);

        if (
            endpoint.methods !== "any" &&
            endpoint.methods.includes(options.method) === false
        ) {
            throw new Error(`Endpoint does not support method "${options.method
                }" \nAllowed Methods: ${JSON.stringify(
                    endpoint.methods
                )}\nEndpoint Path: ${endpoint.path}
            `);
        }

        const response = await this.server({
            url: endpoint.path,
            method: options.method,
            data: {
                ...options.data,
            },
            params: {
                ...options.params,
            },
            ...options.other,
        });

        return response.data;
    }

    public get(
        name: string,
        params?: QueryOptions["params"],
        other?: QueryOptions["other"]
    ) {
        return this.query(name, {
            method: "GET",
            params,
            other,
        });
    }

    public post(
        name: string,
        data?: QueryOptions["data"],
        params?: QueryOptions["params"],
        other?: QueryOptions["other"]
    ) {
        return this.query(name, {
            method: "POST",
            data,
            params,
            other,
        });
    }

    get host() {
        return this.options.host;
    }

    get endpoint() {
        return this.options.endpoint;
    }

    get schemaURL() {
        return this.host + this.endpoint;
    }
}

export default CizuClient;
