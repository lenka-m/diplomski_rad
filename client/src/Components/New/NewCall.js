import React, { useState, useEffect } from 'react'
import { getAllProjects } from '../../Actions/ProjectActions';
import { getAllTeams } from '../../Actions/TeamActions';
import { postCall, searchCall } from '../../Actions/CallActions';
import { Alert } from '@mui/material';


export default function NewCall({setCalls, handleCloseNewCall, loggedUser}) {
  
  const [formData, setFormData] = useState({header:'', startDate:"", endDate:"",applyLink:'', postedBy:loggedUser.id, team:''})
  //Ponudjeni timovi i projekti u formi:
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);

  //Da li je uspesno poslat zahtev ili ne:
  const [success, setSuccess] = useState({isSuccess: null, message:''});

  // Promena podataka u formi se prati:
  const handleChange = (e) =>{ 
    
    let value = e.target.value;
    if (e.target.name === "startDate" || e.target.name === "endDate") {
      value = new Date(value).toISOString().slice(0, 10);
    } 
    setFormData({...formData, [e.target.name]: value});
  }


  // Submit, pozivanje cuvanja:
  async function handleSubmit (e){
    e.preventDefault(); // da ne refreshuje ceo elemente
    if(formData.startDate > formData.endDate){
      setSuccess({isSuccess:false, message:'Ne moze kraj pre pocetka.'});
      setTimeout(()=>{
        setSuccess({isSuccess:null, message:''});
      }, 2000)
      return;
    }
    
    try{
      await postCall(formData);
      await searchCall({postedBy:loggedUser.id}).then((data)=>{
        setCalls(data);
        setSuccess({isSuccess:true, message: "Uspesno sacuvan poziv!"})
      })
      setTimeout(()=>{
        handleCloseNewCall();
        setSuccess({isSuccess:null, message:""});
      }, 2000)
    } catch(ex){
      setSuccess({isSuccess:false, message:"Neuspesno cuvanje poziva"})
    }
  }

  useEffect(() => {
    getAllProjects().then(data => { 
        setProjects(data.filter((project)=>{return project.visible === true})); 
        setFormData({...formData, project: data[0].id})
      })
    getAllTeams().then(data => {
        setTeams(data); 
      })
  }, [])

  

  return (
    <div className='tableContainer'>
      <h1>Nov poziv</h1>
      <form className='registerForm' onSubmit = {(e)=>handleSubmit(e)}>
        <label className='registerLabel'>Naslov:</label>
        <input className='registerInput' name = "header" type = "text" required value ={formData.header} onChange={handleChange}/>

        <label className='registerLabel'>Link do prijave:</label>
        <a style={{color:'white'}} href={formData.applyLink} target='_blank'><u>(TestirajLink)</u></a>
        <input className='registerInput' name = "applyLink" type = "text" required value ={formData.applyLink} onChange={handleChange}/>
        


        <label className='registerLabel'>Projekat:</label>
        <select className='registerInput' name = "project" value ={formData.project} onChange={handleChange}>
                {projects && projects.map(project => (                    
                    <option key ={project.id} name = "project" onChange={handleChange} value = {project.id}> {project.name}</option>
                ))}
        </select>
        <label className='registerLabel'>Tim:</label>
        <select className='registerInput' name = "team" value ={formData.team} onChange={handleChange}>
                <option onChange={handleChange} name="team" value={''}>N/A</option>
                {teams && teams.map(team => (                    
                    <option key ={team.id} name = "team" onChange={handleChange} value = {team.id}> {team.name}</option>
                ))}
                
        </select>
        <label className='registerLabel'>Datum od:</label>
          <input className='registerInput' name = "startDate" type = "date" required value ={formData.startDate} onChange={handleChange}/>

        <label className='registerLabel'>Datum do:</label>
          <input className='registerInput' name = "endDate" type = "date" required value ={formData.endDate} onChange={handleChange}/>

          <button className='registerSubmit' type = "submit"> Posalji zahtev</button><br/>
      </form>
      {success.isSuccess === true && <Alert severity="success">{success.message}</Alert>}
      {success.isSuccess === false && <Alert severity='error'>{success.message}</Alert>}
    </div>
  )
}
