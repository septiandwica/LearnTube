const BASE_URL = import.meta.env.VITE_API_URL;

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Set token to local storage
  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  // Remove token from local storage
  removeToken() {
    localStorage.removeItem("token");
  }

  // Get Authorization header if token exists
  private getAuthorizationHeader() {
    const token = localStorage.getItem("token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {}; // Return empty object if no token
  }

  // Core method for making API requests
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    // Merge default headers with custom headers passed in options
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthorizationHeader(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      // Check for unsuccessful responses
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Auth methods
  async register(userData: any) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: any) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }
async verifyEmail(token: string) {
  return this.request(`/auth/verify/${token}`);
}
  async getProfile() {
    return this.request("/auth/profile");
  }

  // Playlist methods
  async getUserPlaylists() {
    return this.request("/playlist/user");
  }

  async createPlaylist(title: string) {
    return this.request("/playlist/create", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
  }

  async searchYouTube(query: string) {
    return this.request(`/playlist/search?q=${encodeURIComponent(query)}`);
  }

  async createRoadmap(playlistId: string, title: string) {
    return this.request(`/playlist/create-roadmap/${playlistId}`, {
      method: "POST",
      body: JSON.stringify({ title }),
    });
  }

  async getRoadmaps(playlistId: string) {
    return this.request(`/playlist/roadmap/${playlistId}`);
  }

  async addVideoToRoadmap(playlistId: string, roadmapId: string, videoData: any) {
    return this.request(`/playlist/add-video/${playlistId}/${roadmapId}`, {
      method: "POST",
      body: JSON.stringify({ videoData }),
    });
  }

  async updateVideoProgress(playlistId: string, roadmapId: string, videoId: string, progress: string) {
    return this.request(`/playlist/update-progress/${playlistId}/${roadmapId}`, {
      method: "PUT",
      body: JSON.stringify({ videoId, progress }),
    });
  }

  async deleteVideoFromRoadmap(playlistId: string, roadmapId: string, videoId: string) {
    return this.request(`/playlist/delete-video/${playlistId}/${roadmapId}/${videoId}`, {
      method: "DELETE",
    });
  }

  // 1. Edit Playlist
  async updatePlaylist(playlistId: string, title: string) {
    return this.request(`/playlist/update-playlist/${playlistId}`, {
      method: "PUT",
      body: JSON.stringify({ title }),
    });
  }

  // 2. Edit Roadmap
  async updateRoadmap(playlistId: string, roadmapId: string, title: string) {
    return this.request(`/playlist/update-roadmap/${playlistId}/${roadmapId}`, {
      method: "PUT",
      body: JSON.stringify({ title }),
    });
  }
    async deleteRoadmap(playlistId: string, roadmapId: string) {
    return this.request(`/playlist/delete-roadmap/${playlistId}/${roadmapId}`, {
      method: "DELETE",
    });
  }

  // 3. Delete Playlist
  async deletePlaylist(playlistId: string) {
    return this.request(`/playlist/delete-playlist/${playlistId}`, {
      method: "DELETE",
    });
  }

  // 4. Delete Roadmap

}

// Create an instance of ApiClient
export const apiClient = new ApiClient(BASE_URL);
