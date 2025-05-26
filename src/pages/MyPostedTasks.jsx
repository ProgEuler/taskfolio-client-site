import React, { useState, useEffect, use } from 'react';
import { Plus, Edit, Trash2, Eye, Users, Calendar, DollarSign, Search, Filter, ChevronDown, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router';
import Loading from '../components/Loading';
import axios from 'axios';
import Modal from '../components/Modal';
import { AuthContext } from '../provider/AuthProvider';

const MyPostedTasks = () => {
  const navigator = useNavigate()
  const { user } = use(AuthContext)
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true)
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState({})

  const currentUser = {
    name: user.name,
    email: user.email
  };

  const statusOptions = ['all', 'Active', 'In Progress', 'Completed', 'Paused'];

useEffect( () => {
     axios.get('/api/tasks')
        .then((res) => {
            console.log(res.data)
            setTasks(res.data.filter(task => task.userEmail === currentUser.email))
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
}, []);
console.log(tasks)

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


  const handleUpdate = (taskId) => {
    navigator(`/update-task/${taskId}`)
  };

  const handleDelete = (task) => {
      console.log(taskToDelete)
    setTaskToDelete(task)
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {

    //   alert(`Task "${taskToDelete.title}" has been deleted successfully!`);
  try {

    await axios.delete(`/api/tasks/${taskToDelete._id}`);

        setTasks(tasks.filter(t => t._id !== taskToDelete._id));
        setShowDeleteModal(false);
        setTaskToDelete(null)
  } catch (error) {
    console.error('Error deleting task:', error);
    setShowDeleteModal(false);
  }
    setShowDeleteModal(false);

  };

  const handleViewBids = (taskId) => {
    // In a real app, this would navigate to bids page
    alert(`Viewing bids for task ID: ${taskId}`);
    // Example: navigate(`/task/${taskId}/bids`);
  };
  if(loading) return <Loading />
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
                <h3 className="text-2xl font-bold text-gray-900">{tasks.reduce((sum, task) => sum + task.bidsCount || 0, 0)}</h3>
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
        {
        loading ? <Loading /> :
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
                        <tr key={task._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                            <div>
                            <div className="text-sm font-medium text-gray-900 mb-1">
                                {task.title}
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                                {task.category}
                            </div>
                            <div className="text-xs text-gray-400">
                                Posted {task.postedDate}
                            </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center text-sm">
                            <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="font-medium text-gray-900">
                                {task.budget}
                            </span>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center text-sm text-gray-900">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            {task.deadline}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="space-y-2">
                            {task.status}
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
                                onClick={() => handleUpdate(task._id)}
                                className="inline-flex items-center px-3 py-1 border border-gray-200 shadow-sm shadow-sm-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                                title="Update Task"
                            >
                                <Edit className="h-3 w-3 mr-1" />
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(task)}
                                className="inline-flex items-center px-3 py-1 border border-gray-200 shadow-sm shadow-sm-red-300 rounded text-xs font-medium text-red-700 bg-white hover:bg-red-50"
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
        }
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && taskToDelete &&
        <Modal
            taskToDelete={taskToDelete}
            setShowDeleteModal={setShowDeleteModal}
            confirmDelete={confirmDelete}
        />
        }
    </div>
  )
}
export default MyPostedTasks;
