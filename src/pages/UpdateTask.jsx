import axios from 'axios';
import React, { useState, useEffect, use } from 'react';
import { useParams, useNavigate } from 'react-router';
import Success from '../components/Success';
import { AuthContext } from '../provider/AuthProvider';

const UpdateTask = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = use(AuthContext)
  const [formData, setFormData] = useState({})
  const [updating, setUpdating] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

    useEffect( () => {

        axios.get(`/api/tasks/${id}`)
        .then((res) => {
            setFormData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [id])
    console.log(formData)
  // Categories for dropdown
  const categories = [
    'Web Development',
    'Mobile Development',
    'Design',
    'Marketing',
    'Writing',
    'Quality Assurance',
    'Data Entry',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      axios.patch(`/api/tasks/${id}`, formData)
        .then(response => {
            console.log('Update successful:', response.data);
            setShowSuccessAlert(true)
        })
        .catch(error => {
            console.error('Error updating:', error);
        });

        setTimeout(() => {
            setShowSuccessAlert(false);
        }, 2000);
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      { showSuccessAlert &&  <Success message={'Task Updated Successfully'}/>}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-2xl text-center font-bold text-gray-900">Update Task</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Task Title */}
            <div>
              <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task title"
                required
              />
            </div>

            {/* Task Description */}
            <div>
              <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Task Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the task requirements..."
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Deadline */}
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                Deadline *
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                Budget ($) *
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                min="1"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter budget amount"
                required
              />
            </div>

            {/* Read-only User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* User Name - Read Only */}
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={user.displayName}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>

              {/* User Email - Read Only */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Email
                </label>
                <input
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  value={user.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">

             <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
             </button>
              <button
                type="submit"
                disabled={updating}
                className={`flex-1 py-2 px-4 rounded-md text-white font-medium transition-colors ${
                  updating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }`}
              >
                {updating ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  'Update Task'
                )}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
