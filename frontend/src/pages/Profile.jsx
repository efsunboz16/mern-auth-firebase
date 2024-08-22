import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


const Profile = () => {

    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className='p-3 max-w-lg mx-auto flex flex-col items-center'>
            <h1 className='text-3xl font-semibold text-center my-7'>PROFILE</h1>
            <form action="" className='flex flex-col w-5/6 gap-7'>
                <img src={currentUser.profilePicture} alt="profile"
                    className='self-center rounded-full cursor-pointer object-cover' />

                <input type="text"
                    defaultValue={currentUser.username} id='username' placeholder='Username' className='bg-slate-100 p-3 rounded-lg' />
                <input type="email"
                    defaultValue={currentUser.email}
                    id='email' placeholder='Email' className='bg-slate-100 p-3 rounded-lg' />
                <input type="password" id='password' placeholder='Password' className='bg-slate-100 p-3 rounded-lg' />

                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    Update
                </button>
            </form>
            <div className='w-full flex flex-row justify-between pl-10 pr-10 mt-3'>
                <span>Delete Account</span>
                <span>Signout</span>
            </div>
        </div>
    )
}

export default Profile
