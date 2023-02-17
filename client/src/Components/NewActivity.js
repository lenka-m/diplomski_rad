import React, {useEffect, useState } from 'react'
import { postActivity } from '../Actions/ActivityActions';
import { getAllTeams } from '../Actions/TeamActions';
import { getAllProjects } from '../Actions/ProjectActions';


function NewActivity({loggedUser}) {    
    const user = loggedUser;
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({userId: user.id, date:"", opis: ""});
   
    
    useEffect(() => {
        getAllProjects().then(data => { setProjects(data); })
        getAllTeams().then(data => {
            setTeams(data); 
            console.log(data);
            setTasks(data[0].tasks)
        })
    }, [])
    const handleTaskChange = (e) => {
        setFormData({...formData, taskId: e.target.value });
    }
    const handleTeamChange = (e) =>{
        setFormData({...formData, teamId: e.target.value})
    }

    useEffect(() => {
        if(projects.length>0)
            setFormData({...formData, projectId:projects[0].id})
    }, [projects])

    useEffect(() => {
        if(teams.length>0){
            setFormData({...formData, teamId:teams[0].id, taskId: teams[0].tasks[0].id}) 
        }
    }, [ teams])
    useEffect(() => {
        console.log(' pt ');
        if(teams.length>0){
            setTasks(selectedTeam.tasks);
        }
    }, [ selectedTeam])
    
    

    const handleChange = e => {
        let value;
        if (e.target.name === "date") {
            value = e.target.value;
        } 
        setFormData({...formData, [e.target.name]: value});
    };
        async function handleSubmit (e){
            e.preventDefault();
            postActivity(formData);
            console.log("proslo");

    }

  return (
    <div className='registerComponent'>        
        <h1 className='registerTitle'>Nova Aktivnost</h1>
        <form className='registerForm' onSubmit = {(e)=>handleSubmit(e)}>
            <label className='registerLabel'>Datum:</label>
            <input className='registerInput' name = "date" type = "text" required value ={formData.date} onChange={handleChange}/>

            <label className='registerLabel'>Projekat:</label>
            <select className='registerInput' name = "projectId" value ={formData.projectId} onChange={handleChange}>
                {projects && projects.map(project => (                    
                    <option key ={project.id} name = "projectId" onChange={handleChange} value = {project.id}> {project.name}</option>
                ))}
            </select>
            <label className='registerLabel'>Tim:</label>
            <select className='registerInput' onChange={(e) => {
                handleChange(e);
                handleTeamChange(e);
                setSelectedTeam(teams.find(team => team.id === parseInt(e.target.value, 10)));
                }} value = {formData.teamId}>
                {teams && teams.map(team => (
                    <option key ={team.id} name = "teamId" value = {team.id}> {team.name}</option>
                ))}
            </select>

            <label className='registerLabel'>Pozicija:</label>
             <select className='registerInput' onChange={(e)=> handleTaskChange(e)} value = {formData.taskId}>
                {tasks && tasks.map(task => (
                    <option key ={task.id} name = "taskId" onChange={(e)=> handleTaskChange(e)} value = {task.id}> {task.name}</option>
                ))}
            </select> 
            <label className='registerLabel'>Opis:</label>
            <input className='registerInput' name = "opis" type = "text" placeholder='nije obavezno' value ={formData.opis} onChange={handleChange}/>

            <button className='registerSubmit' type = "submit"> Posalji zahtev</button>
        </form>
    </div>
  )
}

export default NewActivity