# Learning Path Management System

A modern web application for creating and managing learning paths and playlists using React, TypeScript, and Vite.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Authentication](#authentication)
- [Components](#components)
- [Contributing](#contributing)

## ✨ Features

- **User Authentication**

  - Login and Registration functionality
  - Secure authentication flow
  - Protected routes

- **Dashboard**

  - User-friendly interface
  - Overview of learning progress
  - Quick access to playlists and roadmaps

- **Playlist Management**

  - Create and manage learning playlists
  - Add/remove videos to playlists
  - Video search functionality
  - Playlist sharing capabilities

- **Roadmap Features**
  - Create structured learning roadmaps
  - Track progress through learning paths
  - Customizable roadmap milestones

## 🛠 Tech Stack

- **Frontend Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Type Checking:** TypeScript
- **Linting:** ESLint
- **Code Formatting:** Prettier (configured with ESLint)

## 📝 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v7 or higher)

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd project-7
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Auth/            # Authentication related components
│   ├── Dashboard/       # Dashboard components
│   └── Playlists/      # Playlist and roadmap components
├── context/             # React context providers
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and helpers
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## ⚙️ Configuration

The project uses several configuration files:

- `vite.config.ts`: Vite configuration
- `tsconfig.json`: TypeScript configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `eslint.config.js`: ESLint rules and settings
- `postcss.config.js`: PostCSS configuration

## 📜 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build locally

## 🔐 Authentication

The application implements a comprehensive authentication system:

- User registration with email validation
- Secure login with JWT tokens
- Protected routes using React Context
- Session management

## 🧩 Components

### Authentication Components

- `LoginForm`: Handles user login
- `RegisterForm`: Manages user registration

### Dashboard Components

- `Dashboard`: Main dashboard interface
- `Header`: Navigation and user info

### Playlist Components

- `PlaylistCard`: Displays playlist information
- `PlaylistView`: Detailed playlist view
- `CreatePlaylistModal`: Modal for creating new playlists
- `VideoSearchModal`: Search and add videos
- `RoadmapCard`: Displays roadmap information
- `CreateRoadmapModal`: Create new learning roadmaps

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
