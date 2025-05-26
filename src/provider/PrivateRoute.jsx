import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate, useLocation } from 'react-router'
import { LoaderCircle } from 'lucide-react'

export default function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if(loading){
        return <div
                className='flex justify-center items-center h-screen'>
                    <LoaderCircle className='animate-spin h-10 w-10 text-blue-500' viewBox="3 3 18 18" />
                    <div className='text-white'>Loading...</div>
                </div>
    }
    if(!user) {
        return <Navigate state={location.pathname} to='/login' />
    }

    return children
}
