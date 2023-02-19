import React from 'react'
import ProfileComponent from '../Components/ProfileComponent';
import AllActivitiesUser from '../Components/AllActivitiesUser';


function UserPage({loggedUser}) {
  return (
    <div className='ProfilePage'>
        <ProfileComponent loggedUser = {loggedUser}/>
        
        <AllActivitiesUser loggedUser={loggedUser}/>
    </div>
  )
}

export default UserPage