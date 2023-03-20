import React, { useState, useEffect } from 'react';
import "../css/register.css";
import { postTask } from '../Actions/TaskActivities';
import { getAllTeams, searchTeams } from '../Actions/TeamActions';
import { Alert } from '@mui/material';



function NewTask({teams, setTeams, handleCloseNewTask}) { 
    
    
    const [formData, setFormData] = useState({name:'', teamId: teams[0].id, points:0});
    const [success, setSuccess] = useState({isSuccess: null, message:''});
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit (e){
        e.preventDefault();
        try{
          await postTask(formData)
            .then(()=>{
              searchTeams()
                .then((data) =>{
                  setTeams(data);
                  setSuccess({isSuccess:true, message: `Uspesno ste dodali task ${formData.name}`});
                })
            });

            setTimeout(()=>{
              setSuccess({isSuccess:null, message:''});
              handleCloseNewTask();
            }, 2000)
        } catch(ex){
            setSuccess(false);
            setTimeout(()=>{
                setSuccess(null);
            }, 2000) 
        }   
    }
    
    useEffect(() => {
      searchTeams().then((data) => {
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

            
            <button className='registerSubmit' type = "submit"> Prijavi novi task</button>
            
        </form>
        {success.isSuccess===true && (<Alert>{success.message} </Alert>)}
        {success.isSuccess===false && (<Alert severity='error'>{success.message}</Alert>)}
    </div>
  )
}

export default NewTask