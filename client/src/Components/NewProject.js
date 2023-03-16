import React, { useState, useEffect } from 'react';
import { createProject } from '../Actions/ProjectActions';
import { getAllProjects } from '../Actions/ProjectActions';
import { searchUsers } from '../Actions/userActions';
import "../css/register.css";
import { Alert } from '@mui/material';

function NewProject({setProjects, handleCloseNewProject}) { 

    const [users, setUsers] = useState([]); //korisnici za editora
    const [formData, setFormData] = useState({name:'',short: '',website:'', visible:true});// podaci u formi
    const [success, setSuccess] = useState(null);

    //Prilikom inicijalnog učitavanja kupi sve editor profile kako bi popunio combo box
    useEffect(() => {
        searchUsers({userRole:'editor'}).then(data=> {
            setUsers(data)
        });
    }, []) 

    // Promena podataka u formi se prati:
    const handleChange = (e) =>{ 
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    // Promena combo box-a
    const handleCoordinatorChange = (e) => {
        setFormData({...formData, coordinatorId: e.target.value });
    }
    
     // Cuvanje novog projekta:
     async function handleSubmit (e){
        e.preventDefault(); // da ne refreshuje ceo element
        try{
            await createProject(formData); // prvo napravi projekat
            await getAllProjects() // onda uzmi sve projekte
                .then((data) => { 
                    setProjects(data); // kad pokupis setuj podatke na nove projekte
                    setSuccess(true);
                })
            setTimeout(()=>{
                setSuccess(null);
                handleCloseNewProject();
            }, 2000)
        } catch(ex){
            setSuccess(false);
        } 
    }

  return (
    <div className='registerComponent'>      
        <h1 className='registerTitle'>Novi Projekat</h1>
        <form className='registerForm' onSubmit = {(e)=>handleSubmit(e)}>
            <label className='registerLabel'>Naziv:</label>
            <input className='registerInput' name = "name" type = "text" required value ={formData.name} onChange={handleChange}/>

            <label className='registerLabel'>Skracenica:</label>
            <input className='registerInput' name = "short" type = "text" required value ={formData.short} onChange={handleChange}/>

            <label className='registerLabel'>Sajt:</label>
            <input className='registerInput' name = "website" type = "text" required value ={formData.website} onChange={handleChange}/>

            <label className='registerLabel'>Koordinator:</label>
            <select className='registerInput' onChange={(e)=>handleCoordinatorChange(e)} value = {formData.coordinatorId}>
                {users && users.map(user => (
                    <option key ={user.id} name = "coordinatorId" onChange={handleChange} value = {user.id}> {user.email}</option>
                ))}
            </select>
            
            
            <button className='registerSubmit' type = "submit"> Prijavi novi projekat</button>
            
        </form>
        {success && (<Alert> Uspesno ste dodali novi projekat {formData.name} </Alert>)}
        {success===false && (<Alert severity='error'>Greska prilikom cuvanja projekta.</Alert>)}
    </div>
  )
}

export default NewProject