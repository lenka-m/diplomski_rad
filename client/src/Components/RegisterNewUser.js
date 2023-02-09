import React from 'react'
import { useState } from 'react';
import { registerNewUser } from '../Actions/userActions';
import "../css/register.css";
import { postData } from '../Hooks/postData';

function RegisterNewUser() {

    const [formData, setFormData] = useState({firstName:'', lastName:'', password:'', email:'',userRole:''});
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value });
    }
    async function handleSubmit (e){
        e.preventDefault();
        const error = await postData('http://localhost:3001/register', localStorage.getItem('token'), formData);
        if(!error){
            console.log(error);
        }
        console.log(error);
        //registerNewUser(formData.firstName, formData.lastName, formData.password, formData.email, formData.userRole)      
        //const user1 = await loginUser(loginData.email, loginData.password);
        //setUser(user1);     
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

export default RegisterNewUser