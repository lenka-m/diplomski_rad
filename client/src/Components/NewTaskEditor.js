import React, { useState, useEffect } from 'react';
import "../css/register.css";
import { postTask} from '../Actions/TaskActivities';
import { Alert } from '@mui/material';

function NewTaskEditor({team}) { 
    
    const [formData, setFormData] = useState({name:'', teamId: team.id, points:0});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value });
    }
    
    useEffect(() => {
        if (success) {
          const timer = setTimeout(() => {
            setSuccess(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
      }, [success]);      

    async function handleSubmit (e){
        e.preventDefault();
        try{
            await postTask(formData);
            setSuccess(true)
        } catch(err){
            setError(err);
        }
    }    

  return (
    <div className='registerComponent'>      
        <h1 className='registerTitle'>Nova Pozicija</h1>
        <form className='registerForm' onSubmit = {(e)=>handleSubmit(e)}>

            <label className='registerLabel'>Naziv:</label>
            <input className='registerInput' name = "name" type = "text" required value ={formData.name} onChange={handleChange}/>

            <label className='registerLabel'>Broj poena:</label>
            <input className='registerInput' name = "points" type = "text" required value ={formData.points} onChange={handleChange}/>

            
            <button className='registerSubmit' type = "submit"> Prijavi novi tim</button>
            
        </form>
        {success &&<Alert severity='success' >Uspesno ste dodali aktivnost</Alert>}
        { error && <Alert severity='warning'> Greska prilikom dodavanja aktivnosti</Alert>}

    </div>
  )
}

export default React.memo(NewTaskEditor);
