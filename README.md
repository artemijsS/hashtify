<h1 align="center">
    <img width="160" height="86" src="logo.svg" alt=""><br>
    jsdom
</h1>

Hashtify is a service for selecting the best hashtags/images and google search statistics for your word/phrase.
Implemented in a micro service architecture.

## Prerequisites

```cmd
node -v
v18.13.0
```

## Installation

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install all dependencies for the client.

```cmd
cd frontend
npm install
```

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install all dependencies for API Gateway.

```cmd
cd api-gateway
npm install
```

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install all dependencies for Hashtify micro service.

```cmd
cd hashtify-service
npm install
```

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install all dependencies for Image micro service.

```cmd
cd image-service
npm install
```

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install all dependencies for Trend micro service.

```cmd
cd trend-service
npm install
```

**You need to make an .env file like env.example with correctly filled data**

## Dev

Start micro services

```cmd
cd hashtify-service
npm run build
npm run dev
```
```cmd
cd image-service
npm run build
npm run dev
```
```cmd
cd trend-service
npm run build
npm run dev
```

Start API Gateway

```cmd
cd api-gateway
npm run sart:dev
```

Start Frontend

```cmd
cd frontend
npm run dev
```

## Prod

Start micro services

```cmd
cd hashtify-service
npm run build
npm start
```
```cmd
cd image-service
npm run build
npm start
```
```cmd
cd trend-service
npm run build
npm start
```

Start API Gateway

```cmd
cd api-gateway
npm start
```

Start Frontend

```cmd
cd frontend
npm start
```
