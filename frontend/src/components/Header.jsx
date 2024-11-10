import axios from '../config/axiosConfig';
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';


const Header = () => {
    const { user, setUser } = useContext(UserContext)

    function logout() {
        // Remove the token from client storage (localStorage, sessionStorage, etc.)
        localStorage.removeItem('authToken'); // or sessionStorage.removeItem('token');
        setUser('')
        delete axios.defaults.headers.common["Authorization"];
    }

    return (
        <header
            className='flex flex-row justify-between items-center p-4'
        >
            <Link to={'/'}> <h2 className='text-3xl font-bold text-blue-300'>Club</h2></Link>
            {user.name ?
                <nav className='flex flex-row gap-2' >
                    <p className="text-white text-3xl font-extrabold">
                        Welcome <span className="text-yellow-400">{user.name}!</span>
                    </p>
                    <Link
                        className='border-2 border-gray-700 px-3 py-1 rounded-md'
                        onClick={logout}
                        to={'/login'}
                    >logout</Link>
                </nav>
                :
                <nav className='flex flex-row gap-2' >
                    <Link
                        className='border-2 border-gray-700 px-3 py-1 rounded-md'
                        to={'/login'}
                    >login</Link>
                    <Link
                        className='border-2 border-gray-700 px-3 py-1 rounded-md'
                        to={'/signup'}>signup</Link>
                </nav>
            }
        </header >
    )
}

export default Header