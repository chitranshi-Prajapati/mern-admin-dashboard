import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  })

  const navigate = useNavigate()

 const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const response = await axios.post(
      'http://localhost:3000/api/auth/login',
      {
        username: formData.identifier,
        password: formData.password
      },
      {
        withCredentials: true
      }
    )

    console.log(response.data)
    navigate('/dashboard')

  } catch (error) {

    console.log(error)

  }

}

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <form
  onSubmit={handleSubmit}
  className="w-full max-w-md bg-white rounded-3xl shadow-lg p-10"
>

        <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome back</h1>

        <p className="text-gray-500 mb-8">Welcome back! Please enter your details.</p>

        <label className="block text-sm font-medium text-gray-700 mb-2">Email or username</label>

        <input type="text" placeholder="Enter your email or username"className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 outline-none"
         value={formData.identifier}
  onChange={(e) =>
    setFormData({
      ...formData,
      identifier: e.target.value
    })
  }
/>

        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>

        <input type="password" placeholder="Password" className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 outline-none" 
        value={formData.password}
          onChange={(e) =>
          setFormData({
           ...formData,
           password: e.target.value
    })
  }
/>

        <button type='submit' className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold mb-4">
          Login
        </button>

        <p className="text-center">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-500 ml-1"
          >
            Register
          </Link>

        </p>

      </form>

    </div>

  )

}

export default Login