import { Link } from 'react-router-dom'
import React from 'react'

const Header = () => {
    return (
        <div className='bg-gray-300'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-5'>
                <Link to='/'><h1 className='font-bold'>Auth App</h1></Link>
                <ul className='flex gap-9'>
                    <Link to='/'><h1 className='font-bold'>Home</h1></Link>
                    <Link to='/about'><h1 className='font-bold'>About</h1></Link>
                    <Link to='/sign-in'><h1 className='font-bold'>Sign In</h1></Link>
                </ul>
            </div>
        </div>
    )
}

export default Header
