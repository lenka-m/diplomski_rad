import React from 'react'
import ProfileComponent from '../Components/ProfileComponent';
import NewActivity from '../Components/NewActivity';


function UserPage({loggedUser}) {
  return (
    <div className='ProfilePage'>
        <ProfileComponent loggedUser = {loggedUser}/>
        <NewActivity loggedUser = {loggedUser}/>
    </div>
  )
}

export default UserPage