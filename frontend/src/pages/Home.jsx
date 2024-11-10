import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header';
import MessageForm from '../components/MessageForm';
import MessageCard from '../components/MessageCard';
import axios from '../config/axiosConfig';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '../App';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const { user, token, fetchUser } = useContext(UserContext);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5050/get-posts')
      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, [])

  return (
    <div className="relative">
      <Header></Header>
      <div className="p-4">
        {token ? <p className='text-xl font-bold'>Membership Status:
          {user.membershipStatus ? <span className='text-green-500'>Active</span>
            : <span className='text-red-500 ml-5'>Inactive <button
              className='w-fit h-fit px-4 py-2.5 text-white font-normal rounded-lg text-sm leading-5 gap-2 outline-none justify-center items-center bg-green-600'
            >Get Membership</button></span>}</p>
          : ''}
      </div>
      {user.membershipStatus ? 
      <button 
      onClick={openDialog}
      className='px-4 py-2.5 m-4 text-white font-normal rounded-lg text-sm bg-green-600'>Create Post</button> : ''}
      {user.membershipStatus ? <MessageForm  isOpen={isDialogOpen} onClose={closeDialog} /> : ''}
      <div className='grid grid-cols-4 gap-2 p-4'>
        {posts.map((post, index) => (
          <MessageCard
            key={index}  // Add a key prop to uniquely identify each item in the list
            title={post.title}
            body={post.body}
            username={post.user.name}
            time={post.time}
          />
        ))}
      </div>
    </div>
  )
}

export default Home