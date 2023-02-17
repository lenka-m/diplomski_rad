import React, { useState, useEffect } from 'react';
import "../css/register.css";
import { searchUsers } from '../Actions/userActions';
import { postTeam } from '../Actions/TeamActions';
import { getAllTeams } from '../Actions/TeamActions';


function NewTeam({ setNewTeamComponent, setTeams}) { 
    
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({name:''});

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const handleCoordinatorChange = (e) => {
        setFormData({...formData, coordinatorId: e.target.value });
    }


    useEffect(() => {
        searchUsers({userRole:'editor'}).then(data=> {
            //console.log(data);
            setUsers(data)
        });
    }, [])

    useEffect(() => {
        if(users.length > 0) {
            setFormData({...formData, coordinatorId: users[0].id})
          }
    }, [users])

    async function handleSubmit (e){
        e.preventDefault();
        await postTeam(formData);
        getAllTeams()
            .then((data) =>{
                setTeams(data);
            }).then(()=>{
                setNewTeamComponent(false)
            })
    }
  return (
    <div className='registerComponent'>      
    <button onClick={()=> setNewTeamComponent(false)}>Odustani</button>  
        <h1 className='registerTitle'>Novi Tim</h1>
        <form className='registerForm' onSubmit = {(e)=>handleSubmit(e)}>
            <label className='registerLabel'>Naziv:</label>
            <input className='registerInput' name = "name" type = "text" required value ={formData.name} onChange={handleChange}/>

            <select className='registerInput' onChange={(e)=>handleCoordinatorChange(e)} value = {formData.coordinatorId}>
                {users && users.map(user => (
                    <option key ={user.id} name = "coordinatorId" onChange={handleChange} value = {user.id}> {user.email}</option>
                ))}
            </select>
            <button className='registerSubmit' type = "submit"> Prijavi novi tim</button>
            
        </form>
    </div>
  )
}

export default NewTeam