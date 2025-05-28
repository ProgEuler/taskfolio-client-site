import React, { use, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../components/Loading';
import { Link, useNavigate } from 'react-router';
import Error from '../components/Error';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {

  const { logIn } = use(AuthContext)
  const navigator = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [showError, setShowError] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true)
    logIn(email, password)
        .then((user) =>{
            console.log('Login attempt with:', { email, password, rememberMe });
            navigator('/')
            console.log(user);

        })
        .catch(err => {
            console.log(err)
            setShowError(true)
            setError(err.message)
            setTimeout(() => {
                setShowError(false)
            }, 3000)
        })
        .finally(() =>{
            setLoading(false)
        })

  };

  return (
    <div className="md:h-[700px] py-10 flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="bg-white p-8   shadow-md w-full max-w-md border border-gray-200">
        { showError && <Error message={error} /> }
        { loading && <Loading /> }
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome Back!</h2>
        <p className="text-center text-gray-600 mb-8">Sign in to your Taskfolio account</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className='relative'>
                <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to={'/signup'} className="font-medium text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
