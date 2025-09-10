import React, { useState, useEffect } from "react";
import { Plus, BookOpen, Search, TrendingUp, Play, CheckCircle, Clock } from "lucide-react";
import { Playlist } from "../../types";
import { apiClient } from "../../utils/api";
import { PlaylistCard } from "../Playlists/PlaylistCard";
import { CreatePlaylistModal } from "../Playlists/CreatePlaylistModal";
import { PlaylistView } from "../Playlists/PlaylistView";

export const Dashboard: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await apiClient.getUserPlaylists();
      const playlistsData = response.data || response;
      const normalizedPlaylists = playlistsData.map((p: any) => ({
        ...p,
        id: p.id || p._id, 
      }));
      setPlaylists(normalizedPlaylists);
    } catch (err: any) {
      setError(err.message || "Failed to load playlists");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePlaylist = async (title: string) => {
    await apiClient.createPlaylist(title);
    fetchPlaylists();
  };

  const handlePlaylistClick = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handleBackToDashboard = () => {
    setSelectedPlaylist(null);
    fetchPlaylists();
  };

  const handleEditPlaylist = async (playlistId: string, newTitle: string) => {
    try {
      await apiClient.updatePlaylist(playlistId, newTitle);
      fetchPlaylists();
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    try {
      await apiClient.deletePlaylist(playlistId);
      fetchPlaylists();
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const getTotalVideos = (playlist: Playlist) => {
    return playlist.roadmap.reduce(
      (total, roadmap) => total + roadmap.videos.length,
      0
    );
  };

  const getCompletedVideos = (playlist: Playlist) => {
    return playlist.roadmap.reduce((total, roadmap) => {
      return (
        total +
        roadmap.videos.filter((video) => video.progress === "Completed").length
      );
    }, 0);
  };

  const getRemainingVideos = (playlist: Playlist) => {
    return playlist.roadmap.reduce((total, roadmap) => {
      return (
        total +
        roadmap.videos.filter((video) => video.progress !== "Completed").length
      );
    }, 0);
  };

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate global stats
  const totalVideos = filteredPlaylists.reduce(
    (total, playlist) => total + getTotalVideos(playlist),
    0
  );
  
  const totalCompleted = filteredPlaylists.reduce(
    (total, playlist) => total + getCompletedVideos(playlist),
    0
  );

  const totalRemaining = filteredPlaylists.reduce(
    (total, playlist) => total + getRemainingVideos(playlist),
    0
  );

  if (selectedPlaylist) {
    return (
      <PlaylistView
        playlist={selectedPlaylist}
        onBack={handleBackToDashboard}
        onUpdate={fetchPlaylists}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-gray-600 font-medium">Loading your playlists...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-100 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-green-100 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-teal-100 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              My Learning Playlists
            </h1>
            <p className="text-gray-600 mt-1 flex items-center">
              <Play className="w-4 h-4 mr-1" />
              Organize your learning journey with curated video playlists
            </p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Create Playlist</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4 text-red-700 text-sm shadow-sm">
            {error}
          </div>
        )}

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
            placeholder="Search your playlists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Playlists</p>
                <p className="text-2xl font-bold text-gray-900">{filteredPlaylists.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Videos</p>
                <p className="text-2xl font-bold text-gray-900">{totalVideos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{totalCompleted}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{totalRemaining}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        {filteredPlaylists.length > 0 && totalVideos > 0 && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                Overall Progress
              </h2>
              <div className="text-sm text-gray-600 bg-white/80 px-3 py-1 rounded-full">
                {Math.round((totalCompleted / totalVideos) * 100)}% Complete
              </div>
            </div>
            
            <div className="w-full bg-gray-200/50 rounded-full h-3 shadow-inner">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${(totalCompleted / totalVideos) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                {totalCompleted} Completed
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 text-orange-600 mr-1" />
                {totalRemaining} Remaining
              </span>
            </div>
          </div>
        )}

        {/* Playlists Grid or Empty State */}
        {filteredPlaylists.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <div className="relative inline-block mb-8">
              {/* Animated playlist icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Plus className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {searchQuery ? "No playlists found" : "Start Your Learning Journey"}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              {searchQuery 
                ? `No playlists match "${searchQuery}". Try a different search term.`
                : "Create your first playlist to organize your educational content and track your learning progress."
              }
            </p>
            
            {!searchQuery && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium text-lg"
              >
                🚀 Create First Playlist
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPlaylists.map((playlist, index) => (
              <div 
                key={playlist.id}
                className="group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <PlaylistCard
                  playlist={playlist}
                  onClick={() => handlePlaylistClick(playlist)}
                  onEdit={handleEditPlaylist}
                  onDelete={handleDeletePlaylist}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Playlist Modal */}
      <CreatePlaylistModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreatePlaylist={handleCreatePlaylist}
      />

    </div>
  );
};