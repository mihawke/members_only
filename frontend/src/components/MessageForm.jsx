import { useNavigate } from 'react-router-dom'
import axios from '../config/axiosConfig'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../App'

const MessageForm = ({ isOpen, onClose }) => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const { user } = useContext(UserContext)

    const dialogRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5050/create-post', { title, body, user: user._id, time: Date.now() })
            if (response.status == 200) {
                console.log('post created successfully!')
                useNavigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal(); // This will open the dialog
        } else {
            dialogRef.current?.close(); // This will close the dialog
        }
    }, [isOpen]);

    return (
        <dialog ref={dialogRef} className='rounded-lg absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center p-20'>
                <div className='flex flex-col min-w-[320px] w-fit'>
                    <label
                        className='w-fit text-cgray-700 text-sm leading-5 font-medium '
                        htmlFor='email'>Title:</label>
                    <input
                        type='text'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id='title'
                        className='px-3.5 py-2 items-center justify-between my-1.5 rounded-lg text-base leading-6 placeholder:text-cgray-500 border-2 border-gray-600 outline-none'
                    />
                    <p className='text-red-600'>text error</p>
                </div>
                <div className='flex flex-col min-w-[320px] w-fit'>
                    <label
                        className='w-fit text-cgray-700 text-sm leading-5 font-medium '
                        htmlFor='email'>Message:</label>
                    <textarea
                        name='body'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        id='body'
                        className='px-3.5 py-2 items-center justify-between my-1.5 rounded-lg text-base leading-6 placeholder:text-cgray-500 border-2 border-gray-600 outline-none'
                    />
                    <p className='text-red-600'>message error</p>
                </div>
                <div className="flex flex-row justify-start items-center">
                    <button
                        className='flex flex-row w-fit h-fit px-4 py-2.5 rounded-lg text-sm leading-5 gap-2 outline-none justify-center items-center bg-green-600'
                        type='submit'>
                        Post
                    </button>
                    <button
                        className='px-4 py-2.5 m-4 text-white font-normal rounded-lg text-sm bg-red-600'
                        type='reset'
                        onClick={onClose}>
                        Close
                    </button>
                </div>
            </form>
        </dialog>
    )
}

export default MessageForm