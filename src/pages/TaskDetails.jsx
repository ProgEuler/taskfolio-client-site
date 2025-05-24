import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, DollarSign, User, Clock, MapPin, Star, MessageCircle, Heart, Share2, Flag, CheckCircle, Users, Briefcase } from 'lucide-react';
import { useLoaderData, useNavigate, useParams } from 'react-router';

const TaskDetails = ({ taskId = 1 }) => {
    const tasks = useLoaderData()
    const {id} = useParams()
    console.log(tasks, id)

  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [proposal, setProposal] = useState('');
  const [proposedBudget, setProposedBudget] = useState('');



  const navigator = useNavigate()
  useEffect(() => {
    // Simulate API call
      const Task = tasks.find( task => task._id === parseInt(id))
      setTask(Task)
      setLoading(false);
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

  const handleContactPoster = () => {
    console.log('Opening message composer to contact Sarah Johnson');
  };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         {/* Loading State */}
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12  border border-gray-200 shadow-sm-2  border border-gray-200 shadow-sm-blue-600  border border-gray-200 shadow-sm-t-transparent mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading task details...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!tasks) {
//     return (
//       <div className="min-h-screen bg-gray-50">

//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center py-12">
//             <h3 className="text-lg font-medium text-gray-900 mb-2">Task not found</h3>
//             <p className="text-gray-600">The task you're looking for doesn't exist.</p>
//             <button
//               onClick={() => navigator('/browse-tasks')}
//               className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white   hover:bg-blue-700"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to Browse Tasks
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

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
            <div className="bg-white border border-gray-200 shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                    {task?.category}
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
            <div className="bg-white border border-gray-200 shadow-sm p-6 mb-6">
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
                  {(task.skills || []).map((skill, index) => (
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
          <div className="lg:col-span-1 top-16 sticky self-start h-fit">
            {/* Action Buttons */}
            <div className="bg-white border border-gray-200 shadow-sm mb-6 backdrop-blur-sm rounded-xl p-6">
              <button
                onClick={handleApply}
                className="w-full bg-blue-600 text-white py-3 px-4   font-medium hover:bg-blue-700 transition-colors duration-200 mb-3"
              >
                Apply for This Task
              </button>
              <button
                onClick={handleContactPoster}
                className="w-full shadow-sm  border border-gray-200 shadow-sm-gray-300 text-gray-700 py-3 px-4   font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Contact Client
              </button>
            </div>

            {/* Poster Information */}
<div className="bg-white border border-gray-200 shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Client</h3>

              <div className="flex items-center mb-4">
                <img
                  src={task.posterInfo?.avatar}
                  alt={task.posterInfo?.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{task.posterInfo?.name}</h4>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">
                      {task.posterInfo?.rating} ({task.posterInfo?.reviewsCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Member since:</span>
                  <span className="font-medium">
                    {task.posterInfo?.memberSince
                      ? new Date(task.posterInfo.memberSince).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
                      : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Projects completed:</span>
                  <span className="font-medium">{task.posterInfo?.completedProjects}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600">{task.posterInfo?.bio}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TaskDetails;
