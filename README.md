# React-Express-Prisma App with Postgres, JWT, Tailwind, and Framer Motion

This application is built using React for the frontend and Express with Prisma for the backend. It incorporates PostgreSQL for the database, JWT for authentication, and Tailwind CSS for styling. The application features rate limiting for sign-up, password visibility toggle, confirm password, and change password functionality. Additionally, it uses Framer Motion for animations in the frontend and React Router DOM for routing.

## Features

- User authentication with JWT
- Rate limiting for sign-up
- Password visibility toggle and confirm password functionality
- Change password feature
- Tailwind CSS for styling
- Get posts endpoint with backend integration
- Framer Motion for animations in the frontend
- React Router DOM for routing

## Requirements

- Node.js (>=14.x)
- npm or yarn
- PostgreSQL
- Git

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:

   For the backend:

   ```bash
   cd backend
   npm install
   ```

   For the frontend:

   ```bash
   cd ../frontend
   npm install
   ```

3. **Configure PostgreSQL database**:

   - Set up a PostgreSQL database and obtain the database URL. The URL should follow the format:
     `postgresql://<username>:<password>@<host>:<port>/<database>`.

4. **Configure environment variables**:

   - In the `backend` directory, create a `.env` file and configure the necessary environment variables:

     ```
     DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
     JWT_SECRET=<jwt-secret>
     ```

## Usage

1. **Set up the backend**:

   - In the `backend` directory, navigate to the `db` folder:

     ```bash
     cd backend/db
     ```

   - Run the Prisma migrations:

     ```bash
     npx prisma migrate dev
     ```

   - Seed the database with initial data:

     ```bash
     npx prisma db seed
     ```

   - Return to the `backend` directory:

     ```bash
     cd ..
     ```

   - Start the backend server:

     ```bash
     npm run dev
     ```

2. **Set up the frontend**:

   - Navigate to the `frontend` directory and start the client:
     ````npm i
     ```bash
     cd ../frontend
     npm run dev
     ````

## Frontend

- The frontend uses React for components, Tailwind CSS for styling, Framer Motion for animations, and React Router DOM for routing.
- The frontend interacts with the backend API to fetch posts and handle authentication.

## Backend

- The backend uses Express for the server and routes, Prisma for database access, and Zod for request validation.
- It also uses bcrypt for password hashing and rate limiting for sign-up to prevent abuse.
