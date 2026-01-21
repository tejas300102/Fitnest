# FitNest - React Frontend

A complete React frontend for the FitNest fitness application that connects to a Spring Boot backend.

## Features

- **Authentication**: Login and Registration
- **Dashboard**: Central hub with navigation to all features
- **Workouts**: Full CRUD operations for workout management
- **Diet Plans**: Complete diet plan management
- **Progress Tracking**: Weight tracking with visual charts
- **Profile Management**: User profile creation and editing
- **BMI Calculator**: Calculate and display BMI with categories
- **Nutrition Search**: Search food nutrition via third-party API
- **Motivational Quotes**: Random fitness quotes for inspiration

## Tech Stack

- React 18 with functional components and hooks
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Chart.js for progress visualization
- Vite for build tooling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Backend Integration

This frontend connects to a Spring Boot backend running at `http://localhost:8080` with the following API endpoints:

- `POST /api/users/login` - User authentication
- `POST /api/users/register` - User registration
- `GET/POST/PUT/DELETE /api/workouts` - Workout management
- `GET/POST/PUT/DELETE /api/diets` - Diet management
- `GET/POST /api/progress` - Progress tracking
- `GET/POST /api/profile` - Profile management
- `GET /api/bmi` - BMI calculation
- `GET /api/diets/nutrition/{food}` - Nutrition search
- `GET /api/quotes/random` - Random quotes

## Project Structure

```
src/
├── components/
│   └── Navbar.jsx
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Workouts.jsx
│   ├── Diets.jsx
│   ├── Progress.jsx
│   ├── Profile.jsx
│   ├── BMI.jsx
│   ├── Nutrition.jsx
│   └── Quotes.jsx
├── api/
│   └── axiosConfig.js
├── App.jsx
└── main.jsx
```

## Usage

1. Start your Spring Boot backend on port 8080
2. Run the React frontend with `npm run dev`
3. Navigate to `http://localhost:5173`
4. Register a new account or login with existing credentials
5. Explore all the fitness tracking features!

## Authentication

The app uses localStorage to store the userId after successful login. Protected routes automatically redirect to login if no user is authenticated.