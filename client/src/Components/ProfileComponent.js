import React from 'react'
import "../css/profile.css";
import {BsFillTelephoneFill} from 'react-icons/bs';
import {GrMail} from 'react-icons/gr';
import {FaUserAlt} from 'react-icons/fa';

function ProfileComponent({loggedUser}) {
  const user = loggedUser;

  return (
    <div className='component'>
      <div className='boxContainter'>
      <div className='profile'>
        <img className = "profilePic" src = {require ("../img/profilepic.png")}></img>
        <div className='profileInfo'>
            <div className='profileHeader'>
              <h1>{user.firstName} {user.lastName}</h1>
              <h2>Koordinator za informacione sisteme</h2>            
            </div>
            <p>{user.totalPoints}</p>
            <p><FaUserAlt/> <i>{user.userRole} {user.totalPoints}</i></p>
            <p><GrMail/> <i>{user.email}</i></p>            
            <p><i><BsFillTelephoneFill/> +381637771409</i></p>            
        </div>
      </div>
      </div>
    </div>
  )
}

export default ProfileComponent