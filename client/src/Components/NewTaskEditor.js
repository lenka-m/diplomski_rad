import React, { useState, useEffect } from 'react';
import "../css/register.css";
import { postTask, searchTasks } from '../Actions/TaskActivities';
import { getAllTeams } from '../Actions/TeamActions';



function NewTaskEditor({ setNewTaskEditorComponent, team, setTasks}) { 
    
    
    const [formData, setFormData] = useState({name:'', teamId: team.id, points:0});

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit (e){
        e.preventDefault();
        console.log(formData)
        await postTask(formData)
        searchTasks({teamId:team.id})
            .then((data) =>{
                setTasks(data)
            }).then(()=>{
                setNewTaskEditorComponent(false)
            })
    }
    


  return (
    <div className='registerComponent'>      
        <h1  onClick={()=> setNewTaskEditorComponent(false)} className='registerTitle'>Nova Pozicija</h1>
        <form className='registerForm' onSubmit = {(e)=>handleSubmit(e)}>

            <label className='registerLabel'>Naziv:</label>
            <input className='registerInput' name = "name" type = "text" required value ={formData.name} onChange={handleChange}/>

            <label className='registerLabel'>Broj poena:</label>
            <input className='registerInput' name = "points" type = "text" required value ={formData.points} onChange={handleChange}/>

            
            <button className='registerSubmit' type = "submit"> Prijavi novi tim</button>
            
        </form>
    </div>
  )
}

export default NewTaskEditor