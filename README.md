# 📚 LearnTube - Learning Path Platform

LearnTube is a learning platform that enables users to create and organize learning paths using YouTube videos.

## 📁 Project Structure

```
learnhub/
├── backend/         # Express.js server
└── frontend/        # React.js client
```

## 🚀 Installation Guide

### Backend Setup

1. **Clone Repository**

```bash
git clone https://github.com/yourusername/learnhub.git
cd learnhub/backend
```

2. **Install Dependencies**

```bash
npm install
```

3. **Setup Environment Variables**
   Create `.env` file in `backend/` folder with:

```env
# Server Configuration
PORT=2025
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/learnhub

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# YouTube API Configuration
YOUTUBE_API_KEY=your_youtube_api_key
```

4. **Install MongoDB**

- Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- Ensure MongoDB service is running on default port (27017)

5. **Run Backend Server**

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:2025`

### Frontend Setup

1. **Navigate to Frontend Directory**

```bash
cd learnhub/frontend
```

2. **Install Dependencies**

```bash
npm install
```

3. **Setup Environment Variables**
   Create `.env` file in `frontend/` folder with:

```env
VITE_API_URL=http://localhost:2025
VITE_APP_NAME=LearnTube
```

4. **Run Frontend Development Server**

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔧 Dependencies

### Backend Dependencies

```json
{
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "express": "^4.18.2",
  "express-rate-limit": "^6.7.0",
  "express-validator": "^7.0.1",
  "jsonwebtoken": "^9.0.0",
  "mongoose": "^7.2.1",
  "nodemailer": "^6.9.3",
  "passport": "^0.6.0",
  "passport-jwt": "^4.0.1"
}
```

### Frontend Dependencies

```json
{
  "@heroicons/react": "^2.0.18",
  "@reduxjs/toolkit": "^1.9.5",
  "axios": "^1.4.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-redux": "^8.1.1",
  "react-router-dom": "^6.14.1",
  "tailwindcss": "^3.3.2"
}
```

## 📌 Available Scripts

### Backend Scripts

```json
{
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

### Frontend Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

## 🛠️ Required Development Tools

1. **Code Editor**

   - Visual Studio Code with extensions:
     - ESLint
     - Prettier
     - GitLens
     - MongoDB for VS Code

2. **API Testing**

   - Postman (import collection from `backend/LearnTube.postman_collection.json`)

3. **Database Tools**

   - MongoDB Compass for database management

4. **Version Control**
   - Git

## 🔍 Testing API

1. Import Postman Collection

   - Open Postman
   - Import file `backend/LearnTube.postman_collection.json`
   - Set environment variable `base_url` to `http://localhost:2025`

2. Testing Flow
   - Register new user
   - Verify email (check console log for verification URL)
   - Login to get JWT token
   - Set JWT token in Postman environment variables
   - Test other endpoints

## 🐛 Troubleshooting

### Backend Issues

1. **MongoDB Connection Error**

```bash
# Ensure MongoDB service is running
sudo service mongodb status    # Linux
brew services list            # macOS
```

2. **Port Already in Use**

```bash
# Check ports in use
lsof -i :2025                # for backend
lsof -i :5173                # for frontend
```

3. **JWT Token Invalid**

- Verify `JWT_SECRET` in `.env` is correct
- Check token expiration time

### Frontend Issues

1. **API Connection Error**

- Ensure backend server is running
- Check CORS configuration in backend
- Verify VITE_API_URL in `.env`

2. **Build Errors**

```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

## 📝 Development Workflow

1. **Backend Development**

```bash
cd backend
npm run dev           # Start with nodemon
```

2. **Frontend Development**

```bash
cd frontend
npm run dev          # Start Vite dev server
```

3. **Full Stack Development**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🎯 Testing

### Backend Testing

```bash
cd backend
npm test             # Run unit tests
npm run test:coverage # Run tests with coverage
```

### Frontend Testing

```bash
cd frontend
npm test            # Run React component tests
npm run test:e2e    # Run end-to-end tests
```

## 📦 Production Build

### Backend Build

```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

### Frontend Build

```bash
cd frontend
npm run build       # Build for production
npm run preview     # Preview build locally
```

## 🔐 Security Best Practices

1. **Backend**

   - Use HTTPS in production
   - Set secure headers with helmet
   - Implement rate limiting
   - Sanitize all inputs
   - Validate payload size

2. **Frontend**
   - Sanitize all outputs
   - Implement CSP
   - Use HttpOnly cookies
   - Input validation
   - XSS prevention

## 🤝 Contributing

Please submit pull requests or issues for improvements or new features.

## 👥 Team

- Septian Dwi Cahyo (Full Stack Developer)

## 📞 Contact

For questions and further information:

- Email: [septiandwica03@gmail.com](mailto:septiandwica03@gmail.com)
- GitHub: [@septiandwica](https://github.com/septiandwica)

---

Made with ❤️ by Septian Dwi Cahyo
# LearnTube
