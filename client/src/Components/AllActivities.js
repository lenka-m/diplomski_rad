import React from 'react'
import { getAllActivities } from '../Actions/returnAll';
import { useState, useEffect } from 'react';
import "../css/tableComponent.css"
import {BsCheckCircleFill} from 'react-icons/bs'
import { updateActivity } from '../Actions/ActivityActions';


function AllActivities(user) {
    const [activities, setActivities] = useState([]);
    
    useEffect(()=>{   
        getAllActivities().then(data => {
            setActivities(data);
        });
    }, [])  
    function handleAccept(activity) {
        const inputValue = document.querySelector(`#input-${activity.id}`).value;
        console.log(inputValue);
        console.log(user.user.id);
        console.log(activity.id);
        updateActivity(activity.id ,user.user.userId, inputValue);
        // do any other necessary updates/operations
    }
  

  
  return (
    <div className='tableContainer'>
        <h1> Aktivnosti </h1>
    <table className = 'content-table'>
        <thead>
            <tr>
                <td> Ime i prezime</td>
                <td> Projekat</td>
                <td> Oblast</td>
                <td> Podoblast</td>
                <td> Opis</td>
                <td> Broj poena</td>
            </tr>
        </thead>
        <tbody>
        {activities.map(activity => (
            <tr key={activity.id}>
                <td >{activity.user.firstName} {activity.user.lastName}</td>
                <td>{activity.project.name}</td>
                <td>{activity.area.name}</td>
                <td>{activity.subarea.name}</td>
                <td>ss</td>
                <td> <input id={`input-${activity.id}`}/></td>
                <td><button onClick={() => handleAccept(activity)}><BsCheckCircleFill /></button></td>
                <td><button>Odbij</button></td>
            </tr>  
          
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default AllActivities