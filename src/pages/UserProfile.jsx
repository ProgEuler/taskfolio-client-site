import React, { useState } from 'react';
import { Edit2, Save, X, Star, Calendar, CheckCircle, User } from 'lucide-react';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Mark Chen",
    avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=150",
    rating: 4.6,
    reviewsCount: 18,
    memberSince: "2022-10",
    completedProjects: 14,
    bio: "Health tech startup founder passionate about building tools to improve well-being through technology."
  });

  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile });
  };

  const handleSave = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatMemberSince = (dateStr) => {
    const [year, month] = dateStr.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white h-screen">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 text-white relative">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <img src={editedProfile.avatar}
                    alt={profile.name}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                     />
                  </div>
                )}
              </div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-2xl font-bold bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    placeholder="Full Name"
                  />
                ) : (
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                )}
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{profile.rating}</span>
                    <span className="opacity-90">({profile.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 text-black py-2 rounded-md flex items-center space-x-2 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-white text-black px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="border text-white px-3 py-2 rounded-md flex items-center space-x-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                {isEditing ? (
                  <input
                    type="month"
                    value={editedProfile.memberSince}
                    onChange={(e) => handleInputChange('memberSince', e.target.value)}
                    disabled
                    className="font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
                  />
                ) : (
                  <p className="font-semibold text-gray-900">{formatMemberSince(profile.memberSince)}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed Projects</p>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile.completedProjects}
                    onChange={(e) => handleInputChange('completedProjects', parseInt(e.target.value) || 0)}
                    className="font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-semibold text-gray-900">{profile.completedProjects}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={editedProfile.rating}
                      disabled
                      onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 0)}
                      className="font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 w-16 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
                    />
                  </div>
                ) : (
                  <p className="font-semibold text-gray-900">{profile.rating}/5</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="px-6 py-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
          {isEditing ? (
            <textarea
              value={editedProfile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={4}
              className="w-full text-gray-700 leading-relaxed border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          )}
        </div>

        {/* Avatar URL Editor (only visible when editing) */}
        {isEditing && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Avatar URL</h4>
            <input
              type="url"
              value={editedProfile.avatar}
              onChange={(e) => handleInputChange('avatar', e.target.value)}
              className="w-full text-sm text-gray-700 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter image URL"
            />
          </div>
        )}
      </div>
    </div>
  );
}
