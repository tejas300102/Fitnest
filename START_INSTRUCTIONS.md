# FitNest Application Startup Instructions

## Prerequisites
1. MySQL server running on port 3306
2. Database named 'fitnest' created
3. MySQL credentials: username=root, password=cdac

## Quick Start

### Method 1: Use Batch Files
1. Double-click `start-backend.bat` - Wait for "Started FitnestBackend1Application"
2. Double-click `start-frontend.bat` - Opens browser at http://localhost:5173

### Method 2: Manual Start
1. **Start Backend:**
   ```
   cd fitnest-backend
   mvnw.cmd spring-boot:run
   ```

2. **Start Frontend:**
   ```
   cd FitNest
   npm run dev
   ```

## Test Backend
Visit: http://localhost:8080/api/users/test
Should show: "Backend is working!"

## Troubleshooting
- If registration fails, check MySQL is running
- If network error, restart both servers
- Check browser console for detailed errors