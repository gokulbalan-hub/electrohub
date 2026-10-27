# Electric Circuit — Full Stack Project

This repository contains the React/Vite frontend and Spring Boot backend.

## Structure
- `frontend/` — React + Vite application
- `backend/` — Spring Boot application

## Prerequisites
- Node.js and npm
- Java 17
- MySQL

## Frontend
```powershell
cd frontend
npm install
npm run dev
```

## Backend configuration
The backend reads database settings from environment variables. Create these in the terminal session before starting the backend:

```powershell
$env:DB_URL="jdbc:mysql://localhost:3306/electriccircuit?serverTimezone=UTC&allowPublicKeyRetrieval=true&useSSL=false"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="YOUR_LOCAL_MYSQL_PASSWORD"
$env:JWT_SECRET="REPLACE_WITH_A_RANDOM_SECRET_AT_LEAST_32_CHARACTERS_LONG"
```

Replace the example values on your own computer. Never commit actual passwords or JWT secrets.

Run the backend from the `backend` folder using the Maven wrapper on Windows:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

The backend is configured for port `8081` in `application.properties`.

## Security note
Do not commit `.env` files, database passwords, tokens, private keys, or other credentials. If a real credential was previously pushed to a public repository, rotate it.
