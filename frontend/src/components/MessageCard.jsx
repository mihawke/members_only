import axios from '../config/axiosConfig';
import { jwtDecode } from 'jwt-decode';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';

const MessageCard = ({ title, body, username, time }) => {

    const { user } = useContext(UserContext)

    return (
        <div className="flex  flex-col w-full bg-white p-4 rounded-lg shadow-md max-w-lg mx-auto space-y-4">
            <p className="text-xl font-semibold text-gray-900">{title}</p>
            <p className="text-gray-700 text-base">{body}</p>
            {user.membershipStatus ? <p className="text-sm text-gray-500">{username}</p> : ''}
            {user.membershipStatus ? <p className="text-xs text-gray-400">{time}</p> : ''}
        </div>

    )
}

export default MessageCard