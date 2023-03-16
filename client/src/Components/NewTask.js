import React, { useState, useEffect } from 'react';
import "../css/register.css";
import { postTask } from '../Actions/TaskActivities';
import { getAllTeams } from '../Actions/TeamActions';
import { Alert } from '@mui/material';



function NewTask({teams, setTeams, handleCloseNewTask}) { 
    
    
    const [formData, setFormData] = useState({name:'', teamId: teams[0].id, points:0});
    const [success, setSuccess] = useState(null);
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit (e){
        e.preventDefault();
        try{
          await postTask(formData)
          await getAllTeams()
              .then((data) =>{
                  setTeams(data);
              })
          setSuccess(true);
          setTimeout(()=>{
            setSuccess(null);
            handleCloseNewTask()

          }, 2000)
        } catch(ex){
          setSuccess(false)
          setTimeout(()=>{
            setSuccess(null);
          }, 2000)
        }   
    }
    
    useEffect(() => {
      getAllTeams().then((data) => {
        setTeams(data);
      });
    }, []);

  return (
    <div className='registerComponent'>      
        <h1  className='registerTitle'>Nova Pozicija</h1>
        <form className='registerForm' onSubmit = {(e)=>handleSubmit(e)}>
            
            <select
  className='registerInput'
  onChange={handleChange}
  value={formData.teamId}
  name="teamId"
>
  {teams && teams.map(team => (
    <option key={team.id} value={team.id}>{team.name}</option>
  ))}
</select>

            <label className='registerLabel'>Naziv:</label>
            <input className='registerInput' name = "name" type = "text" required value ={formData.name} onChange={handleChange}/>

            <label className='registerLabel'>Broj poena:</label>
            <input className='registerInput' name = "points" type = "text" required value ={formData.points} onChange={handleChange}/>

            
            <button className='registerSubmit' type = "submit"> Prijavi novi tim</button>
            
        </form>
        {success && (<Alert> Uspesno ste dodali novi tim {formData.name} </Alert>)}
        {success===false && (<Alert severity='error'>Greska prilikom cuvanja tima.</Alert>)}
    </div>
  )
}

export default NewTask