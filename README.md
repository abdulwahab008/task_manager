<<<<<<< HEAD
# Task Manager Application

A full-stack task management application built with React and Node.js, featuring user authentication and comprehensive task management capabilities.

## Prerequisites

- Node.js (v16.0.0 or higher)
- MySQL (v8.0 or higher)
- npm (v8.0.0 or higher)
- Git

## Tech Stack

### Frontend
- React 18
- React Router DOM v6
- TailwindCSS v3
- Lucide React (for icons)
- Axios

### Backend
- Node.js
- Express.js v4
- MySQL2
- JSON Web Tokens (JWT)
- bcryptjs
- cors
- dotenv

## Installation & Setup

### 1. Clone the Repository
```bash
git clone [your-repository-url]
cd task_manager
```

### 2. Database Setup
```bash
# Log into MySQL
mysql -u root -p

# Create database
CREATE DATABASE task_manager;
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
# Create .gitignore file in root directory
# filepath: /.gitignore
node_modules/
.env
.DS_Store
npm-debug.log*
build/
.vscode/
# Create .env file with the following content:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_manager
JWT_SECRET=your_secret_key
PORT=3001
NODE_ENV=development

# Start the server
npm run start
```

### 4. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run start
```

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_manager
JWT_SECRET=your_secret_key
PORT=3001
NODE_ENV=development
```

## Features

- 👤 User Authentication (Register/Login)
- ✅ Create, Read, Update, Delete Tasks
- 🔄 Task Status Management
- ⭐ Priority Levels (Low, Medium, High)
- 📅 Due Date Assignment
- 🔍 Task Filtering and Search
- 📱 Responsive Design

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login

### Tasks
- GET /api/tasks - Get all tasks
- POST /api/tasks - Create new task
- PUT /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task

## Development

### Running Tests
```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

### Building for Production
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

## Troubleshooting

Common issues and solutions:

1. Database Connection Issues
   - Verify MySQL is running
   - Check credentials in .env file
   - Ensure database exists

2. Port Conflicts
   - Backend default port: 3001
   - Frontend default port: 3000
   - Change in .env if needed

## Security Considerations

- JWT for authentication
- Password hashing with bcrypt
- CORS enabled
- Environment variables for sensitive data
- SQL injection protection

## License

MIT License

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request
=======
# task_manager
>>>>>>> 0d9b0f62a1d445e2a666a6b92be28c817b613128
