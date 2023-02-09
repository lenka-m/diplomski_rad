
import React from "react";
import { loginUser } from "../Actions/userActions";
import { useContext, useState} from "react";
import { UserContext } from "../Hooks/UserContext";
import { useHistory } from "react-router-dom";
import logoPhoto from "../img/logo.png";

function LoginPage(){
    const [loginData, setLoginData] = useState({email:'', password:''});
    const [error, setError] = useState(null);
    const {setUser} = useContext(UserContext); 
    const history = useHistory();
    const handleChange = e =>{
        setLoginData({...loginData, [e.target.name]: e.target.value });
    }
    async function handleSubmit (e){
        e.preventDefault();       
        try{ 
        const user1 = await loginUser(loginData.email, loginData.password);
        setUser(user1); 
        history.push('/profile');
        } catch(error){        
            setError(error);            
        }    
    }

    return(
        <div className="page">
            
            <form  className = "loginForm" onSubmit = {(e)=>handleSubmit(e)}>
            <img src={logoPhoto}></img>

                <label>Email:</label>
                <input name = "email" type = "text" required value ={loginData.email} onChange={handleChange}/>

                <label>Password:</label>
                <input name = "password" type = "password" required value = {loginData.password} onChange={handleChange}/>
                
                {error ? (<div>{error.response.data.message}</div>) : (<div></div>)}
                
                <button type = "submit"> Login</button>
            </form>
        </div>
    )
}
export default LoginPage;