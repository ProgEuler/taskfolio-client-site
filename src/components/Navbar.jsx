import React, { use, useEffect, useState } from 'react';
import { Menu, X, Lock, LogOut, Sun, Moon } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const { user, logOut } = use(AuthContext)

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [isDark, setIsDark] = useState(false);

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
    const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    };

  // Apply theme to document body
//   useEffect(() => {
//     if (isDark) {
//       document.body.classList.add('dark');
//     } else {
//       document.body.classList.remove('dark');
//     }
//   }, [isDark]);

//   const toggleTheme = () => {
//     setIsDark(!isDark);
//   };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleLogout = () =>{
        // console.log("logging out")
        navigate('/login')
        logOut()
            .then(() => {
                // console.log("logged out")
            })
            .catch((error) => {
                // console.error("Error logging out:", error)
            })
    }

  return (
    <nav className={`navbar z-10 ${
            pathname === '/'
            ? "absolute top-0 left-0 w-full z-50 bg-transparent text-white/80 rounded-xl"
            : 'bg-white/5 backdrop-blur-sm rounded-xl sticky top-0'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-light">Taskfolio</h1>
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
                                 title={user.displayName}
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
                        className={`ml-4 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isLoggedIn
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        Sign Up
                    </button>
                </div>
                )
            }

            </div>

        {/* Toggle Button */}
          {/* <button
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
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <Moon
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                }`}
              />

          </button> */}
          <input
            type="checkbox"
            value="dark"
            className="toggle theme-controller mr-6"
            checked={theme === "dark"}
            onChange={handleThemeChange}
            />;
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center justify-between ${
                  item.protected && !isLoggedIn
                    ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={(e) => {
                  if (item.protected && !isLoggedIn) {
                    e.preventDefault();
                    alert('Please login to access this feature');
                  } else {
                    setIsMenuOpen(false);
                  }
                }}
              >
                <span>{item.name}</span>
                {item.protected && <Lock size={16} className="text-gray-400" />}
              </a>
            ))}

            {/* Mobile Login/Signup Button */}
            <button
              onClick={() => {
                toggleLoginStatus();
                setIsMenuOpen(false);
              }}
              className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isLoggedIn
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoggedIn ? 'Logout' : 'Login/Signup'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
