# Name of the micro-service
> Additional information or tagline

A brief description of your project, what it is used for.

## Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up &
running.

```shell
git clone microservice  # clone the repo
nvm install && nvm use  # .nvmrc specifies the node version, which this command installs
npm i                   # install all packages
docker-compose up       # boot up third party dependencies
npm build               # transpile typescript into js
npm start               # start the service
```

## Developing

```shell
npm run build     # cleans, transpiles and lints your changes (used in in Dockerfile & IBM Cloud)
npm run serve     # runs transpiled main.js with node runtime (used in in Dockerfile & IBM Cloud)
npm run watch     # start this will watch (compile + run) you changes on save (dev purposes)
npm run test:cov  # runs all tests + converage report (used in in Dockerfile & IBM Cloud)
```

## Configuration

All configurations happens through ENVIRONMENT variables. These are validated through the `joy` validator with a validation schema
- for deafult values; edit `Config.ts`