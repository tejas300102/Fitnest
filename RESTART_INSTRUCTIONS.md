# RESTART BOTH SERVERS NOW

## The Fix Applied:
1. Added Vite proxy configuration
2. Updated axios to use proxy
3. Fixed CORS configuration

## IMPORTANT: You MUST restart both servers:

1. **Stop both servers** (Ctrl+C in both terminals)
2. **Start backend first:**
   ```
   cd fitnest-backend
   mvnw.cmd spring-boot:run
   ```
3. **Start frontend:**
   ```
   cd FitNest  
   npm run dev
   ```

## Test:
- Registration should now work at http://localhost:5173
- No more network errors