import axios from "axios";


export async function postTeam(name, coordinatorId){
    const token = localStorage.getItem('token');
    await axios.post("http://localhost:3001/teams",{name, coordinatorId},
        {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });   
}