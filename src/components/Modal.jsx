import { AlertTriangle } from 'lucide-react'
import React from 'react'

export default function Modal(
    {
        taskToDelete,
        setShowDeleteModal,
        confirmDelete
    }) {
    //console.log(taskToDelete)
  return (
            <div className="fixed inset-0 bg-transparent backdrop-blur-lg flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-200">
                    <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">
                            Delete Task
                        </h3>
                    </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">
                        Are you sure you want to delete "
                        <span className="font-medium">
                            {taskToDelete?.title}
                        </span>"?
                    </p>
                    <div className="flex space-x-3">
                    <button
                        onClick={() => setShowDeleteModal(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirmDelete}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                    >
                        Delete Task
                    </button>
                    </div>
                </div>
            </div>
  )
}
