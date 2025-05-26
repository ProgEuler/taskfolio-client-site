import { CheckCircle } from 'lucide-react'
import React from 'react'

export default function Success({ message }) {

  return (
    <div className="fixed top-18 right-6 z-50 bg-white border-l-4 border-green-500 rounded-lg shadow-xl p-6 max-w-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">{message}</h3>
              {/* <p className="mt-1 text-xs text-gray-600">Your task has been added and is now live on the platform.</p> */}
            </div>
          </div>
        </div>
  )
}
