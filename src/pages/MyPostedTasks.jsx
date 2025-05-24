import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Users, Calendar, DollarSign, Search, Filter, ChevronDown, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router';

const MyPostedTasks = () => {
  const navigator = useNavigate()
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Mock user data - in real app, this would come from authentication
  const currentUser = {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com'
  };

  // Mock data - in real app, this would come from your database filtered by user ID
  const mockUserTasks = [
    {
      id: 1,
      title: 'Build a responsive e-commerce website',
      category: 'Web Development',
      budget: 2500,
      deadline: '2025-06-15',
      status: 'Active',
      postedDate: '2025-05-20',
      bidsCount: 8,
      viewsCount: 156
    },
    {
      id: 2,
      title: 'Social Media Marketing Campaign',
      category: 'Marketing',
      budget: 1500,
      deadline: '2025-06-20',
      status: 'Active',
      postedDate: '2025-05-18',
      bidsCount: 12,
      viewsCount: 89
    },
    {
      id: 3,
      title: 'Logo Design for Tech Startup',
      category: 'Design',
      budget: 800,
      deadline: '2025-05-28',
      status: 'In Progress',
      postedDate: '2025-05-10',
      bidsCount: 15,
      viewsCount: 234,
      assignedTo: 'Alex Designer'
    },
    {
      id: 4,
      title: 'Mobile App User Testing',
      category: 'Quality Assurance',
      budget: 600,
      deadline: '2025-05-25',
      status: 'Completed',
      postedDate: '2025-05-05',
      bidsCount: 6,
      viewsCount: 67,
      completedDate: '2025-05-22'
    },
    {
      id: 5,
      title: 'Content Writing for Blog',
      category: 'Writing',
      budget: 400,
      deadline: '2025-06-01',
      status: 'Paused',
      postedDate: '2025-05-12',
      bidsCount: 9,
      viewsCount: 45
    }
  ];

  const statusOptions = ['all', 'Active', 'In Progress', 'Completed', 'Paused'];

  useEffect(() => {
    // Simulate API call to fetch user's tasks
    setTimeout(() => {
      setTasks(mockUserTasks);
      setFilteredTasks(mockUserTasks);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = tasks;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, statusFilter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-gray-100 text-gray-800',
      'Paused': 'bg-yellow-100 text-yellow-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const handleUpdate = (taskId) => {
    // In a real app, this would navigate to edit task page
    alert(`Navigating to update task with ID: ${taskId}`);
    // Example: navigate(`/edit-task/${taskId}`);
  };

  const handleDelete = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      // In a real app, this would make API call to delete task
      setTasks(tasks.filter(task => task.id !== taskToDelete.id));
      alert(`Task "${taskToDelete.title}" has been deleted successfully!`);
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };

  const handleViewBids = (taskId) => {
    // In a real app, this would navigate to bids page
    alert(`Viewing bids for task ID: ${taskId}`);
    // Example: navigate(`/task/${taskId}/bids`);
  };

//   const handleAddNewTask = () => {
//     // In a real app, this would navigate to add task page
//     alert('Navigating to Add New Task page');
//     // Example: navigate('/add-task');
//   };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Posted Tasks</h1>
            <p className="text-gray-600">Manage and track all your posted tasks</p>
          </div>
          <button
            onClick={() => navigator('/add-tasks')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white    font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Task
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100   ">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{tasks.length}</h3>
                <p className="text-gray-600 text-sm">Total Tasks</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100   ">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{tasks.filter(t => t.status === 'Active').length}</h3>
                <p className="text-gray-600 text-sm">Active Tasks</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100   ">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{tasks.reduce((sum, task) => sum + task.bidsCount, 0)}</h3>
                <p className="text-gray-600 text-sm">Total Bids</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100   ">
                <Eye className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{tasks.filter(t => t.status === 'Completed').length}</h3>
                <p className="text-gray-600 text-sm">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white    shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 shadow-sm shadow-sm-gray-300    focus:ring-2 focus:ring-blue-500 focus:border shadow-sm-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-48 pl-10 pr-8 py-2 shadow-sm border shadow-sm-gray-300    focus:ring-2 focus:ring-blue-500 focus:border border-gray-200 shadow-sm-transparent appearance-none bg-white"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Eye className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-4">
                {tasks.length === 0
                  ? "You haven't posted any tasks yet. Start by creating your first task!"
                  : "Try adjusting your filters to see more results."
                }
              </p>
              {tasks.length === 0 && (
                <button
                  onClick={() => navigator('/add-tasks')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white    font-medium hover:bg-blue-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Post Your First Task
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Task Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status & Stats
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {task.title}
                          </div>
                          <div className="text-sm text-gray-500 mb-2">
                            {task.category}
                          </div>
                          <div className="text-xs text-gray-400">
                            Posted {formatDate(task.postedDate)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm">
                          <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="font-medium text-gray-900">
                            {formatBudget(task.budget)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          {formatDate(task.deadline)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          {getStatusBadge(task.status)}
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {task.bidsCount} bids
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {task.viewsCount} views
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleUpdate(task.id)}
                            className="inline-flex items-center px-3 py-1 border border-gray-200 shadow-sm border border-gray-200 shadow-sm-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                            title="Update Task"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(task)}
                            className="inline-flex items-center px-3 py-1 border border-gray-200 shadow-sm border border-gray-200 shadow-sm-red-300 rounded text-xs font-medium text-red-700 bg-white hover:bg-red-50"
                            title="Delete Task"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </button>
                          <button
                            onClick={() => handleViewBids(task.id)}
                            className="inline-flex items-center px-3 py-1 bg-blue-600 rounded text-xs font-medium text-white hover:bg-blue-700"
                            title="View Bids"
                          >
                            <Users className="h-3 w-3 mr-1" />
                            Bids ({task.bidsCount})
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && taskToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white    max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Delete Task</h3>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete "<span className="font-medium">{taskToDelete.title}</span>"?
              This action cannot be undone and will remove all associated bids and data.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 shadow-sm shadow-sm-gray-300 text-gray-700    hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white    hover:bg-red-700"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default MyPostedTasks;
