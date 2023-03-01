import React, {useState} from 'react'
import "../css/profile.css";
import {BsFillTelephoneFill} from 'react-icons/bs';
import {GrMail} from 'react-icons/gr';
import {FaUserAlt} from 'react-icons/fa';

function ProfileComponent({loggedUser}) {
  const user = loggedUser;
  const [selectedFile, setSelectedFile] = useState([]);

  function handleFileInputChange(event){
    setSelectedFile(event.target.files[0]);
  }

  function handleSubmit(event){
    event.preventDefault()
  }

  return (
    <div className='component'>
      <div className='boxContainter'>
      <div className='profile'>
        <img className = "profilePic" src = {require ("../img/profilepic.png")}></img>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileInputChange} />
          <button type="submit">Upload</button>
        </form>
        <div className='profileInfo'>
            
            <div className='profileHeader'>
              <h1>{user.firstName} {user.lastName}</h1>
              <h2>Koordinator za informacione sisteme</h2>            
            </div>
             <p>Ukupan broj poena {user.totalPoints}</p>   
            <p><FaUserAlt/> <i>{user.userRole}</i></p>
            <p><GrMail/> <i>{user.email}</i></p>            
            <p><i><BsFillTelephoneFill/> +381637771409</i></p>            
        </div>
      </div>
      </div>
    </div>
  )
}

export default ProfileComponent