import axios from 'axios';

export async function getUser(){
    const res = await axios.get("http://localhost:3001/check");
    return await res.data.user;
}

export async function loginUser(email, password){
    const res = await axios.post("http://localhost:3001/login",{email, password})
    localStorage.setItem('token',res.data.token);
    return await res.data.user;
}
export async function registerNewUser(firstName, lastName,password, email, userRole){
    const token = localStorage.getItem('token');
    await axios.post("http://localhost:3001/register",{firstName, lastName,password, email, userRole }
    , {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })    
}
export async function getAllUsers(){
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));
    const res = await axios.get("http://localhost:3001/users", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await res.data;
}


 export async function logoutUser(){
      localStorage.clear();
 }

