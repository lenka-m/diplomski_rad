import axios from 'axios';

export async function getAllTeams(){
    const res = await axios.get("http://localhost:3001/teams", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await res.data;
}

export async function getAllTasks(){
    const res = await axios.get("http://localhost:3001/tasks", {
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