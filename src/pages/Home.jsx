import { Star } from 'lucide-react';
import { Link } from 'react-router';
import Slider from '../components/Slider';

const Home = () => {

  // Sample data for featured tasks (sorted by deadline)
  const featuredTasks = [
    {
      id: 1,
      title: "Website Redesign for E-commerce Store",
      description: "Looking for a skilled web designer to redesign our online store with modern UI/UX principles.",
      budget: 1500,
      deadline: "2025-05-28",
      category: "Web Design",
      bids: 12,
      client: "TechStore Inc",
      skills: ["UI/UX", "HTML/CSS", "JavaScript"]
    },
    {
      id: 2,
      title: "Mobile App Development - iOS & Android",
      description: "Need experienced developer to create a fitness tracking mobile application.",
      budget: 3000,
      deadline: "2025-05-30",
      category: "Mobile Development",
      bids: 8,
      client: "FitLife Co",
      skills: ["React Native", "iOS", "Android"]
    },
    {
      id: 3,
      title: "Logo Design for New Startup",
      description: "Creative logo design needed for tech startup in the AI space.",
      budget: 500,
      deadline: "2025-06-02",
      category: "Graphic Design",
      bids: 25,
      client: "AI Innovations",
      skills: ["Adobe Illustrator", "Branding", "Logo Design"]
    },
    {
      id: 4,
      title: "Content Writing - Blog Articles",
      description: "Need 10 SEO-optimized blog articles about digital marketing trends.",
      budget: 800,
      deadline: "2025-06-05",
      category: "Content Writing",
      bids: 18,
      client: "Marketing Pro",
      skills: ["SEO", "Content Writing", "Digital Marketing"]
    },
    {
      id: 5,
      title: "Data Analysis & Visualization",
      description: "Analyze sales data and create interactive dashboards using Python.",
      budget: 1200,
      deadline: "2025-06-08",
      category: "Data Science",
      bids: 6,
      client: "RetailCorp",
      skills: ["Python", "Pandas", "Tableau"]
    },
    {
      id: 6,
      title: "Social Media Management Setup",
      description: "Set up and optimize social media accounts across multiple platforms.",
      budget: 600,
      deadline: "2025-06-10",
      category: "Social Media",
      bids: 15,
      client: "Local Restaurant",
      skills: ["Social Media", "Content Strategy", "Marketing"]
    }
  ];

  // Top categories data
  const topCategories = [
    { name: "Web Development", jobs: 1250, icon: "💻", growth: "+12%" },
    { name: "Graphic Design", jobs: 890, icon: "🎨", growth: "+8%" },
    { name: "Content Writing", jobs: 750, icon: "✍️", growth: "+15%" },
    { name: "Digital Marketing", jobs: 620, icon: "📈", growth: "+20%" },
    { name: "Mobile Apps", jobs: 480, icon: "📱", growth: "+25%" },
    { name: "Data Science", jobs: 340, icon: "📊", growth: "+30%" }
  ];

  // Success stories data
  const successStories = [
    {
      client: "Sarah Johnson",
      freelancer: "Alex Chen",
      project: "E-commerce Platform",
      rating: 5,
      testimonial: "Alex delivered an outstanding e-commerce platform that exceeded our expectations. Professional, timely, and great communication throughout.",
      amount: "$2,500"
    },
    {
      client: "Mike Rodriguez",
      freelancer: "Emma Wilson",
      project: "Brand Identity Design",
      rating: 5,
      testimonial: "Emma created a beautiful brand identity that perfectly captured our company's vision. Highly recommend her creative expertise!",
      amount: "$800"
    },
    {
      client: "Tech Startup Inc",
      freelancer: "David Kim",
      project: "Mobile App Development",
      rating: 5,
      testimonial: "David built our iOS app with incredible attention to detail. The app launched successfully and our users love it!",
      amount: "$4,200"
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDaysUntilDeadline = (dateString) => {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#292E35]">
      {/* Hero Slider Section */}
      <section className="relative overflow-hidden">
        <Slider />
      </section>

      {/* Featured Tasks Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#292E35]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">Featured Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Connect with top-tier opportunities from leading companies worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTasks.map((task) => (
              <div key={task.id} className="bg-white dark:bg-[#292E35] rounded-none shadow-sm hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 group cursor-pointer">
                <div className="p-8">
                  {/* Header with category and urgency */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      {task.category}
                    </div>
                    <div className="flex items-center text-orange-500 text-xs font-medium">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                      {getDaysUntilDeadline(task.deadline)} DAYS LEFT
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {task.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm line-clamp-3">
                    {task.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {task.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded-full font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-100">
                    <div className="text-2xl font-light text-gray-900 dark:text-white">
                      ${task.budget.toLocaleString()}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Proposals</div>
                      <div className="text-sm font-medium text-gray-900">{task.bids}</div>
                    </div>
                  </div>

                  {/* Client and deadline */}
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-6">
                    <span className="font-medium">{task.client}</span>
                    <span>Due {formatDate(task.deadline)}</span>
                  </div>

                  {/* CTA */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-full bg-blue-600 text-white py-3 text-sm font-medium tracking-wide hover:bg-blue-700 transition-colors">
                      VIEW PROJECT
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to={'/browse-tasks'} className="bg-white border border-gray-300 text-gray-800 px-12 py-4 text-sm font-medium tracking-wide hover:bg-gray-50 transition-colors">
              EXPLORE ALL PROJECTS
            </Link>
          </div>
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="py-20 bg-white dark:bg-[#292E35]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">In-Demand Skills</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore the most sought-after expertise across industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topCategories.map((category, index) => (
              <div key={index} className="bg-white dark:bg-[#292E35] border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer group">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-4xl opacity-80 group-hover:opacity-100 transition-opacity">
                      {category.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Growth</div>
                      <div className="text-green-600 font-medium text-sm">{category.growth}</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>

                  <div className="mb-6">
                    <div className="text-2xl font-light text-gray-900 dark:text-white mb-1">
                      {category.jobs.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Active Projects
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <div className="text-blue-600 text-sm font-medium tracking-wide group-hover:text-blue-700 transition-colors">
                      EXPLORE OPPORTUNITIES →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#292E35]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Real partnerships that delivered exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white dark:bg-[#292E35] border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="p-8">
                  {/* Rating and Amount */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-current mr-1" />
                      ))}
                    </div>
                    <div className="text-2xl font-light text-gray-900 dark:text-white">{story.amount}</div>
                  </div>

                  {/* Project Type */}
                  <div className="text-xs text-blue-600 uppercase tracking-wider font-semibold mb-4">
                    {story.project}
                  </div>

                  {/* Testimonial */}
                  <blockquote className="text-gray-700 leading-relaxed mb-8 text-sm italic">
                    "{story.testimonial}"
                  </blockquote>

                  {/* Client and Freelancer Info */}
                  <div className="border-t border-gray-100 pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900 text-sm mb-1">{story.client}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Client</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-blue-600 text-sm mb-1">{story.freelancer}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Talent</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="bg-white border border-gray-300 text-gray-800 px-12 py-4 text-sm font-medium tracking-wide hover:bg-gray-50 transition-colors">
              VIEW MORE STORIES
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
