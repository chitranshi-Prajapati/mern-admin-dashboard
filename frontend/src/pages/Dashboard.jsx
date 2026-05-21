import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {

  const navigate = useNavigate()

  const [users, setUsers] = useState([])

  const adminUsers = users.filter(
    (user) => user.role === 'admin'
  )

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/users`,
          {
            withCredentials: true
          }
        )

        setUsers(response.data.users)

      } catch (error) {

        console.log(error)

      }

    }

    fetchUsers()

  }, [])

  const handleLogout = async () => {

    try {

      await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {
          withCredentials: true
        }
      )

      navigate('/login')

    } catch (error) {

      console.log(error)

    }

  }

  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/auth/users/${id}`,
        {
          withCredentials: true
        }
      )

      setUsers(
        users.filter((user) => user._id !== id)
      )

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div className='min-h-screen flex bg-gray-100'>

      <div className='w-64 bg-black text-white p-6'>

        <h1 className='text-3xl font-bold mb-10'>
          Admin Panel
        </h1>

        <ul className='space-y-6'>

          <li className='cursor-pointer hover:text-gray-300'>
            Dashboard
          </li>

          <li className='cursor-pointer hover:text-gray-300'>
            Users
          </li>

          <li className='cursor-pointer hover:text-gray-300'>
            Analytics
          </li>

          <li className='cursor-pointer hover:text-gray-300'>
            Settings
          </li>

          <li
            onClick={handleLogout}
            className='cursor-pointer hover:text-red-400'
          >
            Logout
          </li>

        </ul>

      </div>

      <div className='flex-1 p-6'>

        <div className='flex items-center justify-between mb-6'>

          <h1 className='text-4xl font-bold'>
            Admin Dashboard
          </h1>

        </div>

        <div className='grid grid-cols-3 gap-6'>

          <div className='bg-white p-6 rounded-xl shadow-md'>

            <h2 className='text-xl font-semibold'>
              Total Users
            </h2>

            <p className='text-3xl font-bold mt-3'>
              {users.length}
            </p>

          </div>

          <div className='bg-white p-6 rounded-xl shadow-md'>

            <h2 className='text-xl font-semibold'>
              Admins
            </h2>

            <p className='text-3xl font-bold mt-3'>
              {adminUsers.length}
            </p>

          </div>

          <div className='bg-white p-6 rounded-xl shadow-md'>

            <h2 className='text-xl font-semibold'>
              Managers
            </h2>

            <p className='text-3xl font-bold mt-3'>
              {
                users.filter(
                  (user) => user.role === 'manager'
                ).length
              }
            </p>

          </div>

        </div>

        <div className='mt-10 bg-white p-6 rounded-xl shadow-md'>

          <h2 className='text-2xl font-bold mb-4'>
            All Users
          </h2>

          <table className='w-full'>

            <thead>

              <tr className='border-b'>

                <th className='text-left py-3'>
                  Username
                </th>

                <th className='text-left py-3'>
                  Email
                </th>

                <th className='text-left py-3'>
                  Role
                </th>

                <th className='text-left py-3'>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user._id}
                  className='border-b'
                >

                  <td className='py-3'>
                    {user.username}
                  </td>

                  <td className='py-3'>
                    {user.email}
                  </td>

                  <td className='py-3 capitalize'>
                    {user.role}
                  </td>

                  <td className='py-3'>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className='bg-red-500 text-white px-4 py-1 rounded-lg'
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}

export default Dashboard