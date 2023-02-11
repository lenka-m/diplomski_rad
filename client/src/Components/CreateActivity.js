import React, {useEffect, useState } from 'react'
import { createActivity } from '../Actions/ActivityActions';
import { getAllTeams, getAllProjects, getAllTasks } from '../Actions/returnAll';

function CreateActivity(user) {    
    
    const [teams, setTeams] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({userId: user.user.id, date:""});
   
    
    useEffect(() => {
        getAllProjects().then(data => { setProjects(data); })
        getAllTeams().then(data => {setTeams(data); })
        getAllTasks().then(data => {setTasks(data)});
    }, [])

    useEffect(() => {
        if(projects.length>0)
            setFormData({...formData, projectId:projects[0].id})
    }, [projects])
    useEffect(() => {
        if(tasks.length>0)
            setFormData({...formData, taskId:tasks[0].id})
    }, [tasks])

    useEffect(() => {
        if(teams.length>0)
            setFormData({...formData, teamId:teams[0].id})
    }, [ teams])
    
    

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
        createActivity(formData.userId, formData.projectId, formData.teamId, formData.taskId, formData.date);
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
            <select className='registerInput' onChange={handleChange} value = {formData.teamId}>
                {teams && teams.map(team => (
                    <option key ={team.id} name = "teamId" onChange={handleChange} value = {team.id}> {team.name}</option>
                ))}
            </select>
            <select className='registerInput' onChange={handleChange} value = {formData.taskId}>
                {tasks && tasks.map(task => (
                    <option key ={task.id} name = "taskId" onChange={handleChange} value = {task.id}> {task.name}</option>
                ))}
            </select>
            <button className='registerSubmit' type = "submit"> Registruj novog korisnika</button>
        </form>
    </div>
  )
}

export default CreateActivity