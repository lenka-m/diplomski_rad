import React, {useState} from 'react'
import "../css/profile.css";
import {BsFillTelephoneFill} from 'react-icons/bs';
import {GrMail} from 'react-icons/gr';
import {FaUserAlt} from 'react-icons/fa';
import { updateProfilePic } from '../Actions/userActions';

function ProfileComponent({loggedUser}) {
  const user = loggedUser;
  const [formData, setFormData] = useState({userId: loggedUser.id});
  
  
  const handleFileChange = (event) => {
    setFormData({...formData, profilePic: event.target.files[0]})
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData)
    updateProfilePic(formData)
  };

  return (
    <div className='component'>
      <div className='boxContainter'>
        <div className='profile'>
          <img className="profilePic" src={require("../img/profilepic.png")} alt="Profile"></img>
          <form onSubmit={handleSubmit}>
            <label htmlFor="profile-pic-upload">Upload Profile Picture:</label>
            <input type="file" id="profile-pic-upload" onChange={handleFileChange} />
            <button type="submit">Submit</button>
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
