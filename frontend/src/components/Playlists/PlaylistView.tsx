import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, MapPin, Flag, Route } from 'lucide-react';
import { Playlist, Roadmap } from '../../types';
import { apiClient } from '../../utils/api';
import { RoadmapCard } from './RoadmapCard';
import { CreateRoadmapModal } from './CreateRoadmapModal';
import { VideoSearchModal } from './VideoSearchModal';

interface PlaylistViewProps {
  playlist: Playlist;
  onBack: () => void;
  onUpdate: () => void;
}

export const PlaylistView: React.FC<PlaylistViewProps> = ({ playlist, onBack, onUpdate }) => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateRoadmap, setShowCreateRoadmap] = useState(false);
  const [showVideoSearch, setShowVideoSearch] = useState<{ roadmapId: string; roadmapTitle: string } | null>(null);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (playlist?.id) {
      fetchRoadmaps();
    }
  }, [playlist?.id]);

  const fetchRoadmaps = async () => {
    if (!playlist?.id) return;

    setIsLoading(true);
    try {
      const response = await apiClient.getRoadmaps(playlist.id);
      const roadmapsData = response.data || response;

      const normalizedRoadmaps = roadmapsData.map((r: any) => ({
        ...r,
        id: r.id || r._id,
      }));

      setRoadmaps(normalizedRoadmaps);
    } catch (err: any) {
      setError(err.message || 'Failed to load roadmaps');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRoadmap = async (title: string) => {
    await apiClient.createRoadmap(playlist.id, title);
    fetchRoadmaps();
    onUpdate();
  };

  const handleDeleteRoadmap = async (roadmapId: string) => {
    if (window.confirm('Are you sure you want to delete this roadmap?')) {
      try {
        await apiClient.deleteRoadmap(playlist.id, roadmapId);
        fetchRoadmaps();
        onUpdate();
      } catch (err: any) {
        setError(err.message || 'Failed to delete roadmap');
      }
    }
  };

  const handleEditRoadmap = async (roadmapId: string, newTitle: string) => {
    try {
      await apiClient.updateRoadmap(playlist.id, roadmapId, newTitle);
      fetchRoadmaps();
      onUpdate();
    } catch (err: any) {
      setError(err.message || 'Failed to edit roadmap');
    }
  };

  const handleAddVideo = (roadmapId: string, roadmapTitle: string) => {
    setShowVideoSearch({ roadmapId, roadmapTitle });
  };

  const handleVideoAdded = () => {
    fetchRoadmaps();
    onUpdate();
    setShowVideoSearch(null);
  };

  const getProgressStats = () => {
    const totalRoadmaps = roadmaps.length;
    const completedRoadmaps = roadmaps.filter(roadmap => {
      const completedVideos = roadmap.videos.filter(video => video.progress === "Completed").length;
      return completedVideos === roadmap.videos.length && roadmap.videos.length > 0;
    }).length;
    
    return { completed: completedRoadmaps, total: totalRoadmaps };
  };

  // Filter roadmaps based on search query
  const filteredRoadmaps = roadmaps.filter((roadmap) =>
    roadmap.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-gray-600 font-medium">Loading your learning journey...</p>
          </div>
        </div>
      </div>
    );
  }

  const stats = getProgressStats();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-100 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-100 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-100 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-3 hover:bg-white bg-white/80 backdrop-blur-sm rounded-xl transition-all duration-200 border border-white/50 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
                <Route className="w-8 h-8 text-blue-600 mr-3" />
                {playlist.title}
              </h1>
              <p className="text-gray-600 mt-1 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {roadmaps.length} learning journey{roadmaps.length !== 1 ? 's' : ''} • {stats.completed}/{stats.total} completed
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowCreateRoadmap(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Create Journey</span>
          </button>
        </div>

        {/* Roadmap Search */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Search roadmaps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Progress Overview */}
        {roadmaps.length > 0 && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Flag className="w-5 h-5 text-blue-600 mr-2" />
                Journey Overview
              </h2>
              <div className="text-sm text-gray-600 bg-white/80 px-3 py-1 rounded-full">
                {Math.round((stats.completed / stats.total) * 100) || 0}% Complete
              </div>
            </div>
            
            <div className="w-full bg-gray-200/50 rounded-full h-3 shadow-inner">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${(stats.completed / stats.total) * 100 || 0}%` }}
              >
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 text-green-500 mr-1" />
                {stats.completed} Completed
              </span>
              <span className="flex items-center">
                <Flag className="w-4 h-4 text-blue-600 mr-1" />
                {stats.total - stats.completed} In Progress
              </span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {roadmaps.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <div className="relative inline-block">
              {/* Animated Road */}
              <div className="w-32 h-2 bg-gray-300 rounded-full mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/50 animate-pulse"></div>
                <div className="absolute left-1/2 top-0 w-0.5 h-2 bg-white/80 transform -translate-x-1/2"></div>
              </div>
              
              {/* Start and End Markers */}
              <div className="absolute -left-2 -top-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="absolute -right-2 -top-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Flag className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Start Your Learning Journey</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
              Create your first learning roadmap to organize your educational content and track your progress along the way.
            </p>
            <button
              onClick={() => setShowCreateRoadmap(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium text-lg"
            >
              🚀 Begin Journey
            </button>
          </div>
        ) : (
          /* Roadmaps Container - Responsive Layout */
          <div className="w-full">
            {/* Mobile/Tablet: Horizontal Scrolling */}
            <div className="block lg:hidden">
              <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
               
                {filteredRoadmaps.map((roadmap, index) => (
                  <div 
                    key={roadmap.id}
                    className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[60vw]"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <RoadmapCard
                      roadmap={roadmap}
                      playlistId={playlist.id}
                      onAddVideo={() => handleAddVideo(roadmap.id, roadmap.title)}
                      onDelete={() => handleDeleteRoadmap(roadmap.id)}
                      onUpdate={fetchRoadmaps}
                      onEdit={handleEditRoadmap}
                    />
                  </div>
                ))}
              </div>
              
              {/* Mobile Scroll Indicator */}
              {filteredRoadmaps.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {filteredRoadmaps.map((_, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 rounded-full bg-gray-300"
                    ></div>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop: Grid Layout (2 columns) */}
            <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {filteredRoadmaps.map((roadmap, index) => (
                <div 
                  key={roadmap.id}
                  className="relative group"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <RoadmapCard
                    roadmap={roadmap}
                    playlistId={playlist.id}
                    onAddVideo={() => handleAddVideo(roadmap.id, roadmap.title)}
                    onDelete={() => handleDeleteRoadmap(roadmap.id)}
                    onUpdate={fetchRoadmaps}
                    onEdit={handleEditRoadmap}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modals */}
        <CreateRoadmapModal
          isOpen={showCreateRoadmap}
          onClose={() => setShowCreateRoadmap(false)}
          onCreateRoadmap={handleCreateRoadmap}
        />

        {showVideoSearch && (
          <VideoSearchModal
            isOpen={true}
            onClose={() => setShowVideoSearch(null)}
            playlistId={playlist.id}
            roadmapId={showVideoSearch.roadmapId}
            roadmapTitle={showVideoSearch.roadmapTitle}
            onVideoAdded={handleVideoAdded}
          />
        )}
      </div>

    </div>
  );
};