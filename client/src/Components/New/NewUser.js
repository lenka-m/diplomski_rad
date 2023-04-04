import React, { useState }  from 'react';
import { getAllUsers, postUser } from '../../Actions/userActions';
import "../../css/register.css";
import { Alert } from '@mui/material';

function NewUser({setAllUsers}) {

    const [formData, setFormData] = useState({firstName:'', lastName:'', password:'', email:'',userRole:'admin', telephoneNumber:381, userRoleName:'', userStatus: '', totalPoints:'', birthday: ''});
    const [success, setSuccess] = useState({isSuccess: null, message:''});
    
    const handleChange = (e) => {
        let value = e.target.value;
        if (e.target.name === "birthday") {
        value = new Date(value).toISOString().slice(0, 10);
        } else if (e.target.name === "telephoneNumber") {
            value = value.toString();
        }
        if(formData.userRole === 'editor' || formData.userRole==='admin'){
            setFormData({...formData, birthday:'', totalPoints:'', userStatus:''});
        }
        if(formData.userRole==='none'){
            setFormData({...formData, userRoleName:null});
        }
        setFormData({ ...formData, [e.target.name]: value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try{
        await postUser(formData);
        getAllUsers().then((data) => {
          setAllUsers(data);
        });
        setSuccess({isSuccess:true, message:'Uspesno napravljen profil!'})
    } catch(ex){
        console.log(ex.response.data);
        if(ex.response.data){
            setSuccess({isSuccess: false, message:ex.response.data}); 
        } else setSuccess({isSuccess: false, message:'Greska prilikom pravljenja naloga'}); 
        
    }
    }


    return (

        
    <div  className='RegisterComponent' style = {{padding:'20px', textAlign:'center'}}>
        <h1 className='registerTitle'>Novi profil </h1>
        <form className='registerForm' onSubmit = {(e)=>handleSubmit(e)}>
            <label className='registerLabel'>Ime:</label>
            <input className='registerInput' name = "firstName" type = "text" required value ={formData.firstName} onChange={handleChange}/>

            <label className='registerLabel'>Prezime:</label>
            <input className='registerInput' name = "lastName" type = "text" required value = {formData.lastName} onChange={handleChange}/>

            <label className='registerLabel'>Email:</label>
            <input  className='registerInput'name = "email" type = "text" required value = {formData.email} onChange={handleChange}/>
            
            <label className='registerLabel'>Lozinka:</label>
            <input className='registerInput' name = "password" type = "password" required value = {formData.password} onChange={handleChange}/>

            <label className='registerLabel'>Broj telefona:</label>
            <input className='registerInput' name = "telephoneNumber" type = "number" required value = {formData.telephoneNumber} onChange={handleChange}/>
            
            <label className='registerLabel'>Uloga:</label>
            <select className='registerInput' name = "userRole" onChange={ handleChange}>
                <option value = "admin"> Admin</option>
                <option value = "editor">Editor</option>
                <option value = "none">Nema</option>
            </select>
            {formData.userRole === 'editor' ? (
                    <fieldset style={{border:'none'}}><label className='registerLabel'>Naziv uloge:</label>
                    <input  className='registerInput' name = "userRoleName" type = "text"  value = {formData.userRoleName} onChange={handleChange}/>
                    </fieldset>): (<fieldset/>)}

            {formData.userRole === 'none' ? (
                <fieldset style={{border:'none'}}>
                    <label className='registerLabel'>Uloga:</label>
                    <select className='registerInput' name = "userStatus" onChange={ handleChange}>
                        <option value = "obzerver"> Obzerver</option>
                        <option value = "beba">Beba</option>
                        <option value = "full">Full</option>
                    </select><br></br>
                    <label className='registerLabel'>Broj poena:</label>
                    <input className='registerInput' name = "totalPoints" type = "number"  value ={formData.totalPoints} onChange={handleChange}/>
                    <br></br><label className='registerLabel'>Datum:</label>
                    <input className='registerInput' name = "birthday" type = "date"  value ={formData.date} onChange={handleChange}/>
                </fieldset >
            ):(null)}       

            
            <button className='registerSubmit' type = "submit"> Registruj novog korisnika</button>
        </form>
        { success.isSuccess=== true && <Alert>{success.message}</Alert>}
        {success.isSuccess=== false && <Alert severity='error'>{success.message}</Alert>}
        </div>
    
    
  )
}

export default NewUser