import React from 'react'
import { deleteActivity, updateActivity,getAllActivities, postActivity, searchActivity } from '../Actions/ActivityActions';
import { useState, useEffect } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import "../css/tableComponent.css"




function AllActivitiesEditor({loggedUser}) {
    const [activities, setActivities] = useState([]);
    const userData = {coordinatorId: loggedUser.id, userRole: loggedUser.userRole};
    useEffect(()=>{   
        searchActivity(userData).then(data => {
            console.log(data);
            setActivities(data);
        });
    }, [])  
    
    function handleAccept(activity){
        console.log(activity);
        updateActivity({activityId: activity.id ,userConfirmedId: loggedUser.id, numOfPoints: 2})
    }
    
      
    function handleDeleteActivity(activity){
        try{
          deleteActivity(activity.id).then(
              getAllActivities((data)=>{
                setActivities(data);
              })
          )
          console.log("obrisana aktivnost");
        } catch(ex){
            console.log(ex);
        }
      }

  
  return (
    <div className='tableContainer'>
        {activities===0 ? (<h1>Nema Aktivnosti :D</h1>) : (<div><h1> Aktivnosti </h1></div>)}
       
    <table className = 'content-table'>
        <thead>
            <tr>
                <td> Ime i prezime</td>
                <td> Projekat</td>
                <td> Tim</td>
                <td> Pozicija</td>
                <td> Opis*</td>
                <td> Broj poena</td>
                
                <td> Potvrdi </td>
                <td> Ponisti </td>
            </tr>
        </thead>
        <tbody>
        {activities.map(activity => (
            <tr key={activity.id}>
                <td >{activity.user.firstName} {activity.user.lastName}</td>
                <td>{activity.project.name}</td>
                <td>{activity.team.name}</td>
                <td>{activity.task.name}</td>
                <td>ss</td>
                <td> <input id={`input-${activity.id}`}/></td>
                
                <td onClick={()=>{handleAccept(activity)}}> <AiFillCheckCircle className='buttonImage' color='white' /></td>
                <td onClick={()=>{handleDeleteActivity(activity)}}> <AiFillCloseCircle className='buttonImage' color='red'/> </td>
                
            </tr>  
          
        ))}
      </tbody>
    </table>
    
        
    </div>
  )
}

export default AllActivitiesEditor