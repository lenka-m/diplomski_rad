import React, {useEffect, useState } from 'react'
import { postActivity,searchActivity } from '../Actions/ActivityActions';
import { getAllTeams } from '../Actions/TeamActions';
import { getAllProjects } from '../Actions/ProjectActions';
import { FcCancel } from 'react-icons/fc';
import "../css/register.css"
function NewActivity({loggedUser, setIsOpen, setCompletedActivities}) {    
    const user = loggedUser;
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({userId: user.id, date:"", opis: ""});
   
    
    useEffect(() => {
        getAllProjects().then(data => { setProjects(data.filter((project)=>{return project.visible === true})); })
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
        let value = e.target.value;
        if (e.target.name === "date") {
            value = new Date(value).toISOString().slice(0, 10);
        } 
        setFormData({...formData, [e.target.name]: value});
    };
    async function handleSubmit (e){
            e.preventDefault();
            await postActivity(formData).then(
                searchActivity({userId: loggedUser.id}).then(data => {
                    console.log(data);
                    setCompletedActivities(data)
                    
                })
            );
            setIsOpen(false);
            console.log("proslo");

    }

  return (
    <div className='RegisterComponent'>
    <h1 className='registerTitle'>Nova aktivnost</h1>
    <button className='btn-Exit' onClick={()=> setIsOpen(false)}><FcCancel className='btn-Exit-Icon'/></button>  
    
        <form className='registerForm' onSubmit = {(e)=>handleSubmit(e)}>
            <label className='registerLabel'>Datum:</label>
            <input className='registerInput' name = "date" type = "date" required value ={formData.date} onChange={handleChange}/>

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