import React from 'react'
import "../css/profile.css";
import { UserContext } from '../Hooks/UserContext';
import { useContext } from 'react';
import {BsFillTelephoneFill} from 'react-icons/bs';
import {GrMail} from 'react-icons/gr';
import {FaUserAlt} from 'react-icons/fa';

function AdminProfileComponent() {
  const {user} = useContext(UserContext);
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
            <p><FaUserAlt/> <i>{user.userRole}</i></p>
            <p><GrMail/> <i>{user.email}</i></p>            
            <p><i><BsFillTelephoneFill/> +381637771409</i></p>            
        </div>
      </div>
      </div>
    </div>
  )
}

export default AdminProfileComponent