import axios from 'axios';

export async function getAllAreas(){
    const res = await axios.get("http://localhost:3001/areas", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await res.data;
}

export async function getAllSubAreas(){
    const res = await axios.get("http://localhost:3001/subareas", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await res.data;
}
export async function getAllProjects(){
    const res = await axios.get("http://localhost:3001/projects", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await res.data;
}

export async function getAllActivities(){
    const res = await axios.get("http://localhost:3001/activity", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await res.data;
}