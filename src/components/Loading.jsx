import React from 'react'

export default function Loading() {
    return (
      <div className="h-full bg-gray-50">
        {/* Loading State */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading ...</p>
          </div>
        </div>
      </div>
    );
}
