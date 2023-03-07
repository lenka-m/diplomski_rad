import React, {useState} from 'react'
import "../css/profile.css";
import {BsFillTelephoneFill} from 'react-icons/bs';
import {GrMail} from 'react-icons/gr';
import {FaUserAlt} from 'react-icons/fa';
import { updateProfilePic } from '../Actions/userActions';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {MdExpandMore} from 'react-icons/md'

function ProfileComponent({loggedUser}) {
  const user = loggedUser;
  const [formData, setFormData] = useState({userId: loggedUser.id});
  console.log(loggedUser.profilePictureURL
    )
  
  
   const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (evt) => {
      const fileData = evt.target.result;
      const extension = file.name.split('.').pop();
      setFormData({ ...formData, profilePic:fileData, extension:extension  });
    };
  };
  
  
  const handleSubmit = (event) => {
    updateProfilePic(formData)
  };

  return (
    <div className='container'>
      <div className='tableContainer profileContainer'>
        <div className='profilePicContainer'>
          <img className="profilePic" src={`http://localhost:3001/${user.profilePictureURL}`} alt="Profile" />
          <Accordion>
                  <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{backgroundColor:'transparent'}}
                  >
                    <Typography>Upload Profile Picture</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    <form onSubmit={handleSubmit}>
                      <input type="file" id="profile-pic-upload" onChange={handleFileChange} />
                      <button type="submit">Submit</button>
                    </form>
                    </Typography>
                  </AccordionDetails>
          </Accordion>
        </div>
          
        <div className='profileInfoContainer'>
            <div className='profileInfoHeader'>
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
  )
}

export default ProfileComponent
