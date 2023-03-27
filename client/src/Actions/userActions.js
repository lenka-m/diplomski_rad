import axios from 'axios';
import { deleteObject, getAll, patchObject, postObject, searchObject , uploadPic} from './AbstractActions';

export async function getUser(){
    return await getAll('/check');
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

export async function deleteUser(userId){
    console.log({'userId':userId});
    await deleteObject('/users', {'userId':userId});
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

 export async function updateProfilePic(formData){
    return await uploadPic('/users-profilePic', formData);
}

export async function changePassword(passwordData){
    return await patchObject('users-passwordChange', passwordData);
}

export async function getUserStatistics(){
    return await getAll('/users/stats');
}

export async function getTopTen(){
    return await getAll('/users/topTen')
}

export async function resetPassword(email){
    console.log(email)
    return await postObject('/forgot-password',email)
}
/*
},{
    method: 'get',
    route:'/users/stats',
    actions:[isAdmin, getUserStatistics]
},{

    res>
    {
    "totalUsers": 7,
    "adminCount": 1,
    "editorCount": 6,
    "noneCount": 0,
    "observerCount": 0,
    "bebaCount": 0,
    "fullCount": 0
}

*/