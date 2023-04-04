import React, { useState, useEffect } from 'react';
import { searchUsers } from '../../Actions/userActions';
import { postTeam, searchTeams } from '../../Actions/TeamActions';
import { Alert } from '@mui/material';


function NewTeam({setTeams, handleCloseNewTeam}) { 
    
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({name:''});
    const [success, setSuccess] = useState(null);    
    
    const handleChange = (e) =>{ 
        let value = e.target.value;
        if (e.target.name === "startDate" || e.target.name === "endDate") {
          value = new Date(value).toISOString().slice(0, 10);
        } 
        setFormData({...formData, [e.target.name]: value});
      }

    // Ucitaj potencijalne koordinatore:
    useEffect(() => {
            
        searchUsers({userRole:'editor'}).then(data=> {
            //console.log(data);
            setUsers(data) // prvo setuj korisnike
            setFormData({...formData, coordinator: data[0].id}) // posle setovanja, postavi prvog u nizu u kombo box
        })
    }, [success])

    // Predaja za novi tim: 
    async function handleSubmit (e){
        e.preventDefault();
        console.log(formData)
        try{
            await postTeam(formData)
                .then(()=>{
                    searchTeams()
                    .then((data) =>{
                        setTeams(data);
                        setSuccess(true);
                    })

            });   
            setTimeout(()=>{
                setSuccess(null);
                handleCloseNewTeam();
            }, 2000) 
        } catch(ex){
            console.log('uhratio gresku');
            setSuccess(false);
            setTimeout(()=>{
                setSuccess(null);
            }, 2000) 
        }
    }
  return (
    <div className='registerComponent'>      
        <h1 className='registerTitle'>Novi Tim</h1>
        <form className='registerForm' onSubmit = {(e)=>handleSubmit(e)}>
            <label className='registerLabel'>Naziv:</label>
            <input className='registerInput' name = "name" type = "text" required value ={formData.name} onChange={handleChange}/>

            <select className='registerInput' name='coordinator' onChange={handleChange} value = {formData.coordinator}>
                {users && users.map(user => (
                    <option key ={user.id} name = "coordinator" onChange={handleChange} value = {user.id}> {user.email}</option>
                ))}
            </select>
            <button className='registerSubmit' type = "submit"> Prijavi novi tim</button>
        </form>
        {success && (<Alert> Uspesno ste dodali novi tim {formData.name} </Alert>)}
        {success===false && (<Alert severity='error'>Greska prilikom cuvanja tima.</Alert>)}
    </div>
  )
}

export default NewTeam