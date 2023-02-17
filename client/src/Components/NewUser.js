import React from 'react'
import { useState } from 'react';
import { getAllUsers, postUser } from '../Actions/userActions';
import "../css/register.css";
import {FcCancel} from 'react-icons/fc';

function NewUser({ setNewUserComponent, setAllUsers}) {

    const [formData, setFormData] = useState({firstName:'', lastName:'', password:'', email:'',userRole:''});
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value });
    }
    async function handleSubmit (e){
        e.preventDefault();   
        await postUser(formData)
        getAllUsers()
            .then((data) =>{
                setAllUsers(data);
            }).then(()=>{
                setNewUserComponent(false);
            })
    }
    return (
    <div className='RegisterComponent'>
        <h1 className='registerTitle'>Novi profil </h1>
        <button className='btn-Exit' onClick={()=> setNewUserComponent(false)}><FcCancel className='btn-Exit-Icon'/></button>  
        <form className='registerForm' onSubmit = {(e)=>handleSubmit(e)}>
            <label className='registerLabel'>Ime:</label>
            <input className='registerInput' name = "firstName" type = "text" required value ={formData.firstName} onChange={handleChange}/>

            <label className='registerLabel'>Prezime:</label>
            <input className='registerInput' name = "lastName" type = "text" required value = {formData.lastName} onChange={handleChange}/>

            <label className='registerLabel'>Email:</label>
            <input  className='registerInput'name = "email" type = "text" required value = {formData.email} onChange={handleChange}/>
            
            <label className='registerLabel'>Lozinka:</label>
            <input className='registerInput' name = "password" type = "password" required value = {formData.password} onChange={handleChange}/>

            <label className='registerLabel'>Uloga:</label>
            <select className='registerInput' name = "userRole" onChange={ handleChange}>
                <option value = "admin"> Admin</option>
                <option value = "editor">Editor</option>
                <option value = "none">Nema</option>
            </select>
            <button className='registerSubmit' type = "submit"> Registruj novog korisnika</button>
        </form>
        
    </div>
  )
}

export default NewUser