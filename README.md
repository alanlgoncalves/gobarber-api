# GOBARBER-API
[![Build Status](https://travis-ci.com/alanlgoncalves/gobarber-api.svg?branch=master)](https://travis-ci.com/alanlgoncalves/gobarber-api)
[![Coverage Status](https://coveralls.io/repos/github/alanlgoncalves/gobarber-api/badge.svg?branch=master&kill_cache=1)](https://coveralls.io/github/alanlgoncalves/gobarber-api?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=alanlgoncalves_gobarber-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=alanlgoncalves_gobarber-api)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=alanlgoncalves_gobarber-api&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=alanlgoncalves_gobarber-api)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=alanlgoncalves_gobarber-api&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=alanlgoncalves_gobarber-api)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=alanlgoncalves_gobarber-api&metric=security_rating)](https://sonarcloud.io/dashboard?id=alanlgoncalves_gobarber-api)

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

First off all, create a `.env` file using `.env.example` file. After that running all the commands bellow:

```
$ docker-compose up

$ yarn install

$ yarn typeorm migration:run

$ yarn dev:server
```

The docker-compose will start the MongoDB, PostgreSQL and Redis.
