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
    <div>
    {loggedUser ? (
      <form className="loginForm" style={{width:'100%'}} onSubmit={(e) => handleSubmit(e)}> 
        <h1>Potvrdi svoju email adresu:</h1>
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
    
    ):(
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
    
    )}
    </div>
  )
}

export default ChangePassword