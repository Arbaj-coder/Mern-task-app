import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
import './log-sign.css'
import { ToastContainer } from 'react-toastify';
function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

   const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
        return handleError('email and password are required');
    }

    try {
        setLoading(true); // START LOADING
        

        const url = `https://mern-task-app-black.vercel.app/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });

        const result = await response.json();
        const { success, message, jwtToken, name, error } = result;

        if (success) {
            handleSuccess(message);
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('loggedInUser', name);
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } else if (error) {
            const details = error?.details[0].message;
            handleError(details);
        } else {
            handleError(message);
        }
    } catch (err) {
        handleError("Login failed. Try again.");
    } finally {
        setLoading(false); // STOP LOADING
    }
};

    
    return (
        <div className='center1'>
            
        <div className='container1'>
            <h1>Login</h1>
            {loading && <div className="spinner"></div>}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                        />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                        />
                </div>
                <button className='othbtn1' type='submit'>Login</button>
                <span>Does't have an account ?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>

        </div>
        <ToastContainer/>
        </div>
    )
}

export default Login
