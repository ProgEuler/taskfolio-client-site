import React from 'react';
import { Link, useNavigate } from 'react-router';
import { Home, ArrowLeft, Search } from 'lucide-react';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative">
            {/* Large 404 Text */}
            <h1 className="text-9xl font-bold text-gray-200 select-none">
              404
            </h1>

            {/* Floating Elements */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="animate-bounce">
                <Search className="w-16 h-16 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm text-gray-500">
            Don't worry, it happens to the best of us!
          </p>
        </div>

        {/* Illustration/Icon */}
        <div className="mb-8">
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
            <div className="text-6xl">🔍</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          {/* Go Home Button */}
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>

          {/* Go Back Button */}
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Still can't find what you're looking for?
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center text-sm">
            <Link
              to="/contact"
              className="text-blue-600 hover:text-blue-500 transition duration-200"
            >
              Contact Support
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <Link
              to="/help"
              className="text-blue-600 hover:text-blue-500 transition duration-200"
            >
              Help Center
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <Link
              to="/sitemap"
              className="text-blue-600 hover:text-blue-500 transition duration-200"
            >
              Site Map
            </Link>
          </div>
        </div>

        {/* Fun Error Code */}
        <div className="mt-8">
          <p className="text-xs text-gray-400">
            Error Code: PAGE_NOT_FOUND_404
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
