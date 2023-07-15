
# CRM - Task & Project managment 👋
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>
This project consists of a client and server application.

## Client

The client application is built using React and Next.js. It provides a user interface for the project.

### Getting Started
*make sure to set env file - env.example invcude in root folder*

To run the client application, navigate to the `client` directory and follow these steps:

1. Install the dependencies using the following command:
```sh
npm install
```
2.  Start the development server:
```sh
npm run dev
```
The client application will be accessible at `http://localhost:3000`.

### Dependencies

The client application depends on the following libraries:

- `@react-google-maps/api`: Integration with Google Maps API.
- `@reduxjs/toolkit`: Redux state management library.
- `antd`: UI component library.
- `axios`: HTTP client library.
- `i18next`: Internationalization library.
- `next`: React framework for server-side rendering.
- `react`: JavaScript library for building user interfaces.
- `redux`: Predictable state container for JavaScript apps.
- and more...

## Server

The server application provides backend functionality for the project. It is built using Node.js and Express.js.

### Getting Started
*make sure to set env file - env.example invcude in root folder*

To run the server application, navigate to the `server` directory and follow these steps:

1. Install the dependencies using the following command:
```sh
npm install
```
2. Start the development server:
```sh
npm run dev
```
The server will be accessible at `http://localhost:3010`.

### Dependencies

The server application depends on the following libraries:

- `bcrypt`: Password hashing library.
- `express`: Web application framework for Node.js.
- `jsonwebtoken`: Library for generating and verifying JSON Web Tokens (JWT).
- `mongoose`: MongoDB object modeling tool.
- `multer`: Middleware for handling file uploads.
- and more...

## 🐋 Docker Compose 
To run the project using Docker Compose, make sure you have Docker installed. Then, follow these steps:
1. Copy the provided docker-compose.yml file to the project's root directory.
2. Open a terminal and navigate to the project's root directory.
3. Run the following command to start the containers:

```sh
docker-compose up
```
This will build and start the client and server containers.
The client application will be accessible at http://localhost:3000, and the server API will be accessible at http://localhost:3010.

### Stopping the Containers
To stop the Docker containers, press Ctrl + C in the terminal where you started the containers. This will gracefully stop the containers.

### Deleting the Containers
To delete the Docker containers and associated volumes, use the following command:

```sh
docker-compose down -v
```
This will stop and remove the containers, along with any volumes associated with the project.

Note: Running docker-compose down -v will delete any persisted data in volumes, so use it with caution if you want to preserve the data.

## License

This project is licensed under the [License Name](LICENSE).

## Author

👤 **Dvir Cohen**

* Github: [@Dvir-Cohen1](https://github.com/Dvir-Cohen1)

## Show your support

Give a ⭐️ if this project helped you!

***
