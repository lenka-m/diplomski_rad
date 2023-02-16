import axios from 'axios';
import { getAll, postObject, searchObject } from './AbstractActions';

export async function getUser(){
    const res = await axios.get("http://localhost:3001/check");
    return await res.data.user;
}

export async function loginUser(email, password){
    const res = await axios.post(`http://localhost:3001/login`, {email, password});
    console.log(res);
    localStorage.setItem('token', res.data.token);
    console.log(`setovao token: ${localStorage.getItem('token')}`);
    return res.data.user;
}
export async function postUser(formData){
    await postObject('/register', formData)
}
export async function getAllUsers(){
    return await getAll('/users');
}

export async function searchUsers(formData){
    return await searchObject('/users/search', formData);
}

export async function logoutUser(){
    localStorage.clear();
 }

