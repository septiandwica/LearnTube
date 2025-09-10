import React, { useState } from "react";
import {
  Play,
  Book,
  CheckCircle,
  Clock,
  Edit,
  Trash2,
  MapPin,
  Route,
} from "lucide-react";
import { Playlist } from "../../types";

interface PlaylistCardProps {
  playlist: Playlist;
  onClick: () => void;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  onClick,
  onEdit,
  onDelete,
}) => {
  // Calculate total videos and completed videos from roadmap
  const totalVideos = playlist.roadmap.reduce(
    (total, roadmap) => total + roadmap.videos.length,
    0
  );
  const completedVideos = playlist.roadmap.reduce((total, roadmap) => {
    return (
      total +
      roadmap.videos.filter((video) => video.progress === "Completed").length
    );
  }, 0);

  // Calculate progress percentage
  const progressPercentage =
    totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;

  // Calculate roadmap count
  const roadmapCount = playlist.roadmap?.length ?? 0;

  // State for editing playlist title
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(playlist.title);

  // Function to edit playlist
  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isEditing) {
      if (newTitle.trim() !== playlist.title && newTitle.trim() !== "") {
        onEdit(playlist._id, newTitle.trim());
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      onDelete(playlist._id);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEdit(e as any);
    } else if (e.key === "Escape") {
      setNewTitle(playlist.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      onClick={onClick}
      className="relative group bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Background gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/20 transition-all duration-300"></div>

      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300 shadow-sm">
                <Book className="w-6 h-6 text-blue-600" />
              </div>
              {/* Progress indicator dot */}
              {progressPercentage === 100 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                  <CheckCircle className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              {isEditing ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full text-lg font-semibold bg-transparent border-b-2 border-blue-300 focus:border-blue-500 focus:outline-none text-gray-900 pb-1"
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 truncate">
                  {playlist.title}
                </h3>
              )}
              <div className="flex items-center space-x-2 mt-1">
                <Route className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-500">
                  {roadmapCount} learning journey{roadmapCount !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handleEdit}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              title={isEditing ? "Save changes" : "Edit playlist"}
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Delete playlist"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Learning Progress
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-900">
                {completedVideos}/{totalVideos}
              </span>
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {Math.round(progressPercentage)}%
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative w-full bg-gray-200/60 rounded-full h-2.5 shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-700 shadow-sm relative overflow-hidden"
              style={{ width: `${progressPercentage}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5 text-xs text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">{completedVideos} completed</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-gray-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="font-medium">
                  {totalVideos - completedVideos} remaining
                </span>
              </div>
            </div>
            <span className="text-xs text-gray-400 bg-white/60 px-2 py-1 rounded-full">
              {new Date(playlist.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};
