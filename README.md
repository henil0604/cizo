<h1 align="center">Welcome to Cizo 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/cizo" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/cizo.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/realhenil" target="_blank">
    <img alt="Twitter: realhenil" src="https://img.shields.io/twitter/follow/realhenil.svg?style=social" />
  </a>
</p>

> REST API Integration made easy

### 🏠 [Homepage](https://github.com/henil0604/cizo#readme)

## Install

```sh
npm install cizo
```

## Ideology

This library aims to simplify how client side applications interects with backend REST APIs. Cizo uses object oriented approach to interect with REST API.

## Quick Start

> server-side

On the Server side you will have to open a public end-point at `/_cizo-schema` (however, you can custumize this on client-side). This open endpoint should send JSON Schema something like this: 

```json
{
    "version": "0.1.0",
    "endpoints": [
        {
            "path": "/hello-world",
            "name": "HelloWorld",
            "methods": "any"
        },
        {
            "path": "/other",
            "name": "other",
            "methods": ["GET", "POST"]
        }
    ]
}
```

> client-side
```js
import CizoClient from 'cizo';

const cizo = new CizoClient({
    host: 'http://localhost:3000', // default
    endpoint: '/_cizo-schema' // default
})

await cizo.init() // this is required to fetch schema

// Performing a query
cizo.get('HelloWorld').then(console.log).catch((error)=>{
    console.error("Error", error)
})

```


## Author

👤 **Henil Malaviya**

* E-mail: [me@henil.xyz](mailto:me@henil.xyz)
* Website: [henil.xyz](https://henil.xyz)
* Twitter: [@realhenil](https://twitter.com/realhenil)
* Github: [@henil0604](https://github.com/henil0604)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/henil0604/filic/issues). 

## Show your support

Give a ⭐️ if this project helped you!
