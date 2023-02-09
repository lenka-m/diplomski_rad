import React, {useEffect, useState } from 'react'
import { createActiviry } from '../Actions/ActivityActions';
import { getAllAreas, getAllProjects, getAllSubAreas } from '../Actions/returnAll';

function CreateActivity(user) {    
    
    const [areas, setAreas] = useState([]);
    const [subareas, setSubareas] = useState([]);
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({userId: user.user.id, date:""});
   
    
    useEffect(() => {
        getAllProjects().then(data => { setProjects(data); })
        getAllAreas().then(data => {setAreas(data); })
        getAllSubAreas().then(data => {setSubareas(data)});
    }, [])

    useEffect(() => {
        if(projects.length>0)
            setFormData({...formData, projectId:projects[0].id})
    }, [projects])
    useEffect(() => {
        if(areas.length>0)
            setFormData({...formData, areaId:areas[0].id})
    }, [areas])

    useEffect(() => {
        if(subareas.length>0)
            setFormData({...formData, subareaId:subareas[0].id})
    }, [ subareas])
    
    

const handleChange = e => {
    let value;
    if (e.target.name === "date") {
        value = e.target.value;
    } else {
        value = parseInt(e.target.value, 10);
    }
    setFormData({...formData, [e.target.name]: value});
};
    async function handleSubmit (e){
        e.preventDefault();
        console.log(formData);
        createActiviry(formData.userId, formData.projectId, formData.areaId, formData.subareaId, formData.date);
    }
  return (
    <div className='registerComponent'>        
        <h1 className='registerTitle'>Nova Aktivnost</h1>
        <form className='registerForm' onSubmit = {(e)=>handleSubmit(e)}>
            <label className='registerLabel'>Datum:</label>
            <input className='registerInput' name = "date" type = "text" required value ={formData.date} onChange={handleChange}/>

            <label className='registerLabel'>Tim:</label>
            <select className='registerInput' name = "projectId" value ={formData.projectId} onChange={handleChange}>
                {projects && projects.map(project => (                    
                    <option key ={project.id} name = "projectId" onChange={handleChange} value = {project.id}> {project.name}</option>
                ))}
            </select>
            <select className='registerInput' onChange={handleChange} value = {formData.areaId}>
                {areas && areas.map(area => (
                    <option key ={area.id} name = "areaId" onChange={handleChange} value = {area.id}> {area.name}</option>
                ))}
            </select>
            <select className='registerInput' onChange={handleChange} value = {formData.subareaId}>
                {subareas && subareas.map(subarea => (
                    <option key ={subarea.id} name = "subareaId" onChange={handleChange} value = {subarea.id}> {subarea.name}</option>
                ))}
            </select>
            <button className='registerSubmit' type = "submit"> Registruj novog korisnika</button>
        </form>
    </div>
  )
}

export default CreateActivity