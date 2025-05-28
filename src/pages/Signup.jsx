import React, { use, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../provider/AuthProvider';
import Success from '../components/Success';
import Loading from '../components/Loading';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import { getAuth, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';
import Error from '../components/Error';
import { Link } from 'react-router';

const Signup = () => {

  const { createUser, googleSignIn } = use(AuthContext)
  const auth = getAuth(app)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)
  const [loading, setLoading] = useState(false)

  const userInfo = {
    name,
    email,
    avatar : photoURL || 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740',
    rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
    memberSince: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    skills: [],
    tasksPosted: Math.floor(Math.random() * 50), // Random number of tasks posted
    completedProjects: Math.floor(Math.random() * 100), // Random number of completed projects
    bio: ''
  }
  const validatePassword = (pwd) => {
    if (pwd.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]/.test(pwd)) {
      return 'Password must contain at least one lowercase letter.';
    }
    return ''; // No error
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setPasswordError('');

    const pwdValidationMessage = validatePassword(password);
    if (pwdValidationMessage) {
      setPasswordError(pwdValidationMessage);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    //console.log('Registration attempt with:', { name, email, photoURL, password });

    setLoading(true)
    createUser(email, confirmPassword)
        .then((user) =>{
            updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoURL || 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740'
            })

            //console.log(user)

            axios.post('https://taskfolio-server-site.vercel.app/api/users', userInfo)
                .then(response => {
                    //console.log("User created successfully:", response.data);
                    setName('');
                    setEmail('');
                    setPhotoURL('');
                    setPassword('');
                    setConfirmPassword('');
                    setPasswordError('');
                    setGeneralError('');
                })
                .catch(error => {
                    console.error("Error creating user:", error);
                    setError('Failed to create user. Please try again.');
                });

            setShowSuccess(true)
            //console.log("user created successfully")
            setTimeout(() => setShowSuccess(false), 2000);
        })
        .catch((error) => {
            setError(error.message);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
        })
        .finally(() =>{
            setLoading(false)
        })
  }

  const handleGoogleLogin = () => {
    //console.log('Google Login initiated');
    googleSignIn()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans dark:bg-[#292E35]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200 dark:bg-[#292E35]">
        { showError && <Error message={error} /> }
        { loading && <Loading /> }
        {
            showSuccess &&
            <Success message={`User "${name}" created successfully`}/>
        }
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4 dark:text-white">Create Account</h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
              Photo URL (Optional)
            </label>
            <input
              type="url"
              id="photoURL"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="https://example.com/your-profile.jpg"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          {/* Password field with eye icon */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out pr-10" // Added pr-10 for icon spacing
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(validatePassword(e.target.value)); // Validate as user types
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
          </div>

          {/* Confirm Password field with eye icon */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out pr-10" // Added pr-10 for icon spacing
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {password !== confirmPassword && confirmPassword && (
              <p className="mt-1 text-sm text-red-600">Passwords do not match.</p>
            )}
          </div>

          {showError && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-2 text-center">
          <button
            onClick={handleGoogleLogin}
            className="mt-2 w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            <FaGoogle className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-white">
            Already have an account?{' '}
            <Link to={'/login'} className="font-medium text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
