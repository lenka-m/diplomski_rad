import React, { useState } from 'react';
import "../css/register.css";
import { createProject } from '../Actions/ProjectActions';
import { getAllProjects } from '../Actions/ProjectActions';
function NewProject({setNewProjectComponent, setProjects}) { 

    const [formData, setFormData] = useState({name:'',short: '',website:'', visible:true});
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value });
    }
    async function handleSubmit (e){
        e.preventDefault();
        await createProject(formData);
        getAllProjects()
            .then((data) => {
                setProjects(data);
            }).then(()=>{
            setNewProjectComponent(false)
            });
    }
  return (
    <div className='registerComponent'>      
    <button onClick={()=> setNewProjectComponent(false)}> Odustani</button>  
        <h1 className='registerTitle'>Novi Projekat</h1>
        <form className='registerForm' onSubmit = {(e)=>handleSubmit(e)}>
            <label className='registerLabel'>Naziv:</label>
            <input className='registerInput' name = "name" type = "text" required value ={formData.name} onChange={handleChange}/>

            <label className='registerLabel'>Skracenica:</label>
            <input className='registerInput' name = "short" type = "text" required value ={formData.short} onChange={handleChange}/>

            <label className='registerLabel'>Sajt:</label>
            <input className='registerInput' name = "website" type = "text" required value ={formData.website} onChange={handleChange}/>


            
            
            <button className='registerSubmit' type = "submit"> Prijavi novi projekat</button>
            
        </form>
    </div>
  )
}

export default NewProject