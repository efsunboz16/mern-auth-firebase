import { Link } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {

    const { currentUser } = useSelector((state) => state.user)

    return (
        <div className='bg-gray-300'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-5'>
                <Link to='/'><h1 className='font-bold'>Auth App</h1></Link>
                <ul className='flex gap-9'>
                    <Link to='/'><h1 className='font-bold'>Home</h1></Link>
                    <Link to='/about'><h1 className='font-bold'>About</h1></Link>


                    <Link to='/profile'>
                        {currentUser ? (<img src={currentUser.profilePicture} className='h-9 w-9 rounded-full object-cover' />) : (
                            <h1 className='font-bold'>Sign In</h1>
                        )}
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Header
