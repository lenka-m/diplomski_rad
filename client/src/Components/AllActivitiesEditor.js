import React from 'react'
import { deleteActivity, EditorPatchActivity, searchActivity } from '../Actions/ActivityActions';
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
        try{
        EditorPatchActivity({activityId: activity.id ,userConfirmedId: loggedUser.id, numOfPoints: 2})
        .then(() => searchActivity(userData))
        .then(data => {
          console.log(data);
          setActivities(data);
          setActivities(data);
        });
            
        } catch(ex){
            console.log('neuspesna potvrda')
        }
    }
    
      
    function handleDeleteActivity(activity){
        try{
            deleteActivity(activity.id).then(
                searchActivity(userData).then(data => {
                    console.log(data);
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
         {activities.length===0 ? (<h1>Nema Aktivnosti :D</h1>) : (<div><h1> Aktivnosti </h1>
       
    <table className = 'content-table'>
        <thead>
            <tr>
                <td> Ime i prezime</td>
                <td> Projekat</td>
                <td> Tim</td>
                <td> Pozicija</td>
                <td> Datum</td>
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
                <td>{activity.date}</td>
                {activity.status==='pending' && <td>{activity.numOfPoints}</td>}
                {activity.status==='created' && <td> <input id={`input-${activity.id}`} defaultValue={activity.task.points}/></td>}
                {activity.status==='created' && <td onClick={()=>{handleAccept(activity)}}> <AiFillCheckCircle className='buttonImage' color='white' /></td>}
                {activity.status==='created' && <td onClick={()=>{handleDeleteActivity(activity)}}> <AiFillCloseCircle className='buttonImage' color='red'/> </td>}
            </tr>  
          
        ))}
      </tbody>
    </table>
    
        
    </div>)}
    </div>
  )
}

export default AllActivitiesEditor