import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, DollarSign, User, Clock, MapPin, Star, Heart, Share2, Flag, CheckCircle, Briefcase } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Loading from '../components/Loading';

const TaskDetails = () => {
    const { id } = useParams()

  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});
  const [bidsCount, setBidsCount] = useState(0);
  const [showBidsMessage, setShowBidsMessage] = useState(false);
  const [disableBidButton, setDisableBidButton] = useState(false);

    useEffect( () => {
        axios.get('/api/tasks/' + id)
        .then((res) => {
            console.log(res.data)
            setTask(res.data)
            setBidsCount(res.data.bids); // Assuming bidsCount is part of the task data
            setLoading(false);
        })
        .catch((err) => {
            console.log(err)
            setLoading(false);
        })
    }, [id]);
    console.log(task)

  const navigator = useNavigate()

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

  const handleBidsCount = () => {
    setShowBidsMessage(true);
    setBidsCount(prevCount => prevCount + 1);
    setDisableBidButton(true);
    axios.patch('/api/tasks/' + id , { bids: bidsCount + 1 })
        .then((res) => {
            console.log(res.data);
            }
        )
        .catch((err) => {
            console.error(err);
        });
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#292E35]">

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="flex justify-between items-center mb-6">
        <button
          onClick={ () => navigator('/browse-tasks')}
          className="inline-flex items-center text-gray-600 dark:text-white hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Browse Tasks
        </button>

        {/* Always Visible Bid Count */}
          <div className="bg-white dark:bg-[#292E35] border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
            <p className="text-sm text-gray-600 dark:text-white">
                Bids Count :
              <span className="font-semibold text-blue-600"> {bidsCount} </span>
            </p>
          </div>
        </div>

        {/* Bid Status Banner - Only when you have bids */}
        { showBidsMessage && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 font-medium">
              You bid for {bidsCount - 1} {bidsCount-1 === 1 ? 'opportunity' : 'opportunities'}.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Task Header */}
            <div className="bg-white dark:bg-[#292E35] border border-gray-200 shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                    {task?.category}
                  </span>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{task.title}</h1>
                  <p className="text-gray-600 dark:text-gray-200">{task.description}</p>
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
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-white">

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted {formatDate(task.postedDate)}</span>
                </div>
              </div>
            </div>

            {/* Task Details */}
            <div className="bg-white dark:bg-[#292E35] border border-gray-200 shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Details</h2>

              {/* Project Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-white">Budget</p>
                    <p className="font-semibold text-lg text-gray-900 dark:text-gray-400">{formatBudget(task.budget)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-white">Deadline</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-400">{formatDate(task.deadline)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-white">Duration</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-400">5-6 Weeks</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-white">Location</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-400">Remote</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-white">Experience Level</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-400">Intermediate</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-white">Status</p>
                    <p className="font-semibold text-green-600">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 top-16 sticky self-start h-fit">
            {/* Action Buttons */}
            <div className="bg-white dark:bg-[#292E35] border border-gray-200 shadow-sm mb-6 backdrop-blur-sm rounded-xl p-6">
              <input
                onClick={handleBidsCount}
                className="w-full bg-blue-600 text-white py-3 px-4   font-medium hover:bg-blue-700 transition-colors duration-200 mb-3 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                disabled={disableBidButton}
                type="button"
                value="Bid for this Task"
              />

              <button
                className="w-full shadow-sm  border border-gray-200 shadow-sm-gray-300 text-gray-700 py-3 px-4 dark:text-white dark:hover:text-black  font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Contact Client
              </button>
            </div>

            {/* Poster Information */}
            <div className="bg-white dark:bg-[#292E35] border border-gray-200 shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-400 mb-4">About the Client</h3>

              <div className="flex items-center mb-4">
                <img
                  src={task.userInfo?.avatar}
                  alt={task.userInfo?.name}
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-400 ">{task.userInfo?.name}</h4>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-white">
                      4.5
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 dark:text-white mb-4">
                <div className="flex justify-between">
                  <span>Member since:</span>
                  <span className="font-medium">
                    {task.userInfo?.memberSince}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-white">{task.userInfo?.bio}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TaskDetails;
