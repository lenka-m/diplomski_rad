import React from 'react'
import ProfileComponent from '../Components/ProfileComponent';
import NewActivity from '../Components/NewActivity';


function UserPage({loggedUser}) {
    const user = loggedUser;
  return (
    <div className='ProfilePage'>
        <ProfileComponent/>
        <NewActivity user = {user}/>
    </div>
  )
}

export default UserPage