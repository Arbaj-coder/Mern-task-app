import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import TaskManager from './TaskManager';
import { ToastContainer } from 'react-toastify';


function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Loggedout');
    setTimeout(() => {
      navigate('/login');
    }, 1000)
  }
  return (
    <div>
    <div className='navbar1'>
      <div className='m-2'><h3>iTask</h3></div>
      <div className='item1'>   
      <h3>Welcome {loggedInUser}</h3>
      <button className='navbtn1' onClick={handleLogout}>Logout</button>
      </div>
    </div>
    <TaskManager/>
    <ToastContainer/>
    </div>
  )
}

export default Home