import React from 'react'
import { useContext } from 'react';
import ProfileComponent from '../Components/ProfileComponent';
import CreateActivity from '../Components/CreateActivity';
import { UserContext } from '../Hooks/UserContext';


function UserPage() {
    const {user} = useContext(UserContext);
  return (
    <div className='ProfilePage'>
        <ProfileComponent/>
        <CreateActivity user = {user}/>
    </div>
  )
}

export default UserPage