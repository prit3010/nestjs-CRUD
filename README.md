
## Description

A CRUD API using Nestjs, PrismaORM, RESTful API and postgreSQL.
This project was done as a tutorial to learn Nestjs, PrismaORM

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
## How does it work
After running the app, the API will be live at localhost:3333.

Using Postman or CURL, you can perform CRUD Operations.

Possible functions:
Auth:
Create User: POST /signup
Sign Into : POST /signin

(ALL the functions below are authenticated by JWT Token)
User:
Get User : GET /users/me
Edit User: PATCH /users

Bookmarks:
Get Bookmarks: GET /bookmarks
Get Bookmark by Id: GET /bookmarks/{id of bookmark}
Create Bookmark: POST /bookmarks
Edit Bookmark by ID: PATCH /bookmarks/{id of bookmark}
Delete Bookmark by ID: DELETE /bookmarks/{id of bookmark}

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
