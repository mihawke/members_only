import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import axios from '../config/axiosConfig';
import { UserContext } from '../App';

const LogIn = () => {

    const { user, token, fetchUser } = useContext(UserContext);

    // states for form inputs
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: '',
        customError: ''
    });

    let navigate = useNavigate();

    //function to handle form submission
    const handleSubmit = async (e) => {
        //prevent default form submission
        e.preventDefault();

        //try-catch for synchronous operation.
        try {
            //use axios.post to post data to a specific url
            const response = await axios.post(`http://localhost:5050/login`, { email, password })

            //if response is success
            if (response.status == 200) {
                console.log('Logged in successfully!')
                setErrors({
                    emailError: '',
                    passwordError: '',
                    customError: ''
                })
                localStorage.setItem('authToken', response.data.token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
                fetchUser();
                return navigate('/')
            }
        } catch (error) {
            if (error.response.data.message) {
                setErrors({ ...errors, customError: error.response.data.message })
            }
            else if (error.response.data.errors[0].path == 'email') {
                setErrors({ ...errors, emailError: error.response.data.errors[0].msg })
            }
            else if (error.response.data.errors[0].path == 'password') {
                setErrors({ ...errors, passwordError: error.response.data.errors[0].msg })

            }
            else {
                setErrors({ ...errors, customError: error.response.data.errors[0].msg })
            }
        }
    }
    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-2'>
                <div
                    className='flex flex-col min-w-[320px] w-fit'
                >
                    <label
                        className='w-fit text-cgray-700 text-sm leading-5 font-medium '
                        htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id='email'
                        className='px-3.5 py-2 items-center justify-between my-1.5 rounded-lg text-base leading-6 placeholder:text-cgray-500 border-2 border-gray-600 outline-none'
                    />
                    <p className='text-red-600'>{errors.emailError}</p>

                </div>
                <div
                    className='flex flex-col min-w-[320px] w-fit'
                >
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='px-3.5 py-2 items-center justify-between my-1.5 rounded-lg text-base leading-6 placeholder:text-cgray-500 border-2 border-gray-600 outline-none'
                        id='password'
                    />
                    <p className='text-red-600'>{errors.passwordError}</p>
                </div>
                <button
                    className='flex flex-row w-fit h-fit px-4 py-2.5 rounded-lg text-sm leading-5 gap-2 outline-none justify-center items-center bg-green-600'
                    type='submit'>LogIn</button>
                <p className='text-red-600'>{errors.customError}</p>
            </form>
        </div>
    )
}

export default LogIn