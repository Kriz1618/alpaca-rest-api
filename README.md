# Welcome to Alpaca API 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

> Testing Alpaca treading API

## Creation steps

* Initialize project
```sh
 npm init -y
```

* Install main modules
```sh
  npm install  ts-node express morgan axios cors dotenv joi node-cron axios
  npm install -D typescript @types/express nodemon @types/morgan @types/axios @types/cors @hapi/joi @types/node-cron @types/axios
```

* Initialize Typescript to generate the `tsconfig.json` file
```sh
	npx tsc --init
```

* Setting up the `tsconfig.json` file, by specifying the compiler options, check [documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
```sh
	{
		"compilerOptions": {
			"forceConsistentCasingInFileNames": true,
			"module": "commonjs",
			"esModuleInterop": true,
			"outDir": "./build",
			"rootDir": "./source",
			"target": "es6",
			"skipLibCheck": true,
			"strict": true
		}
	}
```

* Creating the .env file
* Adding scripts in the `package.json` file
```sh
"scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "nodemon"
  }
```

* Structuring the project modules


## Run tests

```sh
npm run test
```

## Author

👤 **Christian**

* Github: [@Kriz1618](https://github.com/Kriz1618)

## Show your support

Give a ⭐️ if this project helped you!


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_