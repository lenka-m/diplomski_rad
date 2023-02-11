import axios from "axios";

export async function postTask(name, teamId, points){
    const token = localStorage.getItem('token');
    await axios.post("http://localhost:3001/tasks",{teamId, name, points},
        {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });   
}