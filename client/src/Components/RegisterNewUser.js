import React from 'react'
import { useState } from 'react';
import { postUser } from '../Actions/userActions';
import "../css/register.css";
import { postData } from '../Hooks/postData';

function NewUser() {

    const [formData, setFormData] = useState({firstName:'', lastName:'', password:'', email:'',userRole:''});
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value });
    }
    async function handleSubmit (e){
        e.preventDefault();   
        await postUser(formData);
    }
    return (
    <div className='RegisterComponent'>
        <h1 className='registerTitle'>Novi profil</h1>
        <form className='registerForm' onSubmit = {(e)=>handleSubmit(e)}>
            <label className='registerLabel'>Ime:</label>
            <input className='registerInput' name = "firstName" type = "text" required value ={formData.firstName} onChange={handleChange}/>

            <label className='registerLabel'>Prezime:</label>
            <input className='registerInput' name = "lastName" type = "text" required value = {formData.lastName} onChange={handleChange}/>

            <label className='registerLabel'>Lozinka:</label>
            <input className='registerInput' name = "password" type = "password" required value = {formData.password} onChange={handleChange}/>

            <label className='registerLabel'>Email:</label>
            <input  className='registerInput'name = "email" type = "text" required value = {formData.email} onChange={handleChange}/>
            
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