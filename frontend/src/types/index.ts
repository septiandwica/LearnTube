// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  createdAt: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Playlist types
export interface Video {
  videoId: string;
  videoTitle: string;
  videoUrl: string;
  progress?: 'Not Started' | 'In Progress' | 'Completed';
  thumbnailUrl?: string;
  duration?: string;
}

export interface Roadmap {
  id: string;
  title: string;
  videos: Video[];
  createdAt: string;
  progress?: number;
}

export interface Playlist {
  id: string;
  title: string;
  userId: string;
  roadmaps: Roadmap[];
  createdAt: string;
  totalVideos?: number;
  completedVideos?: number;
}

// YouTube Search types
export interface YouTubeVideo {
  videoId: string;
  videoTitle: string;
  videoUrl: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
  duration?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
}