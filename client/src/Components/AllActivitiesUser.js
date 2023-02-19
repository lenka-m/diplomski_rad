import React from 'react'
import { deleteActivity, updateActivity, adminPatchActivity, searchActivity } from '../Actions/ActivityActions';
import { useState, useEffect } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import "../css/tableComponent.css"
import NewActivity from './NewActivity';



function AllActivitiesUser({loggedUser}) {
    const [completedActivities, setCompletedActivities] = useState([]);
    const [pendingActivities, setPendingActivities] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    
    
    useEffect(()=>{   
        searchActivity({userId: loggedUser.id}).then(data => {
            console.log(data);
            setCompletedActivities(data)
            
        });
    }, [isOpen])  
    

    

      


  
  return (
    <div className='tableContainer'>
        { !isOpen && <button onClick={()=>{setIsOpen(!isOpen)}} >Posalji zahtev</button>}
       {isOpen && <NewActivity loggedUser = {loggedUser} setIsOpen={setIsOpen} />}
     
        {completedActivities.length===0 ? (<h1>Nema Aktivnosti :D</h1>) : (<div><h1> Moje dosadašnje aktivnosti: </h1>
       
    <table className = 'content-table'>
        <thead>
            <tr>
                
                <td> Tim</td>
                <td> Projekat</td>
                <td> Pozicija</td>
                <td> Datum</td>
                <td> Broj poena</td>
                
                
                
            </tr>
        </thead>
        <tbody>
        {completedActivities.map(activity => (
            <tr key={activity.id}>
                <td>{activity.team.name}</td>
                <td>{activity.project.name}</td>
                <td>{activity.task.name}</td>
                <td>{activity.date}</td>
                {activity.status ==='completed' ? 
                 (<td>{activity.numOfPoints} </td>)
                : (<td>pending</td>)}
            </tr>  
          
        ))}
      </tbody>
    </table>
   </div>)}
        
    </div>
  )
}

export default AllActivitiesUser