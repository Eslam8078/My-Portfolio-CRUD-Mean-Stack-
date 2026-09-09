# Eslam Ayman — Portfolio CRUD (MEAN Stack)

A full-stack portfolio management application built with the **MEAN stack**: MongoDB, Express.js, Angular, and Node.js. The project includes a public portfolio, contact form, and a protected admin dashboard for managing portfolio content.

## Features

### Public Portfolio
- Responsive portfolio UI
- Portfolio projects and profile information
- Skills and professional information
- Public contact form
- Modern UI with consistent teal/green visual identity
- Smooth transitions and animations

### Admin Dashboard
- Secure admin login with JWT authentication
- Protected CRUD operations
- Manage portfolio/profile content
- Manage projects and related information
- View and manage contact messages
- Protected admin-only message retrieval and management

### Backend
- RESTful API with Express.js
- MongoDB with Mongoose
- JWT-based authentication
- Password hashing with bcrypt
- File upload support with Multer
- Environment-based configuration
- CORS configuration

## Tech Stack

**Frontend**
- Angular
- TypeScript
- HTML5
- CSS3
- Angular Router
- RxJS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- dotenv

## Project Structure

```text
.
├── backend/
│   ├── .env.example
│   ├── index.js
│   ├── package.json
│   └── seed-admin.js
├── frontend/
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
└── README.md
```

## Requirements

- Node.js
- npm
- MongoDB
- Angular CLI (or use the project's npm scripts)

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd My-Portfolio-CRUD-Mean-Stack--main
```

### 2. Configure the backend

Create the environment file:

```bash
cp backend/.env.example backend/.env
```

On Windows PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
```

Set your values in `backend/.env`, including:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
PORT=3000
```

Never commit `backend/.env` or other secrets to Git. They are excluded by `.gitignore`.

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Create or update the admin account

Run the admin seed script once when setting up the project or when you need to synchronize the admin account from the configured environment values:

```bash
npm run seed
```

The project intentionally keeps only the **admin seed**. Portfolio seed data is not required for normal application operation.

### 5. Start the backend

```bash
npm start
```

The backend runs on:

```text
http://localhost:3000
```

### 6. Install and start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

Open:

```text
http://localhost:4200
```

## API Configuration

The frontend API base URL is defined in:

```text
frontend/src/environments/environment.ts
frontend/src/environments/environment.prod.ts
```

The default development backend URL is:

```text
http://localhost:3000
```

Update the environment files when deploying the backend to another host.

## Authentication & Permissions

- Public users can view the portfolio.
- Public users can submit the contact form.
- Admin authentication is required for dashboard write operations.
- Contact messages can only be retrieved and managed by an authenticated admin.

## Available Backend Scripts

From the `backend` directory:

```bash
npm start
npm run seed
```

`npm run seed` runs `seed-admin.js` only.

## Production Build

From the `frontend` directory:

```bash
npm run build
```

The production output is generated in the Angular distribution directory configured by the project.

## Git & Environment Files

The repository includes `.gitignore` rules for common generated and sensitive files, including:

- `node_modules/`
- `.env` files
- Angular build/cache directories
- Logs
- Coverage files
- Uploaded runtime files
- OS-specific files

Keep `.env.example` committed as a template, but never commit real credentials or secrets.

## Development Notes

The application is split into two independent parts:

- `frontend/` — Angular client application
- `backend/` — Express/MongoDB REST API

Start both applications during local development.

## Author

**Eslam Ayman**

Full-Stack Web Developer

Built with Angular, Node.js, Express.js, MongoDB, TypeScript, and modern CSS.
