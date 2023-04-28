import React from 'react'
import "../css/profile.css";
import {BsFillTelephoneFill} from 'react-icons/bs';
import {GrMail} from 'react-icons/gr';
import {FaBirthdayCake} from 'react-icons/fa';
import ChangeProfilePicture from './Change/ChangeProfilePicture';
import {Modal, Box} from '@mui/material'
import ChangePassword from './Change/ChangePassword';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minwidth: 600,
  bgcolor: '#0C2D48',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

function ProfileComponent({loggedUser}) {
  const user = loggedUser
  // Za modal 'Promeni lozinku':
  const [openChangePassword, setOpenChangePassword] = React.useState(false);
  const handleOpenChangePassword = () => setOpenChangePassword(true);
  const handleCloseChangePassword = () => setOpenChangePassword(false);
  
  // Za modal 'ChangeProfilePicture:
  const [openChangePic, setOpenChangePic] = React.useState(false);
  const handleOpenChangePic = () => setOpenChangePic(true);
  const handleCloseChangePic = () => setOpenChangePic(false);    
    
  return (

      <div style={{marginTop:'30px'}} className='HomepageContainer profileContainer'>
        <div className='leftContainer'>
            <img className="profilePic" src={`http://localhost:3001/${user.profilePictureURL}`} alt="profilna" />
          
        </div>
        
        
        
        <div className='rightContainer'>
        
      </div>
        <div className='rightProfileContainer' >
        <div className='profileInfoContainer'>
          <div className='profileInfoHeader'>
              <h1>{user.firstName} {user.lastName}</h1>
              {user.userRoleName && <h2>{user.userRoleName}</h2>}        
            </div>
            <div className = 'profileInfoBody'>
            {user.birthday !== null ? (<p><FaBirthdayCake/> <i>{user.birthday}</i></p>):(<div></div>)}

              
              <p><GrMail/> <i>{user.email}</i></p>            
              <p><i><BsFillTelephoneFill/> {user.telephoneNumber}</i></p> 
              <div className='rightContainerRow'>
                <button className="greenBtn" onClick={handleOpenChangePic}>Promeni profilnu </button>
                <button className="greenBtn" onClick={handleOpenChangePassword}>Promeni lozinku </button>       
              </div>
            </div>
            
         </div>    
         {user.totalPoints !== null ? 
              (<div className='profileTotalPointsContainer'> 
                <h1>{user.totalPoints}</h1>
                <h5 style = {{color:'white'}}> <i>{user.userStatus}</i>  </h5>
              </div>):(<div></div>)}    
              
        </div>  
        
        <Modal
        open={openChangePic}
        onClose={handleCloseChangePic}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
            <ChangeProfilePicture loggedUser={loggedUser}/>
        </Box>
      </Modal>
      <Modal
        open={openChangePassword}
        onClose={handleCloseChangePassword}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
            <ChangePassword loggedUser={loggedUser}/>
        </Box>
      </Modal>
      </div>
  
  )
}

export default ProfileComponent
