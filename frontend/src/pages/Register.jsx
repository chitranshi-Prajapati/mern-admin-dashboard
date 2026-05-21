import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
  username: '',
  email: '',
  password: '',
  role: ''
})

const handleSubmit = async (e) => {

  e.preventDefault()

  try {

    const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/auth/register`,
  formData,
  {
    withCredentials: true
  }
)

    console.log(response.data)

  } catch (error) {

    console.log(error)

  }

}
  return (

    <div className='min-h-screen flex items-center justify-center bg-gray-100'>

      <div className='bg-white p-8 rounded-xl shadow-md '>

        <h1 className='text-3xl font-bold text-center mb-6'>
          Create Account
        </h1>

        <form  onSubmit={handleSubmit} className='flex flex-col gap-4'>

          <input type="text" placeholder="Enter Username" className='border p-3 rounded-lg outline-none'
          value={formData.username}
          onChange={(e) =>
          setFormData({
          ...formData,
          username: e.target.value
    })
  }
/>

         <input type="email" placeholder="Enter Email" className='border p-3 rounded-lg outline-none'
       value={formData.email}
       onChange={(e) =>
       setFormData({
      ...formData,
      email: e.target.value
    })
  }
/>

          <input
  type="password"
  placeholder="Enter Password"
  className='border p-3 rounded-lg outline-none'
  value={formData.password}
  onChange={(e) =>
    setFormData({
      ...formData,
      password: e.target.value
    })
  }
/>

          <select
  className='border p-3 rounded-lg outline-none'
  value={formData.role}
  onChange={(e) =>
    setFormData({
      ...formData,
      role: e.target.value
    })
  }
>

  <option value="">Select Role</option>

  <option value="user">User</option>

  <option value="admin">Admin</option>

  <option value="manager">Manager</option>

</select>

          <button type="submit" className='bg-black text-white py-3 rounded-lg'>Register
          </button>
          <p className='text-center'>

  Already have an account?

  <Link to="/login" className='text-blue-500 ml-1'>
    Login
  </Link>

</p>

        </form>

      </div>

    </div>

  )
}

export default Register