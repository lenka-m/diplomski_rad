import axios from "axios";

export async function createActiviry(userId, projectId, areaId, subareaId, date){
    const token = localStorage.getItem('token');
    await axios.post("http://localhost:3001/activity",{userId, projectId, areaId, subareaId, date},
        {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });   
}

export async function updateActivity(activityId ,userConfirmedId, numOfPoints){
    const token = localStorage.getItem('token');
    await axios.patch("http://localhost:3001/activity",{activityId, userConfirmedId, numOfPoints},
        {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });   
}