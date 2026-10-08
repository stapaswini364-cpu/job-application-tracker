# Job Application Tracker

A full-stack MERN application for tracking and managing job applications in one place.

## Project Description

Job Application Tracker helps users maintain their job application records and track the current status of each application.

Users can add, view, update, search, filter, and delete job applications.

The application uses MongoDB for data storage, Express.js and Node.js for the backend API, and React.js with Vite for the frontend.

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
- Responsive UI
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
│
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
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
## AI Tool Used

Code0 was used as the AI development tool during the project.

## AI Development Experience

Code0 was used as a development assistant for generating implementation ideas,
debugging issues, improving code structure, and solving development problems.
All AI-generated suggestions were reviewed, tested, and modified where required.

## Specific AI-Assisted Tasks

1. Assisted with designing the Express.js REST API structure.
2. Assisted with implementing MongoDB CRUD operations using Mongoose.
3. Assisted with building the React job application form and listing UI.
4. Assisted with debugging the Vite and Express single-port development setup.
5. Assisted with implementing search, filtering, editing, and dashboard statistics.