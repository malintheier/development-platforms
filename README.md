# Development-platforms

## Project overview

This project is a REST API developed using Express.js and TypeScript as part of a news platform project. The main goal is to build a functional news platform that demonstrates an understanding of modern web development practices, user authentication, and data management.

The API allows users to register new accounts, log in, view all articles, and submit their own news articles. It uses a MySQL database to store and manage user information and news articles.

The project follows RESTful principles to provide a structured and reliable way for clients to interact with the application's data and functionality.

## Requirements

Before running this project, make sure the following software is installed on your system:

- Node.js 22.13 or newer – Required to run the application.
- npm – Used to install and manage the project's dependencies.
- MySQL 8.0 or newer – Required for storing and managing user accounts and news articles.

### Checking Your Installed Versions

You can verify your installed Node.js and npm versions by running the following commands in your terminal.

Check the Node.js version:

```bash
node --version
```

Check the npm version:

```bash
npm --version
```

Make sure your installed versions meet the minimum requirements before proceeding with the project setup.

Additionally, ensure that MySQL is installed and running before starting the application.

## Installation

Follow these steps to install the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/malintheier/development-platforms.git
   ```

2. Navigate to the project directory:

   ```bash
   cd development-platforms
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

## Environment configuration

The API uses a local `.env` file to store environment variables and sensitive configuration settings. Create this file in the root directory of the project. The `.env` file must not be committed to the repository, as it contains sensitive information.

The following environment variables are required:

- `DB_HOST` – The hostname of the MySQL database server.
- `DB_PORT` – The port used to connect to the MySQL database.
- `DB_USER` – The username used to access the database.
- `DB_PASSWORD` – The password for the database user.
- `DB_NAME` – The name of the database used by the application.
- `JWT_SECRET` – A secret key used to sign and verify JSON Web Tokens for user authentication.

### Example .env file

Create a `.env` file using the following template:

```env
DB_HOST=your_database_host
DB_PORT=3306
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_secret_key
```

Replace the placeholder values with your own database credentials and a secure JWT secret.

## Database setup

The `database.sql` file contains the SQL commands needed to create the project database and its tables. Import this file into your MySQL server using a MySQL account with sufficient privileges to create databases and tables.

The MySQL user configured in the `.env` file only needs the following permissions:

- `SELECT` – Required to retrieve data from the database.
- `INSERT` – Required to add new users and articles.

**Warning:** The SQL file contains `DROP TABLE IF EXISTS` statements. Importing the file again may delete existing tables and all data stored in them. Make sure to back up any important data before importing the file.

## Running the API

Follow these steps to build and start the API:

1. Build the TypeScript project:

   ```bash
   npm run build
   ```

2. Start the server:

   ```bash
   npm start
   ```

Once started, the API will be available at:

`http://localhost:3000`

To stop the server, press `Ctrl+C` in the terminal.

## Available endpoints

The API provides the following endpoints:

- **POST** `/auth/register` – Register a new user account.
- **POST** `/auth/login` – Log in with an existing account and receive a JWT (JSON Web Token) for authentication.
- **GET** `/articles` – Retrieve all available articles. This endpoint is public and does not require authentication.
- **POST** `/articles` – Create and submit a new article. This endpoint requires authentication using the `Authorization: Bearer <token>` header.

## Validation and error responses

The API validates incoming requests and returns appropriate HTTP status codes when errors occur.

- **400 Bad Request** – Returned when required fields are missing, input fields are invalid, or the request contains invalid JSON.
- **401 Unauthorized** – Returned when login credentials are incorrect or the authentication token is missing or invalid.
- **404 Not Found** – Returned when the requested API route does not exist.
- **409 Conflict** – Returned when attempting to register an email address that is already in use.
- **413 Payload Too Large** – Returned when the request body exceeds the allowed size.
- **500 Internal Server Error** – Returned when an unexpected server or database error occurs.

### Input Validation and Security

- Passwords are hashed using **bcrypt** before being stored in the database to protect user credentials.
- Articles must contain non-empty `title`, `body`, and `category` fields.
- Incoming data is validated to ensure that required fields are provided and contain valid values.

## Testing

The API was manually tested using **Postman** to verify that all four required endpoints work as expected.

The following scenarios were tested:

- Successful user registration and login.
- Retrieving articles using the public `GET /articles` endpoint.
- Creating articles using the `POST /articles` endpoint with a valid Bearer token.
- Invalid requests and missing or invalid input fields.
- Requests with missing or incorrect JWT tokens.
- Duplicate email addresses during user registration.
- Input validation and boundary cases to ensure that invalid data is handled correctly.

The following project checks were also completed successfully without errors:

- `npm run build` – Compiled the TypeScript project successfully.
- `npm run lint` – Checked the code for linting issues.
- `npm run format:check` – Verified that the code follows the configured formatting rules.

**Note:** The project does not currently include automated tests. The API was tested manually using Postman.
