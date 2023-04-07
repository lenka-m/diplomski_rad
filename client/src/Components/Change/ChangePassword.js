import React, { useState } from 'react'
import { Alert } from '@mui/material';
import { resetPassword } from '../../Actions/userActions';


function ChangePassword({loggedUser}) {

  const [email, setEmail] = useState({email:""});
  const [success, setSuccess] = useState({isSuccess:null, message:''});

  const handleChange = (e) => {
    setEmail({[e.target.name]: e.target.value });
  };
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(loggedUser){
        if(loggedUser.email != email.email){
          setSuccess({isSuccess:false, message:'Niste dobro uneli svoj mejl '});
          console.log(loggedUser.email)
          console.log(email)
          return;
        }
      } else await resetPassword(email);
      setSuccess({isSuccess:true, message:'Uspešno poslat mejl za resetovanje lozinke.'})
    } catch (error) {
      console.log(error);
      setSuccess({isSuccess:false, message:'Greska prilikom oporavljanja lozinke.'})
    }
  }

  return (
    <div className='RegisterComponent'>
    {loggedUser ? (
    <h1 className='registerTitle'>Potvrdi svoju email adresu:</h1>):(
      <h1 className='registerTitle'>Unesi svoju email adresu:</h1>
    )}
    {loggedUser ? (
      
      <form className="registerForm" style={{width:'100%'}} onSubmit={(e) => handleSubmit(e)}> 
        
        <label className='registerLabel'>Email:</label>
        <input
          className='registerInput'
          name="email"
          type="text"
          required
          value={email.email}
          onChange={(e)=>{setEmail({email: e.target.value})}}
        />
        
        <button className='registerSubmit' type="submit"> Reset</button>

        {success.isSuccess===true && <Alert>{success.message}</Alert>}
        {success.isSuccess===false && <Alert severity='error'>{success.message}</Alert>}
        
      </form>
    
    ):(
      <form className="registerForm" style={{width:'100%'}} onSubmit={(e) => handleSubmit(e)}> 

        <label className='registerLabel'>Email:</label>
        <input
          className='registerInput'
          name="email"
          type="text"
          required
          value={email.email}
          onChange={(e)=>{setEmail({email: e.target.value})}}
        />
        
        <button type="submit" className='registerSubmit' > Send</button>

        {success.isSuccess===true && <Alert>{success.message}</Alert>}
        {success.isSuccess===false && <Alert severity='error'>{success.message}</Alert>}
        
      </form>
    
    )}
    </div>
  )
}

export default ChangePassword