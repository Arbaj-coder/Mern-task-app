import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
import './log-sign.css'
import { ToastContainer } from 'react-toastify';
function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
        return handleError('name, email and password are required');
    }
    try {
        setLoading(true); // start spinner

        const url = `https://mern-task-app-black.vercel.app/auth/signup`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupInfo)
        });
        const result = await response.json();
        const { success, message, error } = result;

        if (success) {
            handleSuccess(message);
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } else if (error) {
            const details = error?.details[0].message;
            handleError(details);
        } else {
            handleError(message);
        }
    } catch (err) {
        handleError("Signup failed. Try again.");
    } finally {
        setLoading(false); // stop spinner
    }
};

    return (
        <div className='center1'>
        <div className='container1'>
            <h1>Signup</h1>
            {loading && <div className="spinner"></div>}
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                        />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                        />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                        />
                </div>
                <button className='othbtn1' type='submit'>Signup</button>
                <span>Already have an account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>
                        
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Signup
