# LearnHub Architecture Overview

## System Architecture

LearnHub is built on a modern microservices architecture that separates the frontend and backend concerns:

```
                                    ┌─────────────────┐
                                    │    Frontend     │
                                    │   (React TSX)   │
                                    └────────┬────────┘
                                             │
                                             │ HTTP/REST
                                             │
┌──────────────┐                   ┌────────┴────────┐
│   MongoDB    │ ◄─── Mongoose ─── │    Backend      │
│  Database    │                   │   (Express.js)   │
└──────────────┘                   └────────┬────────┘
                                             │
                                             │ HTTP/REST
                                             │
                                    ┌────────┴────────┐
                                    │  YouTube API    │
                                    └─────────────────┘
```

## Key Components

1. **Frontend Layer**

   - Single-page application built with React and TypeScript
   - State management using React Context API
   - Protected routes with authentication middleware
   - Responsive design with Tailwind CSS

2. **Backend Layer**

   - RESTful API built with Express.js
   - JWT-based authentication system
   - Rate limiting and security middleware
   - Email verification system
   - YouTube API integration

3. **Database Layer**
   - MongoDB for data persistence
   - Mongoose ODM for data modeling
   - Stores user data, playlists, and roadmaps

## System Flow

1. **Authentication Flow**

   ```
   User Registration → Email Verification → Login → JWT Token Generation → Protected Routes Access
   ```

2. **Playlist Creation Flow**

   ```
   Create Playlist → Add Roadmaps → Search YouTube Videos → Add Videos to Roadmap → Track Progress
   ```

3. **Data Flow**
   ```
   Client Request → API Middleware → Controller → Service Layer → Database → Response
   ```

## Security Measures

- JWT-based authentication
- Rate limiting for API endpoints
- Email verification for new accounts
- Password hashing with bcrypt
- CORS configuration
- Environment variable protection

## Deployment Architecture

- Frontend deployed on Vercel
- Backend API deployed on Vercel
- MongoDB Atlas for database hosting
- Environment-specific configurations
