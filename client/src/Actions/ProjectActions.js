import axios from "axios";


export async function getAllProjects(){
    const res = await axios.get("http://localhost:3001/projects", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await res.data;
}

export async function createProject(name, short, website, visible){
    const token = localStorage.getItem('token');
    await axios.post("http://localhost:3001/projects",{name, short, website, visible},
        {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });   
}