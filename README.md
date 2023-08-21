# Home Library Service Part 3

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/AndreiZaretski/nodejs2023Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Starting application with Docker

Install the desktop version of docker and run it on your computer

[Docker desktop](https://docs.docker.com/engine/install/)

Run the following command in terminal

```
docker-compose up
pause node container and than run
npm run start
```

## Stopping application with Docker

Run the following command in terminal

```
docker-compose down
```

## Scan vulnerabilities images

Run the following command in terminal

```
npm run scan
```

## For create prisma migrations run the next commands in terminal

```
rm -r ./prisma/migrations
```

```
npm run prisma:migrate
```

## For clean clean docker cache run the next commands in terminal

```
docker builder prune
```

or

```
docker system prune

```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
