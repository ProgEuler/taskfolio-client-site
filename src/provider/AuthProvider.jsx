import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebase.config'
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth'

export const AuthContext = createContext()
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({
        name: null,
        email: null,
        photoURL: null
    })

    const [loading, setLoading] = useState(true)
    // console.log(user)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        return signInWithPopup(auth, provider)
    }
    const logOut = () => {
        return signOut(auth)
    }
    const updateUser = (updatedData) =>{
        return updateProfile(auth.currentUser, updatedData)
    }
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [user])
    const AuthData = {
        user,
        setUser,
        createUser,
        logOut,
        googleSignIn,
        logIn,
        updateUser,
        loading,
        setLoading,
        resetPassword
    }
  return (
    <AuthContext value={AuthData}>
      {children}
    </AuthContext>
  )
}
