import React from 'react'
import { useState } from 'react';
import { resetPassword } from '../Actions/userActions';
import { Alert } from '@mui/material';

function ResetPassword() {

  const [email, setEmail] = useState({email:""});
  const [success, setSuccess] = useState({isSuccess:null, message:''});

  const handleChange = (e) => {
    setEmail({[e.target.name]: e.target.value });
  };
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      
      await resetPassword(email);
      setSuccess({isSuccess:true, message:'Uspešno poslat mejl za resetovanje lozinke.'})
    } catch (error) {
      console.log(error);
      setSuccess({isSuccess:false, message:'Greska prilikom oporavljanja lozinke.'})
    }
  }
  return (
    
        <form className="loginForm" style={{width:'100%'}} onSubmit={(e) => handleSubmit(e)}> 

        <label>Email:</label>
        <input
          name="email"
          type="text"
          required
          value={email.email}
          onChange={(e)=>{setEmail({email: e.target.value})}}
        />
        
        <button type="submit" style={{padding:'10px'}}> Reset</button>

        {success.isSuccess===true && <Alert>{success.message}</Alert>}
        {success.isSuccess===false && <Alert severity='error'>{success.message}</Alert>}
        
      </form>
    
  )
}

export default ResetPassword