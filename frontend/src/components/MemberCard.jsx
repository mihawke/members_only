import React from 'react'

const MemberCard = ({ name, email, age, status, gender }) => {
    return (
        <div className='flex flex-col'>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Gender: {gender}</p>
            <p>Age: {age}</p>
            <p>Membership Status: {status}</p>
        </div>
    )
}

export default MemberCard