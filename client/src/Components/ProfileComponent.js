import React, {useState} from 'react'
import "../css/profile.css";
import {BsFillTelephoneFill} from 'react-icons/bs';
import {GrMail} from 'react-icons/gr';
import {FaUserAlt, FaBirthdayCake} from 'react-icons/fa';
import { changePassword, updateProfilePic } from '../Actions/userActions';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {MdExpandMore} from 'react-icons/md'
import {Alert} from '@mui/material';

function ProfileComponent({loggedUser}) {
  const user = loggedUser;
  const [formData, setFormData] = useState({userId: loggedUser.id});
  const [passwordData, setPasswordData] = useState({userId: loggedUser.id, oldPassword:'', newPassword:'', confirmNewPassword:''} )
  const [successPass, setSuccessPass] = useState(null);
  
  
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

      // Promena podataka u formi se prati:
      const handlePasswordFormChange = (e) =>{ 
        setPasswordData({...passwordData, [e.target.name]: e.target.value });
    }

    
    async function handlePasswordFormSubmit (e){
        e.preventDefault(); // da ne refreshuje ceo element
        if(passwordData.newPassword === passwordData.confirmNewPassword){

          await changePassword(passwordData);
          setSuccessPass(true);
        } else{
          setSuccessPass(false)
          console.log("nisu iste sifre");
        } 
        
    }


  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfilePic(formData)
  };

  return (

      <div style={{marginTop:'30px'}} className='HomepageContainer profileContainer'>
        <div className='leftContainer'>
            <img className="profilePic" src={`http://localhost:3001/${user.profilePictureURL}`} alt="profilna" />
          <Accordion sx={{width:'80%'}}>
                  <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{backgroundColor:'transparent'}}
                  >
                    <Typography>Upload Profile Picture</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    
                    <form onSubmit={handleSubmit}>
                      <input type="file" id="profile-pic-upload" onChange={handleFileChange} />
                      <button type="submit">Submit</button>
                    </form>
                  </AccordionDetails>
          </Accordion>
          <Accordion sx={{width:'80%'}}>
                  <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{backgroundColor:'transparent'}}
                  >
                    <Typography>Change Password</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    
                    <form onSubmit={handlePasswordFormSubmit}>
                      <input onChange={(e)=>handlePasswordFormChange(e)}  name = 'oldPassword' value = {passwordData.oldPassword}  placeholder='old password'/><br/>
                      <input onChange={(e)=>handlePasswordFormChange(e)}  name = 'newPassword' value = {passwordData.newPassword} type="password" placeholder='new password'/><br/>
                      <input onChange={(e)=>handlePasswordFormChange(e)}  name = 'confirmNewPassword' value = {passwordData.confirmNewPassword} type="password"  placeholder='confirm new password'/><br/>
                      <button type="submit">Submit</button>

                    </form>
                    {successPass && (<Alert>Uspesno</Alert>)}
                    {successPass===false && (<Alert severity='warning'> Neuspesno</Alert>)}

                  </AccordionDetails>
          </Accordion>
        </div>
        
        
        
        
        <div className='rightContainer' style = {{width:'50%'}}>
        <div className='profileInfoContainer'>
          <div className='profileInfoHeader'>
              <h1>{user.firstName} {user.lastName}</h1>
              {user.userRoleName && <h2>{user.userRoleName}</h2>}        
            </div>
            <div className = 'profileInfoBody'>
            {user.userRole !== 'none' ? (<p><FaUserAlt/> <i>{user.userRole}</i></p>):(<div></div>)}
            {user.birthday !== null ? (<p><FaBirthdayCake/> <i>{user.birthday}</i></p>):(<div></div>)}

              
              <p><GrMail/> <i>{user.email}</i></p>            
              <p><i><BsFillTelephoneFill/> {user.telephoneNumber}</i></p> 
                     
            </div>
         </div>    
        
          {user.totalPoints !== null ? 
              (<div className='profileTotalPointsContainer'> 
                <h1>{user.totalPoints}</h1>
                <h5> <i>{user.userStatus}</i>  </h5>
              </div>):(<div></div>)}    
        </div>  
      </div>
  
  )
}

export default ProfileComponent
