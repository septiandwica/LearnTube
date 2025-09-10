import React, { useState } from "react";
import { X, Search, Play, Plus, Youtube, Calendar, User } from "lucide-react";
import { YouTubeVideo } from "../../types";
import { apiClient } from "../../utils/api";

interface VideoSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlistId: string;
  roadmapId: string;
  roadmapTitle: string;
  onVideoAdded: () => void;
}

export const VideoSearchModal: React.FC<VideoSearchModalProps> = ({
  isOpen,
  onClose,
  playlistId,
  roadmapId,
  roadmapTitle,
  onVideoAdded,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState<string | null>(null);
  const [error, setError] = useState("");

  if (!isOpen) return null;
const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!searchQuery.trim()) return;

  setIsSearching(true);
  setError("");

  try {
    const response = await apiClient.searchYouTube(searchQuery);
    setSearchResults(response.data || response);
  } catch (err: any) {
    setError(err?.response?.data?.error?.message || "Too many requests to API, please try again later.");
  } finally {
    setIsSearching(false);
  }
};


  const handleAddVideo = async (video: YouTubeVideo) => {
    setIsAdding(video.videoId);
    setError("");

    try {
      await apiClient.addVideoToRoadmap(playlistId, roadmapId, {
        videoId: video.videoId,
        videoTitle: video.videoTitle,
        thumbnailUrl: video.thumbnailUrl,
        videoUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
      });
      onVideoAdded();
    } catch (err: any) {
      setError(err.message || "Failed to add video");
    } finally {
      setIsAdding(null);
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setSearchResults([]);
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] border border-white/20 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100/20 rounded-full blur-xl"></div>
            <div className="absolute -top-2 right-20 w-16 h-16 bg-purple-100/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-green-100/20 rounded-full blur-xl"></div>
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/20 bg-white/50 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center shadow-sm">
                <Youtube className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Add Video to Journey
                </h2>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Adding to:{" "}
                  <span className="font-medium ml-1">{roadmapTitle}</span>
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 flex flex-col max-h-[calc(85vh-120px)]">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex space-x-3 mb-6">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for YouTube videos..."
                  className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-xl font-medium"
              >
                {isSearching ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </>
                )}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4 text-red-700 text-sm mb-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Results */}
            <div className="flex-1 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((video, index) => (
                    <div
                      key={video.videoId}
                      className="group bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-4 hover:shadow-lg hover:bg-white/70 transition-all duration-300 shadow-sm"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: "fadeInUp 0.4s ease-out forwards",
                      }}
                    >
                      {/* Mobile/Tablet Layout - Column */}
                      <div className="block lg:hidden space-y-4">
                        {/* Thumbnail */}
                        <div className="relative w-full">
                          <img
                            src={video.thumbnailUrl}
                            alt={video.videoTitle}
                            className="w-full h-40 sm:h-48 object-cover rounded-xl shadow-sm"
                          />
                          <div className="absolute inset-0 bg-black/10 rounded-xl flex items-center justify-center">
                            <div
                              className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                              onClick={() =>
                                window.open(video.videoUrl, "_blank")
                              } // Menambahkan fungsionalitas untuk membuka video URL
                            >
                              <Play className="w-6 h-6 text-white ml-1" />
                            </div>
                          </div>
                        </div>
                        {/* Title */}
                        <div>
                          <h3 className="font-semibold text-gray-900 text-base sm:text-lg leading-tight mb-3">
                            {video.videoTitle}
                          </h3>
                        </div>

                        {/* Channel & Date Info */}
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span className="font-medium">
                              {video.channelTitle}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(video.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-center space-x-3 pt-2">
                          <button
                            onClick={() => handleAddVideo(video)}
                            disabled={isAdding === video.videoId}
                            className="flex-1 flex items-center justify-center space-x-2 p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-medium"
                          >
                            {isAdding === video.videoId ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            ) : (
                              <>
                                <Plus className="w-5 h-5" />
                                <span>Add to Journey</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Desktop Layout - Row */}
                      <div className="hidden lg:flex space-x-4">
                        {/* Thumbnail */}
                        <div className="flex-shrink-0 relative group">
                          <img
                            src={video.thumbnailUrl}
                            alt={video.videoTitle}
                            className="w-36 h-20 object-cover rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-200"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-all duration-200 flex items-center justify-center">
                            <div
                              className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg cursor-pointer"
                              onClick={() =>
                                window.open(video.videoUrl, "_blank")
                              } // Menambahkan fungsionalitas untuk membuka video URL
                            >
                              <Play className="w-4 h-4 text-white ml-0.5" />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                            {video.videoTitle}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span className="font-medium">
                                {video.channelTitle}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(video.publishedAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex-shrink-0 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => handleAddVideo(video)}
                            disabled={isAdding === video.videoId}
                            className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-xl font-medium"
                          >
                            {isAdding === video.videoId ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            ) : (
                              <>
                                <Plus className="w-4 h-4" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery && !isSearching ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No videos found
                  </h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    We couldn't find any videos matching "
                    <span className="font-medium">{searchQuery}</span>". Try a
                    different search term.
                  </p>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                      <Youtube className="w-10 h-10 text-red-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <Search className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Discover Learning Videos
                  </h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    Search YouTube for educational content to add to your
                    learning journey.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
