import React, { useState, useEffect, use } from 'react';
import { Plus, Edit, Trash2, Eye, Users, Calendar, DollarSign, Search, Filter, ChevronDown, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router';
import Loading from '../components/Loading';
import axios from 'axios';
import Modal from '../components/Modal';
import { AuthContext } from '../provider/AuthProvider';

const MyPostedTasks = () => {
  const navigate = useNavigate()
  const { user } = use(AuthContext)
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true)
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null)

  const currentUser = {
    name: user?.displayName || '', // Fixed: added optional chaining
    email: user?.email || '' // Fixed: added optional chaining
  };

  const statusOptions = ['all', 'Active', 'In Progress', 'Completed', 'Paused'];
  console.log(currentUser)
  useEffect(() => {
    axios.get('/api/tasks')
      .then((res) => {
        console.log(res.data)
        setTasks(res.data.filter(task => task.userInfo.email === currentUser.email))
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [currentUser.email]); // Fixed: added dependency array

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
    navigate(`/update-task/${taskId}`) // Fixed: updated variable name
  };

  const handleDelete = (task) => {
    console.log(task) // Fixed: log the correct variable
    setTaskToDelete(task)
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return; // Fixed: added null check

    try {
      await axios.delete(`/api/tasks/${taskToDelete._id}`);
      setTasks(tasks.filter(t => t._id !== taskToDelete._id));
      setShowDeleteModal(false);
      setTaskToDelete(null)
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setShowDeleteModal(false); // Fixed: moved to finally block to ensure it always runs
    }
  };

  const handleViewBids = (taskId) => {
    // In a real app, this would navigate to bids page
    alert(`Viewing bids for task ID: ${taskId}`);
    // Example: navigate(`/task/${taskId}/bids`);
  };

  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#292E35]">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Posted Tasks</h1>
          </div>
          <button
            onClick={() => navigate('/add-tasks')} // Fixed: updated variable name
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors duration-200" // Fixed: added 'rounded' class
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Task
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-[#292E35] border border-gray-200 rounded shadow-sm p-6">
            <div className="flex items-center">
                <p className="text-gray-600 dark:text-white text-sm">Total Tasks</p>
                <h3 className="ml-4 text-2xl font-bold text-gray-900 dark:text-white">{tasks.length}</h3>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-[#292E35] rounded shadow-sm border border-gray-200 p-4 mb-6"> {/* Fixed: added 'rounded' class */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" // Fixed: corrected class names
              />
            </div>

          </div>
        </div>

        {/* Tasks Table */}
        {
          loading ? <Loading /> :
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden"> {/* Fixed: added 'rounded' class */}
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Eye className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tasks found</h3>
                  <p className="text-gray-600 mb-4">
                    {tasks.length === 0
                      ? "You haven't posted any tasks yet. Start by creating your first task!"
                      : "Try adjusting your filters to see more results."
                    }
                  </p>
                  {tasks.length === 0 && (
                    <button
                      onClick={() => navigate('/add-tasks')} // Fixed: updated variable name
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700" // Fixed: added 'rounded' class
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Post Your First Task
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 dark:bg-[#292E35]">
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
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTasks.map((task) => (
                        <tr key={task._id} className="hover:bg-gray-50 dark:hover:bg-black dark:bg-[#292E35]">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                {task.title}
                              </div>
                              <div className="text-sm text-gray-500 mb-2">
                                {task.category}
                              </div>
                              <div className="text-xs text-gray-400">
                                Posted on {task.postedDate}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center text-sm">
                              <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="font-medium text-gray-900 dark:text-white">
                                {task.budget}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center text-sm text-gray-900 dark:text-white">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              {task.deadline}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleUpdate(task._id)}
                                className="inline-flex items-center px-3 py-1 border border-gray-200 rounded text-xs font-medium text-gray-700 dark:text-white bg-white hover:bg-gray-50 dark:hover:bg-black dark:bg-[#292E35]" // Fixed: corrected class names
                                title="Update Task"
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                Update
                              </button>
                              <button
                                onClick={() => handleDelete(task)}
                                className="inline-flex items-center px-3 py-1 border border-red-200 rounded text-xs font-medium text-red-700 bg-white hover:bg-red-50 dark:bg-transparent" // Fixed: corrected class names
                                title="Delete Task"
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Delete
                              </button>
                              <button
                                onClick={() => handleViewBids(task._id)} // Fixed: use _id instead of id
                                className="inline-flex items-center px-3 py-1 bg-blue-600 rounded text-xs font-medium text-white hover:bg-blue-700"
                                title="View Bids"
                              >
                                <Users className="h-3 w-3 mr-1" />
                                Bids ({task.bids || 0}) {/* Fixed: added fallback for undefined */}
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
      {showDeleteModal && taskToDelete && (
        <Modal
          taskToDelete={taskToDelete}
          setShowDeleteModal={setShowDeleteModal}
          confirmDelete={confirmDelete}
        />
      )}
    </div>
  )
}

export default MyPostedTasks;
