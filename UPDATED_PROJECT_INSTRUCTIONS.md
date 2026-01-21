# FitNest - Updated Project Instructions

## What's Fixed & Added

### ✅ Fixed Issues:
1. **Role-based Login Redirection**: Admins now redirect to `/admin/dashboard` instead of `/dashboard`
2. **User Count Fix**: Admin dashboard now shows correct user count (excludes admin accounts)
3. **Admin Access**: Admins retain full access to all user features plus admin features

### ✅ New Features:
1. **Admin Posting System**: Admins can create and publish:
   - Motivational quotes
   - New workout sessions  
   - Diet tips
   - Upcoming events

2. **User Notification System**: 
   - Real-time notifications on user dashboard
   - Notification bell with unread count
   - Mark as read functionality
   - Notification dropdown with recent updates

## How to Run the Updated Project

### Backend Setup:
1. **Import in STS Eclipse:**
   - Open STS Eclipse
   - File → Import → Existing Maven Projects
   - Browse to: `c:\Users\Vasundhara\OneDrive\Desktop\mini project\fitnest-backend`
   - Select the project and import

2. **OR run from command line:**
   ```cmd
   cd "c:\Users\Vasundhara\OneDrive\Desktop\mini project\fitnest-backend"
   ```

2. Run the Spring Boot application:
   ```cmd
   mvnw spring-boot:run
   ```
   OR
   ```cmd
   ./mvnw spring-boot:run
   ```

### Frontend Setup:
1. Navigate to frontend directory:
   ```cmd
   cd "c:\Users\Vasundhara\OneDrive\Desktop\mini project\FitNest\FitNest"
   ```

2. Install dependencies (if not already done):
   ```cmd
   npm install
   ```

3. Start the development server:
   ```cmd
   npm run dev
   ```

## Testing the New Features

### Creating an Admin User:
1. Register a new user normally through the app
2. Manually update the database to change the user's role from 'USER' to 'ADMIN'
3. Login with that user - you'll be redirected to the admin dashboard

### Testing Admin Features:
1. Login as admin → redirected to `/admin/dashboard`
2. Click "Create Post" button to publish content
3. Admin can access all user features via navbar links
4. User count shows correct number (excluding admins)

### Testing User Notifications:
1. Login as a regular user
2. Check the notification bell icon in the top-right of dashboard
3. Notifications appear when admin creates new posts
4. Click notifications to mark as read

## Database Tables Created:
- `admin_posts` - Stores admin-created content
- `notifications` - Stores user notifications

## API Endpoints Added:
- `POST /api/admin/posts` - Create admin post
- `GET /api/admin/posts` - Get all posts
- `GET /api/notifications/user/{userId}` - Get user notifications
- `GET /api/notifications/user/{userId}/count` - Get unread count
- `PUT /api/notifications/{id}/read` - Mark notification as read
- `GET /api/users/count` - Get user count (excluding admins)

## Project Structure Maintained:
- All existing functionality preserved
- No breaking changes to current features
- Admin users have full access to user features
- Clean separation between admin and user interfaces

The project is now ready with the requested role-based login fixes and admin notification system!