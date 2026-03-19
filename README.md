# Calculator Builder
## Project Description
The Calculator Builder project aims to build a calculator application with a React frontend and a Node.js backend, utilizing Supabase for authentication. The application allows users to perform calculations and view their calculation history.

## Tech Stack
* Frontend: React
* Backend: Node.js
* Database: Supabase
* Authentication: Supabase
* Payments: None
* Realtime: False

## Architecture Overview
```
                      +---------------+
                      |  Client   |
                      |  (React)  |
                      +---------------+
                             |
                             |
                             v
                      +---------------+
                      |  Backend  |
                      |  (Node.js) |
                      +---------------+
                             |
                             |
                             v
                      +---------------+
                      |  Database  |
                      |  (Supabase) |
                      +---------------+
```

## API Endpoints
The following API endpoints are available:
### POST /api/calculate
* Description: Perform a calculation
* Request Body:
	+ num1: number
	+ num2: number
	+ operation: string
* Response:
	+ result: number

### GET /api/history
* Description: Get calculation history
* Request Body: None
* Response:
	+ history: array

## ENV Variables
The following environment variables are required:
* SUPABASE_URL: The URL of the Supabase instance
* SUPABASE_KEY: The key for the Supabase instance
* JWT_SECRET: The secret key for JSON Web Tokens

## Local Setup Instructions
To set up the project locally, follow these steps:
1. Clone the repository
2. Create a `.env` file in the root directory with the required environment variables
3. Run `docker-compose up` to start the containers
4. Access the frontend at `http://localhost:3000`
5. Access the backend at `http://localhost:3001`

## Deploy Instructions
To deploy the project, follow these steps:
1. Set up a Supabase instance and obtain the URL and key
2. Set up a Node.js environment and obtain the JWT secret
3. Update the `docker-compose.yml` file with the production environment variables
4. Run `docker-compose up -d` to start the containers in detached mode
5. Use a reverse proxy to route traffic to the frontend and backend containers

## File Structure
The project is organized into the following directories:
* `backend`: Contains the Node.js backend code
	+ `controllers`: Contains the calculation controller
	+ `models`: Contains the calculation model
	+ `routes`: Contains the calculation routes
* `frontend`: Contains the React frontend code
	+ `public`: Contains the public assets
	+ `src`: Contains the React components
* `database`: Contains the database migration scripts
* `tests`: Contains the test files for the backend and frontend
* `config`: Contains the configuration files for the database and Supabase
* `docker`: Contains the Docker Compose configuration file
* `github`: Contains the GitHub Actions workflow files
* `requirements`: Contains the requirements file (not used in this project)