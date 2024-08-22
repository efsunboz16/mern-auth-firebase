import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userslice.js';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';


const Signin = () => {

    const [formData, setFromData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFromData({ ...formData, [e.target.id]: e.target.value });
    }
    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            // setLoading(true);
            // setError(false);
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            // setLoading(false);
            if (data.success === false) {
                // setError(true);
                dispatch(signInFailure(data));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error));
            // setLoading(false);
            // setError(true);
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="email" placeholder='Email'
                    id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
                <input type="password" placeholder='Password'
                    id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Loading...' : 'Sign in'}
                </button>
                <OAuth className='bg-red-600 w-full text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' />
            </form>
            <div className='flex justify-between'>
                <p>Don't have an account?</p>
                <Link to='/sign-up'>
                    <span className='text-blue-500'>
                        Sign Up
                    </span>
                </Link>
            </div>
            <p className='text-red-600'>{error ? error.message || 'Something went wrong' : ''}</p>
        </div>
    )
}

export default Signin

