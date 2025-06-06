import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Calendar, DollarSign, User, Mail, FileText, Tag, AlertCircle } from 'lucide-react';
import axios from 'axios';
import Success from '../components/Success';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../components/Loading';

// Constants
const CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Graphic Design',
  'Content Writing',
  'Digital Marketing',
  'SEO Services',
  'Data Science',
  'Software Testing',
  'DevOps',
  'Blockchain',
  'AI/Machine Learning',
  'Video Editing',
  'Photography',
  'Translation',
  'Virtual Assistant',
  'Accounting',
  'Legal Services'
];

const INITIAL_FORM_DATA = {
  title: '',
  category: '',
  description: '',
  deadline: '',
  budget: '',
  bids: 0,
  postedDate: new Date().toISOString().split('T')[0],
  userInfo: {
    name: '',
    email: '',
    memberSince: '',
    avatar: '',
    bio: ''
  }
};

const AddTask = () => {
  // State management
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [userDetails, setUserDetails] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Context
  const { user } = useContext(AuthContext);

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user?.email) return;

      setIsLoading(true);
      try {
        const response = await axios.get(`https://taskfolio-server-site.vercel.app/api/users/${user.email}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // You might want to show an error message to the user here
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [user?.email]);

  // Update form data when user details are fetched
  useEffect(() => {
    if (user && userDetails) {
      setFormData(prev => ({
        ...prev,
        userInfo: {
          email: user.email,
          name: userDetails.name || user.displayName || '',
          memberSince: userDetails.memberSince || '',
          avatar: userDetails.avatar || '',
          bio: userDetails.bio || '',
        }
      }));
    }
  }, [user, userDetails]);

  // Validation function
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required';
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const selectedDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate <= today) {
        newErrors.deadline = 'Deadline must be in the future';
      }
    }

    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    } else if (isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
      newErrors.budget = 'Budget must be a valid positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Form submission handler
  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('https://taskfolio-server-site.vercel.app/api/tasks', formData);
      //console.log('Task created successfully:', response.data);

      setShowSuccessAlert(true);
      setFormData(INITIAL_FORM_DATA);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
      //console.log(formData.postedDate)

    } catch (error) {
      console.error('Error submitting task:', error);
      // You might want to show an error message to the user here
      setErrors({ submit: 'Failed to submit task. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input change handler
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  }, [errors]);

  // Get today's date for min date validation
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#292E35] py-12">
      {/* Success Alert */}
      {showSuccessAlert && <Success message="Task Added Successfully" />}

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 dark:text-white">
            Post a New Project
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-[#292E35] border border-gray-200 shadow-sm">
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Task Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3 dark:text-white">
                      <FileText size={16} className="inline mr-2" />
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={`w-full px-4 py-3 border ${
                        errors.title ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="e.g., Build a responsive e-commerce website"
                      maxLength={100}
                      required
                    />
                    {errors.title && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.title}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-gray-500">
                      {formData.title.length}/100 characters
                    </p>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3 dark:text-white">
                      <Tag size={16} className="inline mr-2" />
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className={`w-full px-4 py-3 border ${
                        errors.category ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      required
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.category}
                      </p>
                    )}
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3 dark:text-white">
                      <Calendar size={16} className="inline mr-2" />
                      Project Deadline *
                    </label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => handleInputChange('deadline', e.target.value)}
                      min={getTodayDate()}
                      className={`w-full px-4 py-3 border ${
                        errors.deadline ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      required
                    />
                    {errors.deadline && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.deadline}
                      </p>
                    )}
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3 dark:text-white">
                      <DollarSign size={16} className="inline mr-2" />
                      Budget (USD) *
                    </label>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className={`w-full px-4 py-3 border ${
                        errors.budget ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="Enter your budget"
                      min="1"
                      step="0.01"
                      required
                    />
                    {errors.budget && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.budget}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3 dark:text-white">
                      Project Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={6}
                      className={`w-full px-4 py-3 border ${
                        errors.description ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none`}
                      placeholder="Describe your project in detail. Include specific requirements, deliverables, and any technical specifications..."
                      maxLength={2000}
                      required
                    />
                    {errors.description && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.description}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-gray-500">
                      {formData.description.length}/2000 characters
                    </p>
                  </div>

                  {/* User Email (Read Only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3 dark:text-white">
                      <Mail size={16} className="inline mr-2" />
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={formData.userInfo.email}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                    <p className="mt-2 text-xs text-gray-500">This field cannot be edited</p>
                  </div>

                  {/* User Name (Read Only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3 dark:text-white">
                      <User size={16} className="inline mr-2" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.userInfo.name}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                    <p className="mt-2 text-xs text-gray-500">This field cannot be edited</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                {errors.submit && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-2" />
                      {errors.submit}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    type="button"
                    className="px-12 py-4 border border-gray-300 text-gray-700 text-sm font-medium tracking-wide hover:bg-gray-50 transition-colors dark:text-white"
                    onClick={() => window.history.back()}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-12 py-4 text-sm font-medium tracking-wide transition-colors ${
                      isSubmitting
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        POSTING PROJECT...
                      </span>
                    ) : (
                      'POST PROJECT'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            By posting a project, you agree to our terms of service. Your project will be reviewed
            and published within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
