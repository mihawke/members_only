import React, { useState } from 'react'
import axios from '../config/axiosConfig'; 
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    customError: ''
  })

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      name: '',
      email: '',
      age: '',
      password: '',
      confirmPassword: '',
      customError: ''
    })
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "Password doesn't match" }));
      return;
    }
    try {
      const response = await axios.post('http://localhost:5050/signup', { name, email, age, password, confirmPassword })
      if (response.status == 201) {
        console.log('User created successfully')
        navigate('/login')
      }
    } catch (error) {
      if(error.response.data.message){
        setErrors((prevErrors) => ({
          ...prevErrors,
          customError: error.response?.data?.message || 'Something went wrong'
        }));
    }
      else if (error.response?.data?.errors) {
        const errorMap = {}
        error.response.data.errors.forEach((err) => {
          errorMap[err.path] = err.msg;
        })
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: errorMap.name || '',
          email: errorMap.email || '',
          age: errorMap.age || '',
          password: errorMap.password || '',
          confirmPassword: errorMap.confirmPassword || '',
          customError: errorMap.customError || ''
        }));
      }
      else {
        // General error message if no field-specific errors
        setErrors((prevErrors) => ({
          ...prevErrors,
          customError: error.response?.data?.message || 'Something went wrong'
        }));
      }
    }
  };

  return (
    <div>
      <Header/>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-2'>
        <div
          className='flex flex-col min-w-[320px] w-fit'
        >
          <label
            className='w-fit text-cgray-700 text-sm leading-5 font-medium '
            htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            id='name'
            className='px-3.5 py-2 items-center justify-between my-1.5 rounded-lg text-base leading-6 placeholder:text-cgray-500 border-2 border-gray-600 outline-none'
          />
          <p className='text-red-600'>{errors.name}</p>
        </div>
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
          <p className='text-red-600'>{errors.email}</p>
        </div>
        <div
          className='flex flex-col min-w-[320px] w-fit'
        >
          <label
            className='w-fit text-cgray-700 text-sm leading-5 font-medium '
            htmlFor='age'>Age:</label>
          <input
            type='number'
            name='age'
            id='age'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            max={90}
            className='px-3.5 py-2 items-center justify-between my-1.5 rounded-lg text-base leading-6 placeholder:text-cgray-500 border-2 border-gray-600 outline-none'
            min={18}
          />
          <p className='text-red-600'>{errors.age}</p>

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
          <p className='text-red-600'>{errors.password}</p>

        </div>
        <div
          className='flex flex-col min-w-[320px] w-fit'
        >
          <label
            className='w-fit text-cgray-700 text-sm leading-5 font-medium '
            htmlFor='confirm-password'>Confirm Password:</label>
          <input
            type='password'
            name='confirm-password'
            className='px-3.5 py-2 items-center justify-between my-1.5 rounded-lg text-base leading-6 placeholder:text-cgray-500 border-2 border-gray-600 outline-none'
            id='confirm-password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p className='text-red-600'>{errors.confirmPassword}</p>
        </div>
        <button
          className='flex flex-row w-fit h-fit px-4 py-2.5 rounded-lg text-sm leading-5 gap-2 outline-none justify-center items-center bg-green-600'
          type='submit'>SignUp</button>
        <p className='text-red-600'>{errors.customError}</p>
      </form>
    </div>
  )
}

export default SignUp