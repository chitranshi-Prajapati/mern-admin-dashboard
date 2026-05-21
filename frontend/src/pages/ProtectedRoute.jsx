import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const ProtectedRoute = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {

    const checkAuth = async () => {

      try {

        await axios.get(
          'http://localhost:3000/api/auth/check-auth',
          {
            withCredentials: true
          }
        )

        setIsAuthenticated(true)

      } catch (error) {

        setIsAuthenticated(false)

      }

    }

    checkAuth()

  }, [])

  if (isAuthenticated === null) {
    return <h1>Loading...</h1>
  }

  return isAuthenticated
    ? children
    : <Navigate to="/login" />

}

export default ProtectedRoute