import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
// import { toast } from 'react-hot-toast';
// import Swal from 'sweetalert2'; // Alternative to toast

const UpdateTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    taskTitle: '',
    taskDescription: '',
    category: '',
    priority: 'Medium',
    deadline: '',
    budget: '',
    userName: '',
    userEmail: ''
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

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

  const priorities = ['Low', 'Medium', 'High', 'Urgent'];

  // Fetch existing task data on component mount
  useEffect(() => {
    fetchTaskData();
  }, [taskId]);

  const fetchTaskData = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch(`/api/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch task data');
      }

      const taskData = await response.json();

      // Populate form with existing data
      setFormData({
        taskTitle: taskData.taskTitle || '',
        taskDescription: taskData.taskDescription || '',
        category: taskData.category || '',
        priority: taskData.priority || 'Medium',
        deadline: taskData.deadline || '',
        budget: taskData.budget || '',
        userName: taskData.userName || '',
        userEmail: taskData.userEmail || ''
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching task:', error);
      toast.error('Failed to load task data');
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.taskTitle.trim()) {
      toast.error('Task title is required');
      return;
    }

    if (!formData.taskDescription.trim()) {
      toast.error('Task description is required');
      return;
    }

    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }

    if (!formData.deadline) {
      toast.error('Deadline is required');
      return;
    }

    if (!formData.budget || formData.budget <= 0) {
      toast.error('Please enter a valid budget');
      return;
    }

    try {
      setUpdating(true);

      // Prepare data for API (excluding read-only fields from update)
      const updateData = {
        taskTitle: formData.taskTitle.trim(),
        taskDescription: formData.taskDescription.trim(),
        category: formData.category,
        priority: formData.priority,
        deadline: formData.deadline,
        budget: parseFloat(formData.budget)
      };

      // Replace with your actual API endpoint
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const result = await response.json();

      // Success message using toast
      toast.success('Task updated successfully!');

      // Alternative using SweetAlert2
      // Swal.fire({
      //   title: 'Success!',
      //   text: 'Task updated successfully!',
      //   icon: 'success',
      //   confirmButtonText: 'OK'
      // });

      // Redirect to tasks list or dashboard after short delay
      setTimeout(() => {
        navigate('/dashboard'); // or wherever you want to redirect
      }, 1500);

    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.');

      // Alternative using SweetAlert2
      // Swal.fire({
      //   title: 'Error!',
      //   text: 'Failed to update task. Please try again.',
      //   icon: 'error',
      //   confirmButtonText: 'OK'
      // });
    } finally {
      setUpdating(false);
    }
  };

  // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading task data...</p>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Update Task</h1>
            <p className="text-gray-600 mt-2">Modify the task details below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Task Title */}
            <div>
              <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title *
              </label>
              <input
                type="text"
                id="taskTitle"
                name="taskTitle"
                value={formData.taskTitle}
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
                id="taskDescription"
                name="taskDescription"
                value={formData.taskDescription}
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

            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
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
                  value={formData.userName}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>

              {/* User Email - Read Only */}
              <div>
                <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  User Email
                </label>
                <input
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  value={formData.userEmail}
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
