import React from 'react'
import ProfileComponent from '../Components/ProfileComponent';
import AllActivitiesUser from '../Components/All/AllActivitiesUser';


function UserPage({loggedUser}) {
  return (
    <div className='homepage'>
        <ProfileComponent loggedUser = {loggedUser}/>
        
        <AllActivitiesUser loggedUser={loggedUser}/>
    </div>
  )
}

export default UserPage