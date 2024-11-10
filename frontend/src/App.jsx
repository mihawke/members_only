import React, { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import { jwtDecode } from 'jwt-decode';
import axios from './config/axiosConfig';

export const UserContext = createContext();

const fetchUser = async (token, setUser) => {
  if (token) {
    const decoded = jwtDecode(token);
    try {
      const response = await axios.get(`http://localhost:5050/user/${decoded.email}`);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }
};

function App() {

  const [user, setUser] = useState({})
  const token = localStorage.getItem('authToken');
  useEffect(() => {
    fetchUser(token, setUser);
  }, [])

  return (
    <UserContext.Provider value={{ user, token, fetchUser, setUser }}>
      <BrowserRouter>
        <div className='flex flex-col w-full'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
