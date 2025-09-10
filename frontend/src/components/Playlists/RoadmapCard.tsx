import React, { useState } from "react";
import { Map, Plus, Play, CheckCircle, Clock, Trash2, Edit } from "lucide-react";
import { Roadmap } from "../../types";
import { apiClient } from "../../utils/api";

interface RoadmapCardProps {
  roadmap: Roadmap;
  playlistId: string;
  onAddVideo: () => void;
  onDelete: () => void;
  onUpdate: () => void;
  onEdit: (roadmapId: string, newTitle: string) => void;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({
  roadmap,
  playlistId,
  onAddVideo,
  onDelete,
  onUpdate,
  onEdit,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(roadmap.title);

  const completedVideos = roadmap.videos.filter(
    (video) => video.progress === "Completed"
  ).length;
  const progressPercentage =
    roadmap.videos.length > 0
      ? (completedVideos / roadmap.videos.length) * 100
      : 0;

  const handleProgressUpdate = async (videoId: string, progress: string) => {
    try {
      await apiClient.updateVideoProgress(
        playlistId,
        roadmap.id,
        videoId,
        progress
      );
      onUpdate();
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const handleDeleteVideo = async (videoId: string) => {
    try {
      await apiClient.deleteVideoFromRoadmap(playlistId, roadmap.id, videoId);
      onUpdate();
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  };

  const handleEditTitle = () => {
    if (isEditingTitle) {
      if (newTitle.trim() !== roadmap.title && newTitle.trim() !== "") {
        onEdit(roadmap.id, newTitle.trim());
      }
    }
    setIsEditingTitle(!isEditingTitle);
  };

  const getStepIcon = (index: number, progress: string) => {
    if (progress === "Completed") {
      return <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />;
    } else if (progress === "In Progress") {
      return <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-500" />;
    } else {
      return (
        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-xs lg:text-sm font-bold text-gray-600">{index + 1}</span>
        </div>
      );
    }
  };

  const getStepLineColor = (currentIndex: number) => {
    if (currentIndex >= roadmap.videos.length - 1) return "";
    
    const currentVideo = roadmap.videos[currentIndex];
    
    if (currentVideo.progress === "Completed") {
      return "bg-green-500";
    } else if (currentVideo.progress === "In Progress") {
      return "bg-yellow-500";
    }
    return "bg-gray-300";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-lg transition-all duration-200 w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 lg:mb-6">
        <div className="flex items-center space-x-2 lg:space-x-3 flex-1 min-w-0">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Map className="w-4 h-4 lg:w-5 lg:h-5 text-teal-600" />
          </div>
          <div className="min-w-0 flex-1">
            {/* Title Section */}
            {isEditingTitle ? (
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="font-semibold text-gray-900 text-sm lg:text-base w-full border-b-2 border-teal-500 focus:outline-none"
              />
            ) : (
              <h3 className="font-semibold text-gray-900 text-sm lg:text-base truncate">{roadmap.title}</h3>
            )}
            <p className="text-xs lg:text-sm text-gray-500">
              Learning Path • {roadmap.videos.length}/3 Steps
            </p>
          </div>
        </div>
        <div className="flex space-x-1 lg:space-x-2">
          {/* Edit Button */}
          <button
            onClick={handleEditTitle}
            className="text-gray-400 hover:text-teal-600 p-1.5 lg:p-2 flex-shrink-0"
          >
            <Edit className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
          </button>
          {/* Delete Button */}
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-600 p-1.5 lg:p-2 flex-shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
          </button>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="mb-4 lg:mb-6">
        <div className="flex items-center justify-between text-xs lg:text-sm mb-2">
          <span className="text-gray-600">Overall Progress</span>
          <span className="font-medium text-gray-900">
            {completedVideos}/{roadmap.videos.length} Completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 lg:h-2">
          <div
            className="bg-gradient-to-r from-teal-500 to-teal-600 h-1.5 lg:h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Roadmap Steps - Scrollable on mobile */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4 lg:space-y-6 mb-4 lg:mb-6">
          {roadmap.videos.map((video, index) => (
            <div key={video.videoId} className="relative">
              <div className="flex space-x-2 lg:space-x-4">
                {/* Step Icon */}
                <div className="flex flex-col items-center flex-shrink-0">
                  {getStepIcon(index, video.progress || "To Do")}
                  {/* Connecting Line */}
                  {index < roadmap.videos.length - 1 && (
                    <div 
                      className={`w-0.5 lg:w-1 h-12 lg:h-16 mt-2 lg:mt-3 ${getStepLineColor(index)} rounded-full`}
                    ></div>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0 pt-0.5 lg:pt-1">
                  {/* Step Label */}
                  <div className="text-xs text-teal-600 font-semibold mb-1.5 lg:mb-2 tracking-wide">
                    STEP {index + 1}
                  </div>
                  
                  {/* Video Card */}
                  <div className="bg-gray-50 rounded-lg p-3 lg:p-4 border border-gray-100">
                    {/* Thumbnail */}
                    <img
                      src={video.thumbnailUrl}
                      alt={video.videoTitle}
                      className="w-full h-16 lg:h-24 rounded-lg object-cover mb-2 lg:mb-3"
                    />

                    {/* Video Title */}
                    <h4 className="text-xs lg:text-sm font-medium text-gray-900 mb-2 lg:mb-3 line-clamp-2 leading-snug">
                      {video.videoTitle}
                    </h4>

                    {/* Action Buttons */}
                    <div className="space-y-1.5 lg:space-y-2">
                      <button
                        onClick={() => window.open(video.videoUrl, "_blank")}
                        className="w-full flex items-center justify-center space-x-1.5 lg:space-x-2 px-3 lg:px-4 py-2 lg:py-2.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-xs lg:text-sm font-medium transition-colors"
                      >
                        <Play className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span>Watch Video</span>
                      </button>

                      <div className="flex space-x-1.5 lg:space-x-2">
                        <select
                          value={video.progress || "To Do"}
                          onChange={(e) =>
                            handleProgressUpdate(video.videoId, e.target.value)
                          }
                          className="flex-1 text-xs lg:text-sm border border-gray-200 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                        >
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>

                        <button
                          onClick={() => handleDeleteVideo(video.videoId)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1.5 lg:p-2 border border-gray-200 rounded-lg hover:border-red-300 flex-shrink-0"
                        >
                          <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Video Button - Fixed at bottom */}
      <div className="mt-auto">
        <button
          onClick={onAddVideo}
          disabled={roadmap.videos.length >= 3}
          className="w-full border-2 border-dashed border-gray-300 hover:border-teal-400 text-gray-600 hover:text-teal-600 py-3 lg:py-4 px-3 lg:px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-1.5 lg:space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs lg:text-sm font-medium"
        >
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
          <span>
            {roadmap.videos.length >= 3 
              ? "Roadmap Complete (3/3)" 
              : `Add Step ${roadmap.videos.length + 1} (${roadmap.videos.length}/3)`
            }
          </span>
        </button>
      </div>
    </div>
  );
};