import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, DollarSign, User, Clock, MapPin, Star, MessageCircle, Heart, Share2, Flag, CheckCircle, Users, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router';

const TaskDetails = ({ taskId = 1 }) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [proposal, setProposal] = useState('');
  const [proposedBudget, setProposedBudget] = useState('');

  // Mock data - in real app, this would come from your database based on taskId
  const mockTaskData = {
    1: {
      id: 1,
      title: 'Build a responsive e-commerce website',
      description: 'Looking for a skilled developer to create a modern, responsive e-commerce platform with payment integration, user authentication, and admin dashboard. The website should be built using modern web technologies and follow best practices for performance and security.',
      fullDescription: `We need a comprehensive e-commerce solution that includes:

**Frontend Requirements:**
- Responsive design that works on all devices
- Modern, clean user interface
- Product catalog with search and filtering
- Shopping cart functionality
- User registration and login system
- Order tracking system

**Backend Requirements:**
- Secure payment processing integration (Stripe/PayPal)
- User authentication and authorization
- Product management system
- Order management system
- Admin dashboard for site management
- RESTful API design

**Technical Specifications:**
- Built with React.js or Vue.js for frontend
- Node.js/Express or similar for backend
- Database: PostgreSQL or MongoDB
- Deployment on AWS or similar cloud platform
- SSL certificate and security best practices
- SEO optimization

**Deliverables:**
- Complete source code with documentation
- Deployed application on staging and production
- Admin user guide
- 30 days of post-launch support

The ideal candidate should have experience with full-stack development, e-commerce platforms, and modern web technologies. Please provide examples of similar projects you've completed.`,
      category: 'Web Development',
      budget: 2500,
      deadline: '2025-06-15',
      postedBy: 'Sarah Johnson',
      postedDate: '2025-05-20',
      status: 'Active',
      location: 'Remote',
      experienceLevel: 'Intermediate to Expert',
      estimatedDuration: '4-6 weeks',
      skills: ['React.js', 'Node.js', 'PostgreSQL', 'Payment Integration', 'Responsive Design', 'E-commerce'],
      posterInfo: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        rating: 4.8,
        reviewsCount: 24,
        memberSince: '2023-01',
        completedProjects: 12,
        bio: 'Digital marketing specialist and entrepreneur running a growing online retail business. Looking for reliable developers to help scale our technology infrastructure.'
      },
      proposals: 8,
      views: 156,
      favorites: 12
    },
    // Add more mock tasks here if needed
  };
  const navigator = useNavigate()
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const taskData = mockTaskData[taskId];
      if (taskData) {
        setTask(taskData);
      }
      setLoading(false);
    }, 1000);
  }, [taskId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatBudget = (budget) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(budget);
  };

  const handleApply = () => {
    setShowApplyModal(true);
  };

  const handleSubmitProposal = () => {
    // In a real app, this would submit the proposal to the backend
    alert('Proposal submitted successfully!');
    setShowApplyModal(false);
    setProposal('');
    setProposedBudget('');
  };

  const handleContactPoster = () => {
    alert('Opening message composer to contact Sarah Johnson');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Loading State */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12  border border-gray-200 shadow-sm-2  border border-gray-200 shadow-sm-blue-600  border border-gray-200 shadow-sm-t-transparent mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading task details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Task not found</h3>
            <p className="text-gray-600">The task you're looking for doesn't exist.</p>
            <button
              onClick={() => navigator('/browse-tasks')}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white   hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse Tasks
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={ () => navigator('/browse-tasks')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Browse Tasks
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Task Header */}
            <div className="bg-white   shadow-sm  border border-gray-200 shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                    {task.category}
                  </span>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h1>
                  <p className="text-gray-600">{task.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-orange-500">
                    <Flag className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Task Stats */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>{task.proposals} proposals</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{task.views} views</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  <span>{task.favorites} favorites</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted {formatDate(task.postedDate)}</span>
                </div>
              </div>
            </div>

            {/* Task Details */}
            <div className="bg-white   shadow-sm  border border-gray-200 shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h2>

              {/* Project Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-semibold text-lg text-gray-900">{formatBudget(task.budget)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-semibold text-gray-900">{formatDate(task.deadline)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">{task.estimatedDuration}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{task.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Experience Level</p>
                    <p className="font-semibold text-gray-900">{task.experienceLevel}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold text-green-600">{task.status}</p>
                  </div>
                </div>
              </div>

              {/* Skills Required */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {task.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Full Description</h3>
                <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                  {task.fullDescription}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Action Buttons */}
            <div className="bg-white   shadow-sm  border border-gray-200 shadow-sm p-6 mb-6">
              <button
                onClick={handleApply}
                className="w-full bg-blue-600 text-white py-3 px-4   font-medium hover:bg-blue-700 transition-colors duration-200 mb-3"
              >
                Apply for This Task
              </button>
              <button
                onClick={handleContactPoster}
                className="w-full  border border-gray-200 shadow-sm  border border-gray-200 shadow-sm-gray-300 text-gray-700 py-3 px-4   font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Contact Client
              </button>
            </div>

            {/* Poster Information */}
            <div className="bg-white   shadow-sm  border border-gray-200 shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Client</h3>

              <div className="flex items-center mb-4">
                <img
                  src={task.posterInfo.avatar}
                  alt={task.posterInfo.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{task.posterInfo.name}</h4>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">
                      {task.posterInfo.rating} ({task.posterInfo.reviewsCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Member since:</span>
                  <span className="font-medium">{new Date(task.posterInfo.memberSince).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Projects completed:</span>
                  <span className="font-medium">{task.posterInfo.completedProjects}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600">{task.posterInfo.bio}</p>
            </div>

            {/* Similar Tasks */}
            <div className="bg-white   shadow-sm  border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Tasks</h3>
              <div className="space-y-3">
                <div className=" border border-gray-200 shadow-sm-b  border border-gray-200 shadow-sm-gray-100 pb-3">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">Mobile App Development</h4>
                  <p className="text-xs text-gray-600 mb-2">iOS and Android app for fitness tracking...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-600">$1,800</span>
                    <span className="text-xs text-gray-500">5 days left</span>
                  </div>
                </div>
                <div className=" border border-gray-200 shadow-sm-b  border border-gray-200 shadow-sm-gray-100 pb-3">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">Website Redesign</h4>
                  <p className="text-xs text-gray-600 mb-2">Modern redesign for corporate website...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-600">$1,200</span>
                    <span className="text-xs text-gray-500">8 days left</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm mb-1">API Integration</h4>
                  <p className="text-xs text-gray-600 mb-2">Third-party API integration for existing app...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-600">$800</span>
                    <span className="text-xs text-gray-500">12 days left</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white   max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for This Task</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Proposal
                </label>
                <textarea
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  placeholder="Describe your approach, experience, and why you're the best fit for this project..."
                  className="w-full px-3 py-2  border border-gray-200 shadow-sm  border border-gray-200 shadow-sm-gray-300   focus:ring-2 focus:ring-blue-500 focus: border border-gray-200 shadow-sm-transparent"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Budget (USD)
                </label>
                <input
                  type="number"
                  value={proposedBudget}
                  onChange={(e) => setProposedBudget(e.target.value)}
                  placeholder="2500"
                  className="w-full px-3 py-2  border border-gray-200 shadow-sm  border border-gray-200 shadow-sm-gray-300   focus:ring-2 focus:ring-blue-500 focus: border border-gray-200 shadow-sm-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowApplyModal(false)}
                className="flex-1 px-4 py-2  border border-gray-200 shadow-sm  border border-gray-200 shadow-sm-gray-300 text-gray-700   hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitProposal}
                disabled={!proposal.trim() || !proposedBudget}
                className="flex-1 px-4 py-2 bg-blue-600 text-white   hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Proposal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
