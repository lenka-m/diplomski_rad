import React from 'react'
import { useContext } from 'react';
import AdminProfileComponent from '../Components/AdminProfileComponent';
import CreateActivity from '../Components/CreateActivity';
import { UserContext } from '../Hooks/UserContext';


function UserPage() {
    const {user} = useContext(UserContext);
  return (
    <div className='ProfilePage'>
      
        <AdminProfileComponent/>
        <CreateActivity user = {user}/>
        <p>kk</p>
    </div>
  )
}

export default UserPage