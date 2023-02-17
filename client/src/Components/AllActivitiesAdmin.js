import React from 'react'
import { deleteActivity, updateActivity,getAllActivities, postActivity, searchActivity } from '../Actions/ActivityActions';
import { useState, useEffect } from 'react';
import "../css/tableComponent.css"




function AllActivitiesAdmin({loggedUser}) {
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    
    const userRole = 'none';
    
    useEffect(()=>{   
        searchActivity().then(data => {
            console.log(data);
            setActivities(data);
            setFilteredActivities(data);
        });
    }, [])  
    
    function handleAccept(activity){
        console.log(activity);
        updateActivity({activityId: activity.id ,userConfirmedId: loggedUser.id, numOfPoints: 2})
    }
    function handleFilter(value) {
        setFilteredActivities(activities.filter(activity => activity.status === value));
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
                <td> Tim</td>
                <td> Pozicija</td>
                <td> Opis*</td>
                <td> Broj poena</td>
                <td> Potvrdjeno</td>
                {userRole == 'admin' && <td> Potvrdi </td>}
                {userRole == 'admin' && <td> Ponisti </td>}
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
                <td> <input id={`input-${activity.id}`} value = {activity.task.points} /></td>
                <td>
                   {activity.confirmation && <p>activity.user.</p>} 
                    
                </td>
                {userRole == 'admin' && <td onClick={()=>{handleAccept(activity)}}> <button >Potvrdi</button></td>}
                {userRole == 'admin' && <td onClick={()=>{handleDeleteActivity(activity)}}><button>Odbij</button></td>}
                
            </tr>  
          
        ))}
      </tbody>
    </table>
    )}   </div>)}
        
    </div>
  )
}

export default AllActivitiesAdmin