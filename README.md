# GOBARBER-API
[![Build Status](https://travis-ci.com/alanlgoncalves/gobarber-api.svg?branch=master)](https://travis-ci.com/alanlgoncalves/gobarber-api)
[![Coverage Status](https://coveralls.io/repos/github/alanlgoncalves/gobarber-api/badge.svg?branch=master&kill_cache=1)](https://coveralls.io/github/alanlgoncalves/gobarber-api?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=alanlgoncalves_gobarber-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=alanlgoncalves_gobarber-api)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=alanlgoncalves_gobarber-api&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=alanlgoncalves_gobarber-api)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=alanlgoncalves_gobarber-api&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=alanlgoncalves_gobarber-api)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=alanlgoncalves_gobarber-api&metric=security_rating)](https://sonarcloud.io/dashboard?id=alanlgoncalves_gobarber-api)

This project is a back-end API developed for GoBarber [web site](https://github.com/alanlgoncalves/gobarber-web) and [APP](https://github.com/alanlgoncalves/gobarber-app).

## Technologies

- TypeScript
- Node.js
- Express
- JSON Web Token (JWT)
- Multer (File Upload)
- Tsyringe (Dependency Injection)
- TypeORM
- PostgreSQL
- MongoDB
- Redis
- Jest
- Node Mailer
- Ethereal (Mail Trap)
- AWS Simple Mail Service (SES)
- AWS Simple Storage Service (S3)
- Docker
- Docker-Compose

## Formatters

- EditorConfig (https://editorconfig.org/)
- ESLint (https://eslint.org/)
- Prettier (https://prettier.io/)

## Project Startup

To run the project locally, you will need the follow dependencies:

- NodeJS (https://nodejs.org/en/download/)
- NPM (Automatically installed with NodeJS) or YARN (https://classic.yarnpkg.com/pt-BR/docs/install/)
- docker (https://docs.docker.com/get-docker/)
- docker-compose (https://docs.docker.com/compose/install/)

First off all, create a `.env` file using `.env.example` file. After that running all the commands bellow:

```
$ docker-compose up
```

If you are using NPM run:
```
$ npm install

$ npm typeorm migration:run

$ npm dev:server
```

If you are using YARN run:
```
$ yarn install

$ yarn typeorm migration:run

$ yarn dev:server
```

The docker-compose will start the MongoDB, PostgreSQL and Redis.

## Other information

### Tests and code coverage

This project use Jest as test framework. To execute the tests, run `yarn test` or `npm test`. The code report will
be generated in `coverage/lcov-report/index.html` folder.

### Create new migrations
To create new migrations, run the command bellow:

If you are using NPM run:

```
$ npm migration:create -n MigrationName
```

If you are using YARN run:
```
$ yarn migration:create -n MigrationName
```
