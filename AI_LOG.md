# AI Usage Log

## 6 November 2026

- **Tool used:** Copilot Chat
- **Purpose:** Establish a mentoring workflow based on the assignment's AI policy and my development preferences.
- **Outcome:** Copilot drafted and updated `AGENTS.md` and this log at my request. The guidance focuses on small steps, understanding the code, using `async`/`await`, reusing code, and setting up ESLint and Prettier. I also use AI to suggest commit messages.

## 6 November 2026

- **Tool used:** Copilot Chat
- **Purpose:** Guidance on MySQL database setup and export, TypeScript and Express configuration, and terminal commands, with troubleshooting help for Prettier messages.
- **Outcome:** I performed the database setup, entered and edited the project code and configuration, and ran the tests myself. Copilot explained unfamiliar steps, reviewed my attempts, and suggested configuration snippets and terminal commands when I needed guidance.

## 7 November 2026

- **Tool used:** Copilot Chat
- **Purpose:** Help with ESLint and Prettier configuration, a TypeScript dependency conflict, formatting warnings, and an npm audit warning.
- **Outcome:** I entered and updated the configuration and ran the terminal commands myself. Copilot provided configuration snippets, explained error messages, and suggested diagnostic commands; it also ran some diagnostic checks. I chose a `minimatch` override after discussing the risk. Audit, lint, build, and formatting checks passed, but the override uses a major version outside the tools' declared dependency ranges and needs future review.

## 7 November 2026

- **Tool used:** Copilot Chat
- **Purpose:** Guidance on the MySQL connection pool, environment variables, and port validation, with troubleshooting help for TypeScript errors and terminal commands.
- **Outcome:** I wrote and revised the database code and configured a limited-privilege database user myself. Copilot reviewed my attempts, explained errors, and supplied some small code snippets and terminal commands. I completed the validation checks with guidance and confirmed the database connection. Build, lint, and formatting checks passed.

## 7 November 2026

- **Tool used:** Copilot Chat
- **Purpose:** Help with organising `GET /articles` using Express Router, resolving import warnings, understanding error handling, and testing the endpoint.
- **Outcome:** I wrote and edited the router and connected it to the app myself. Copilot reviewed my code when I asked, explained import paths and variable names, and guided corrections and terminal checks. The endpoint returned an empty array for the empty articles table, and build, lint, and formatting checks passed.

## 7 November 2026

- **Tool used:** Copilot Chat
- **Purpose:** Guidance on `POST /auth/register`, bcrypt hashing, request validation, duplicate email handling, and Postman testing.
- **Outcome:** I wrote and edited the registration code myself. Copilot reviewed my attempts, explained validation and error handling, and suggested expressions, test inputs, and terminal commands. I chose the password requirements and tested registration, duplicate email responses, invalid input, and password rules, including the 8-character minimum and 72-byte maximum. Build, lint, and formatting checks passed.

## 8 November 2026

- **Tool used:** Copilot Chat
- **Purpose:** Guidance on `POST /auth/login`, bcrypt password verification, JWT signing, TypeScript errors, and Postman testing.
- **Outcome:** I wrote and revised the login code myself. Copilot reviewed my attempts, explained request validation and database result types, and guided reuse of the environment-variable check for the JWT secret. It also suggested a key-generation command and test inputs. I tested successful login, incorrect credentials, email normalisation, missing request bodies, and invalid field types. Build, lint, and formatting checks passed.

## 8 November 2026

- **Tool used:** Copilot Chat
- **Purpose:** Guidance on JWT middleware, protected article creation, TypeScript errors, input validation, and Postman testing.
- **Outcome:** I wrote and revised the middleware and article route myself. Copilot reviewed my attempts, explained errors and type safety, and suggested expressions, terminal commands, and test inputs. I tested article creation with a valid token, public article retrieval, missing and invalid inputs, and field-length boundaries. I also tested missing, malformed, invalid, and expired tokens, plus tokens with invalid user IDs. Build, lint, and formatting checks passed.

## 8 November 2026

- **Tool used:** Copilot Chat
- **Purpose:** Guidance on replacing Express's default HTML error responses with JSON for unknown routes and malformed request bodies.
- **Outcome:** I wrote and revised the error handlers myself. Copilot reviewed my attempts, explained middleware order and parser error identification, and guided corrections and terminal checks. I tested a 404 response for an unknown route and a 400 response for invalid JSON in Postman; both returned JSON without internal error details. Build, lint, and formatting checks passed.

## 8 November 2026

- **Tool used:** Copilot Chat
- **Purpose:** Guidance on testing database error handling and checking stored password hashes and article ownership in MySQL Workbench.
- **Outcome:** I performed the checks myself, following suggested test steps. With a temporarily incorrect database name, the API returned a general 500 error without internal details; after restoring the configuration, article retrieval returned 200. I also confirmed that the test user's password was stored as a bcrypt hash and that the test article's `submitted_by` matched the user's ID. No implementation code was changed in this step.

## 8 November 2026

- **Tool used:** Copilot Chat
- **Purpose:** Guidance on rejecting whitespace in email addresses and returning a JSON 413 response for oversized request bodies.
- **Outcome:** I wrote and revised the checks myself. Copilot reviewed my attempts, explained the whitespace pattern and error-handler order, and suggested test inputs and a terminal command. I tested that an email containing a tab returned 400 and an oversized JSON request returned 413 in Postman. Build, lint, and formatting checks passed.
