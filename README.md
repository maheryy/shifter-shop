# Shifer Shop
Experience the future of e-commerce with Shifter Shop. Join our platform today and unlock a world of convenience, innovation, and success. 
Embrace the shift and elevate your online business to new heights.

## Technology stack
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)  
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)  
![Nx](https://img.shields.io/badge/nx-143055?style=for-the-badge&logo=nx&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/Rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)  
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white)

### Microservices architecture
Deployed on Google Kubernetes Engine (GKE)  

Public apps: Shifter Shop, Admin, Analytics -- (React.js, TailwindCSS, Vite)  
API apps: Gateway + 15 microservices -- (NestJS, Fastify, Express.js) 


## Try it out

### Live demo

Public app: https://shiftershop.pro  
API app: https://api.shiftershop.pro  
Admin app: https://admin.shiftershop.pro  
Analytics app: https://analytics.shiftershop.pro  

### Local demo

Run the app for the first time using the following command

```
$ make build start

### Without make ###
$ docker compose -f docker-compose.demo.yml up -d --build
```

The public app will be available at http://localhost:8080  
The admin app will be available at http://localhost:8081  
The api will be available at http://localhost:3000  

Log in with the following credentials

```
# As an admin
email: admin@demo.com
password: password

OR

# As a seller
email: seller@demo.com
password: password

OR

# As a customer
email: customer@demo.com
password: password
```

## Contributing

Get the app ready using the following command

```
$ make dev
$ npm install
```

Then you can start working on any apps simultaneously

```
$ npx nx run-many --parallel=20 --target=dev
```

## Commands

```
$ make install // Install project dependencies
$ make build // Build the app in production mode
$ make start // Run the app in production mode
$ make stop // Stop the running app
$ make dev // Start only necessary containers for development
$ make dev-stop // Stop dev containers
$ make clear-app // Remove node_modules and dist folders
$ npx nx run-many --parallel=20 --target=dev // Run all apps
$ npx nx run-many --target=build // Build all apps
$ npx nx run-many --target=test // Test all apps
```

## Contributors

[@karimdahoumane](https://github.com/karimdahoumane)  
[@3kezoh](https://github.com/3kezoh)  
[@IsmaProject](https://github.com/IsmaProject)  
[@maheryy](https://github.com/maheryy)  

## License

[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/3kezoh/blackjack/blob/master/LICENSE)

This project is licensed under the terms of the [MIT License](https://choosealicense.com/licenses/mit/).
