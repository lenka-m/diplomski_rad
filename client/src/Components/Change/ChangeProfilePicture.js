import React, {useState} from 'react'
import { updateProfilePic } from '../../Actions/userActions';


function ChangeProfilePicture({loggedUser}) {
    const [formData, setFormData] = useState({userId: loggedUser.id});
    const [success, setSuccess] = useState({isSuccess: null, message:null});

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
        try{
        updateProfilePic(formData)
        } catch(ex){

        }
    };


  return (
    <div style = {{display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <h1 style = {{color:'white', margin:'20px'}}>Promena profilne slike </h1>
        <form onSubmit={handleSubmit} >
            <input type="file" id="profile-pic-upload" onChange={handleFileChange} /><br/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default ChangeProfilePicture