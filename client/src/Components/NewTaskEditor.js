import React, { useState } from 'react';
import "../css/register.css";
import { postTask} from '../Actions/TaskActivities';
import { Alert } from '@mui/material';
import { searchTeams } from '../Actions/TeamActions';


function NewTaskEditor({ handleCloseNewTask, team, setTeams, loggedUser}) { 
    
    
    const [formData, setFormData] = useState({name:'', teamId: team.id, points:0});
    const [success, setSuccess] = useState({isSuccess: null, message:''});
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit (e){
        e.preventDefault();
        try{
            await postTask(formData).then(()=>{
                setSuccess({isSuccess:true, message:'Uspesno ste dodali novi task'}); 
            });
            await setTimeout(()=>{
                setSuccess({isSuccess:null, message:''});
                handleCloseNewTask();
                searchTeams({coordinatorId: loggedUser.id}).then((data)=>{
                    setTeams(data) ;
                            
            })
            }, 2000)
            
        } catch(ex){
            console.log(ex);
            setSuccess({isSuccess:false,message:'Greska prilikom cuvanja taska'});
            setTimeout(()=>{
              setSuccess({isSuccess:null, message:''});
            }, 2000)
        }
    }
    


  return (
    <div className='registerComponent'>      
        <h1   className='registerTitle'>{team.name} tim</h1>
        <form className='registerForm' onSubmit = {(e)=>handleSubmit(e)}>

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

export default NewTaskEditor