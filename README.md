# Job Application Tracker

A full-stack MERN application for tracking and managing job applications in one place.

## Project Description

Job Application Tracker helps users maintain job application records and track the current status of each application.

Users can add, view, update, search, filter, and delete job applications.

The application uses MongoDB for data storage, Express.js and Node.js for the backend REST API, and React.js with Vite for the frontend.

## Features

- Add new job applications
- View all job applications
- Edit existing applications
- Delete applications
- Search applications by company, position, or location
- Filter applications by status
- Track application status:
  - Applied
  - Interview
  - Selected
  - Rejected
- Track job type:
  - Full-time
  - Internship
  - Contract
  - Part-time
- Store application date
- Store job URL and notes
- Dashboard statistics
- MongoDB database integration
- REST API
- Loading and error handling
- Centralized backend error handling
- Single development URL for frontend and backend

## Technologies Used

### Frontend

- React.js
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- REST API
- Mongoose

### Database

- MongoDB Atlas

### Development Tools

- Git
- GitHub
- Kiro
- VS Code
- Postman

## Project Structure

```text
job-application-tracker/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/stapaswini364-cpu/job-application-tracker.git
cd job-application-tracker
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=mongodb://stapaswini364_db_user:ooUPsC8foiUnCLoI@ac-tsqvhwh-shard-00-00.lgcu532.mongodb.net:27017,ac-tsqvhwh-shard-00-01.lgcu532.mongodb.net:27017,ac-tsqvhwh-shard-00-02.lgcu532.mongodb.net:27017/job_application_tracker?authSource=admin&replicaSet=atlas-x6f950-shard-0&tls=true&retryWrites=true&w=majority
PORT=5000
```

Do not commit the `.env` file to GitHub.

### 4. Install frontend dependencies

Open another terminal and run:

```bash
cd client
npm install
```

### 5. Start the application

From the project root:

```bash
cd server
node server.js
```

The application will run at:

```text
http://localhost:5000
```

The backend API is available under:

```text
http://localhost:5000/api
```

Health check:

```text
http://localhost:5000/api/health
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/applications` | Get all applications |
| POST | `/api/applications` | Create an application |
| GET | `/api/applications/:id` | Get one application |
| PUT | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |
| GET | `/api/health` | Check API status |

## AI Tool Used

**Kiro**

Kiro was used as the AI development assistant during the project.

## AI Development Experience

Kiro was used to review the existing MERN codebase, identify code quality and error-handling issues, suggest improvements, implement a centralized Express error-handling middleware, and help diagnose and fix an issue where controller-level error handling prevented the centralized middleware from handling invalid MongoDB ObjectIds.

All AI-generated suggestions were reviewed, tested, and verified before being included in the project.

## Specific AI-Assisted Tasks

### 1. MERN Project Code Review

Kiro reviewed the frontend, backend, REST API routes, MongoDB model, validation, error handling, and project structure to identify potential issues and improvements.

### 2. Centralized Express Error Handling

Kiro helped implement `server/middleware/errorHandler.js` to provide consistent JSON error responses for API errors.

### 3. Mongoose CastError Handling

Kiro identified that controller-level `catch` blocks were handling MongoDB ObjectId errors before the centralized error handler could receive them.

### 4. Error Propagation Improvement

Kiro updated the controller functions to use `next(error)` so unexpected errors and Mongoose errors could be handled by the centralized middleware.

### 5. Testing and Verification

The invalid ObjectId API request was tested after the changes and returned a consistent `400` response with the message `Invalid resource ID`.

Existing application functionality was also verified after the changes.

## GitHub Repository

https://github.com/stapaswini364-cpu/job-application-tracker