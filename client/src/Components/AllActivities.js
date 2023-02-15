import React from 'react'
import { getAllActivities, postActivity } from '../Actions/ActivityActions';
import { useState, useEffect } from 'react';
import "../css/tableComponent.css"
import {BsCheckCircleFill} from 'react-icons/bs'
import { updateActivity } from '../Actions/ActivityActions';


function AllActivities({loggedUser}) {
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [numOfPoints, setNumOfPoints] = useState(0);
    
    useEffect(()=>{   
        getAllActivities().then(data => {
            setActivities(data);
            setFilteredActivities(data);
        });
    }, [])  
    
    function handleAccept(activity){
        console.log(activity);
        updateActivity({activityId: activity.id ,userConfirmedId: loggedUser.id, numOfPoints: 2})
    }
    function handleFilter(value){
        setFilteredActivities(activities.filter(activity => activity.status === value))
    }

  
  return (
    <div className='tableContainer'>
        {activities===0 ? (<h1>Nema Aktivnosti :D</h1>) : (<div><h1> Aktivnosti </h1>
        <div className='filterButtons'>
            <button onClick={()=> setFilteredActivities(activities)}> Sve Aktivnosti</button>
            <button  onClick={()=>handleFilter("created")}>Potvrdjeno</button>
            <button  onClick={()=> handleFilter("pending")}> Nisu potvrdjeni</button>
        </div>
     {filteredActivities.length == 0 ? (<h1> Nema aktivnosti</h1>) : (

     
    <table className = 'content-table'>
        <thead>
            <tr>
                <td> Ime i prezime</td>
                <td> Projekat</td>
                <td> Oblast</td>
                <td> Podoblast</td>
                <td> Opis</td>
                <td> Broj poena</td>
                <td> Potvrdjeno</td>
                <td> Potvrdi </td>
                <td> Poništi</td>
            </tr>
        </thead>
        <tbody>
        {filteredActivities.map(activity => (
            <tr key={activity.id}>
                <td >{activity.user.firstName} {activity.user.lastName}</td>
                <td>{activity.project.name}</td>
                <td>{activity.team.name}</td>
                <td>{activity.task.name}</td>
                <td>ss</td>
                <td> <input id={`input-${activity.id}`}/></td>
                <td>
                    
                    
                </td>
                <td onClick={()=>{handleAccept(activity)}}> <button >Potvrdi</button></td>
                <td ><button>Odbij</button></td>
            </tr>  
          
        ))}
      </tbody>
    </table>
    )}   </div>)}
        
    </div>
  )
}

export default AllActivities