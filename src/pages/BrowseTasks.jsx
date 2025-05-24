import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, DollarSign, User, Eye, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);

  const navigator = useNavigate()

    useEffect( () => {
        axios.get('/api/tasks')
        .then((res) => {
            
            setTasks(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    console.log(tasks)

  const categories = ['all', 'Web Development', 'Design', 'Writing', 'Programming', 'Marketing'];

//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       setFilteredTasks(tasks);
//       setLoading(false);
//     }, 1000);
//   }, []);

  useEffect(() => {
    let filtered = tasks;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(task => task.category === selectedCategory);
    }

    // Sort tasks
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.postedDate) - new Date(a.postedDate);
        case 'oldest':
          return new Date(a.postedDate) - new Date(b.postedDate);
        case 'budget-high':
          return b.budget - a.budget;
        case 'budget-low':
          return a.budget - b.budget;
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        default:
          return 0;
      }
    });

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, selectedCategory, sortBy]);

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

  const handleSeeDetails = () => {
    // In a real app, this would navigate to the task details page
    // Example: navigate(`/task/${taskId}`);
  };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">

//         {/* Loading State */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border border-gray-200 shadow-sm-2 border border-gray-200 shadow-sm-blue-600 border border-gray-200 shadow-sm-t-transparent mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading tasks...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Filters and Search */}
        <div className="bg-white  shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 shadow-sm shadow-sm-gray-300  focus:ring-2 focus:ring-blue-500 focus:border shadow-sm-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-8 py-2 border border-gray-200 shadow-sm shadow-sm-gray-300  focus:ring-2 focus:ring-blue-500 focus:border shadow-sm-transparent appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 shadow-sm shadow-sm-gray-300  focus:ring-2 focus:ring-blue-500 focus:border shadow-sm-transparent appearance-none bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="budget-high">Highest Budget</option>
                <option value="budget-low">Lowest Budget</option>
                <option value="deadline">Deadline Soon</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </p>
        </div>

        {/* Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div key={task.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {task.category}
                    </span>
                  </div>

                  {/* Task Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {task.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {task.description}
                  </p>

                  {/* Task Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="font-medium text-gray-900">{formatBudget(task.budget)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Due: {formatDate(task.deadline)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-2" />
                      <span>Posted by {task.postedBy}</span>
                    </div>
                  </div>

                  {/* Posted Date */}
                  <div className="text-xs text-gray-400 mb-4">
                    Posted on {formatDate(task.postedDate)}
                  </div>

                  {/* See Details Button */}
                  <button
                    onClick={() => {
                        handleSeeDetails(task.id)
                        navigator('/task-details')
                    }
                    }

                    className="w-full bg-blue-600 text-white py-2 px-4  font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    See Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowseTasks;
