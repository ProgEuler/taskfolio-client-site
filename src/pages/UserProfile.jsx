import React, { use, useEffect, useState } from 'react';
import { Edit2, Save, X, Star, Calendar, CheckCircle, User, Eye, Plus } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import { useParams } from 'react-router';

export default function UserProfile() {
  const { user, updateUser, setUser } = use(AuthContext);
  const { email } = useParams()

  const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState({});
    useEffect(() => {

        console.log("Fetching profile for user:", email);
         // Fetch profile data from the API
        axios.get(`/api/user/${email}`)
            .then(response => {
                setProfile(response.data);
                console.log("Profile data fetched:", response.data);
                console.log(user)
            })
            .catch(error => {
                console.error("Error fetching profile data:", error);
            });
    }, [])

  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [editedProfileForFirebase, setEditedProfileForFirebase] = useState({});
  const [newSkill, setNewSkill] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile });
  };

  const handleSave = () => {
    setProfile({ ...editedProfile });

    axios.patch(`/api/user/${email}`, editedProfile)
      .then(response => {
        console.log("Profile updated successfully:", response.data);
      })
      .catch(error => {
        console.error("Error updating profile:", error);
      });

    updateUser({
        photoURL: editedProfile.avatar,
        displayName: editedProfile.name,
     })
        .then(() => {
            console.log("User profile updated successfully");
            console.log(user)
            setUser(prev => ({
                ...prev,
                photoURL: editedProfile.avatar,
                displayName: editedProfile.name
            }));
        }
        )
        .catch(error => {
            console.error("Error updating user profile:", error);
        });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
    setNewSkill("");
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !editedProfile.skills.includes(newSkill.trim())) {
      setEditedProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setEditedProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

//   const formatMemberSince = (dateStr) => {
//     const [year, month] = dateStr.split('-');
//     const date = new Date(year, month - 1);
//     return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
//   };
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your profile information</p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="border border-gray-300 text-gray-700 bg-white px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{profile.tasksPosted}</p>
              <p className="text-gray-600">Tasks Posted</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{profile.tasksCompleted}</p>
              <p className="text-gray-600">Tasks Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{profile.completedProjects}</p>
              <p className="text-gray-600">Projects</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{profile.rating}</p>
              <p className="text-gray-600">Rating</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start space-x-6 mb-6">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-xl font-semibold text-gray-900 border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Full Name"
                  />
                ) : (
                  <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
                )}
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{profile.rating} rating</span>
                </div>
                <p className="text-sm text-gray-500">Member since {profile.memberSince}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">About</h3>
                {isEditing ? (
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                    className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-sm text-gray-700">{profile.bio || 'Bio'}</p>
                )}
              </div>

              {isEditing && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Avatar URL</h3>
                  <input
                    type="url"
                    value={editedProfile.avatar}
                    onChange={(e) => handleInputChange('avatar', e.target.value)}
                    className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter image URL"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skills & Stats */}
        <div className="space-y-6">
          {/* Skills */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Skills</h3>
            <div className="space-y-2">

              { editedProfile.skills && editedProfile.skills.length > 0 ? (
                editedProfile.skills.map((skill, index) => (

                  <div key={index} className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {skill}
                    </span>
                    </div>
                ))) : (
                <p className="text-sm text-gray-500">No skills added yet.</p>
                )}
              {isEditing && (
                <div className="flex space-x-2 mt-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add skill"
                  />
                  <button
                    onClick={addSkill}
                    className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
         </div>

          {/* Additional Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Member Since</span>
                {isEditing ? (
                  <input
                    type="month"
                    value={profile.memberSince}
                    readOnly
                    className="text-sm font-medium text-gray-900 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-900">
                    {profile.memberSince}</span>

                )}
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Projects</span>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile.completedProjects}
                    onChange={(e) => handleInputChange('completedProjects', parseInt(e.target.value) || 0)}
                    className="text-sm font-medium text-gray-900 border border-gray-300 rounded px-2 py-1 w-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-900">{profile.completedProjects}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tasks Posted</span>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile.tasksPosted}
                    onChange={(e) => handleInputChange('tasksPosted', parseInt(e.target.value) || 0)}
                    className="text-sm font-medium text-gray-900 border border-gray-300 rounded px-2 py-1 w-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-900">{profile.tasksPosted}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tasks Completed</span>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile.tasksCompleted}
                    onChange={(e) => handleInputChange('tasksCompleted', parseInt(e.target.value) || 0)}
                    className="text-sm font-medium text-gray-900 border border-gray-300 rounded px-2 py-1 w-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-900">{profile.tasksCompleted}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Rating</span>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={editedProfile.rating}
                    onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 0)}
                    className="text-sm font-medium text-gray-900 border border-gray-300 rounded px-2 py-1 w-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-900">{profile.rating}/5</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
