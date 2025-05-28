import React, { use, useEffect, useState } from 'react';
import { Menu, X, Lock, LogOut, Sun, Moon } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const { user, logOut } = use(AuthContext)

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(false);

    const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "light" ? "light" : "dark"
    );

    // Load theme from localStorage on component mount
    useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme);
    document.querySelector("html").setAttribute("data-theme", savedTheme);
    }, [theme]);

    // Toggle theme function
    const handleThemeChange = (state) => {
    setTheme(state);
    localStorage.setItem("theme", state);
    };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleTheme = () => {
    setIsDark(!isDark)
    handleThemeChange( isDark ? 'dark' : 'light')
  }

  const handleLogout = () =>{
        // //console.log("logging out")
        navigate('/login')
        logOut()
            .then(() => {
                // //console.log("logged out")
            })
            .catch((error) => {
                // console.error("Error logging out:", error)
            })
    }

  return (
    <nav className={`md:navbar z-10 ${
            pathname === '/'
            ? "absolute top-0 left-0 w-full z-50 bg-transparent text-white/80 rounded-xl"
            : 'bg-white/5 backdrop-blur-sm rounded-xl sticky top-0'
        }`}
    >
      <div className="xl:w-8/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between gap-20 items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to={'/'} className="text-xl font-light">Taskfolio</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/add-tasks'}>Add Task</NavLink>
                <NavLink to={'/browse-tasks'}>Browse Tasks</NavLink>
                <NavLink to={'/my-posted-tasks'}>Posted Tasks</NavLink>
              {/* Login/Signup Button */}
                <div className="flex">
            {
                user ?
                (<>
                    <button
                        onClick={() =>
                            navigate('/user/' + user.email)
                        }
                        className="flex items-center gap-1 rounded-lg">
                        <div className="tooltip tooltip-bottom "
                            data-tip={user.displayName}>

                            <img src={user.photoURL}
                                 alt="User"
                                className="size-9 rounded-full overflow-hidden border-3 border-blue-600 object-cover" />
                            </div>
                        </button>
                    <button
                        onClick={handleLogout}
                        className="hover:bg-white/10 transition-colors flex items-center gap-1 px-4 py-2 rounded-lg font-semibold">
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </>)

                : (
                <div className="flex">
                    <button
                            onClick={ () => navigate('/login')}
                            className={`ml-4 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                            isLoggedIn
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'text-blue hover:bg-blue-700 hover:text-white'
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={ () => navigate('/signup')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isLoggedIn
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'text-blue hover:bg-blue-700 hover:text-white'
                        }`}
                    >
                        Sign Up
                    </button>
                </div>
                )
            }

                </div>

        {/* Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`relative p-3 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none ${
              isDark
                ? 'focus:ring-blue-800 text-gray-700'
                : 'focus:ring-blue-300 text-gray-700'
            } ${
            pathname === '/'
                ? "bg-transparent text-white/80 rounded-xl"
                : 'bg-white/5'
            }`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >

              <Sun
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 dark:text-white ${
                  isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <Moon
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                }`}
              />

          </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="bg-transparent mr-4 px-2 pb-4 flex flex-col items-end space-y-6"
          >
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/add-tasks'}>Add Task</NavLink>
                <NavLink to={'/browse-tasks'}>Browse Tasks</NavLink>
                <NavLink to={'/my-posted-tasks'}>Posted Tasks</NavLink>
                                <div className="flex">
            {
                user ?
                (<div className='flex flex-col items-center'>
                    <button
                        onClick={() =>
                            navigate('/user/' + user.email)
                        }
                        className="flex items-center gap-1 rounded-lg">
                        <div className="tooltip tooltip-bottom "
                            data-tip={user.displayName}>

                            <img src={user.photoURL}
                                 alt="User"
                                className="size-9 rounded-full overflow-hidden border-3 border-blue-600 object-cover" />
                            </div>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="hover:bg-white/10 transition-colors flex items-center gap-1 px-4 py-2 rounded-lg font-semibold">
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </div>)

                : (
                <div className="flex">
                    <button
                            onClick={ () => navigate('/login')}
                            className={`ml-4 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                            isLoggedIn
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'text-blue hover:bg-blue-700 hover:text-white'
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={ () => navigate('/signup')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isLoggedIn
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'text-blue hover:bg-blue-700 hover:text-white'
                        }`}
                    >
                        Sign Up
                    </button>
                </div>
                )
            }

                </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
