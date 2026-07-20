### Install Dependencies

npm init -y //creates new package.json
npm install express pg
npm install --save-dev nodemon

Plain English:

The frontend sends a request.
Express receives it.
Express finds the route matching the method and path.
The route uses pg to execute SQL.
PostgreSQL returns the requested data.
Express sends that data back as JSON.

FILE STRUCTURE:

### index.js — the entry point. It creates the Express application, connects the necessary pieces, and starts the backend server so it can receive API requests.

### api/ — holds the routers/routes. These define the HTTP method and path, such as GET /employees or PATCH /employees/:id.

### db/ — holds the database code that performs CRUD operations by sending SQL queries to PostgreSQL.