import React, { useState, useEffect } from 'react';
import "../css/register.css";
import { postTask } from '../Actions/TaskActivities';
import { getAllTeams } from '../Actions/TeamActions';



function NewTask({ setNewTaskComponent, teams, setTeams}) { 
    
    
    const [formData, setFormData] = useState({name:'', teamId: teams[0].id, points:0});

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit (e){
        e.preventDefault();
        await postTask(formData)
        getAllTeams()
            .then((data) =>{
                setTeams(data);
            }).then(()=>{
                setNewTaskComponent(false)
            })
    }
    
    useEffect(() => {
      getAllTeams().then((data) => {
        setTeams(data);
      });
    }, []);

  return (
    <div className='registerComponent'>      
        <h1  onClick={()=> setNewTaskComponent(false)} className='registerTitle'>Nova Pozicija</h1>
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
    </div>
  )
}

export default NewTask