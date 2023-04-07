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
    <div className='RegisterComponent'>
        <h1 className='registerTitle' >Promena profilne slike </h1>
        <form className='' onSubmit={handleSubmit} style={{padding:'20px'}}>
            <input  type="file" id="profile-pic-upload" onChange={handleFileChange} /><br/>
            <button className='registerSubmit' type="submit">Submit</button>
        </form>
    </div>
  )
}

export default ChangeProfilePicture