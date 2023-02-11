import React from 'react'
import { getAllActivities } from '../Actions/returnAll';
import { useState, useEffect } from 'react';
import "../css/tableComponent.css"
import {BsCheckCircleFill} from 'react-icons/bs'
import { updateActivity } from '../Actions/ActivityActions';


function AllActivities(user) {
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [filterValue, setFilterValue] = useState(false);
    useEffect(()=>{   
        getAllActivities().then(data => {
            setActivities(data);
            setFilteredActivities(data);
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
    
    function handleFilter(value){
        setFilteredActivities(activities.filter(activity => activity.status === value))
    }

  
  return (
    <div className='tableContainer'>
        <h1> Aktivnosti </h1>
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
                    {activity.status === 'created'? (<p>Da</p>):(<button onClick={() => handleAccept(activity)}><BsCheckCircleFill /></button>)}
                    
                </td>
                <td><button>Odbij</button></td>
            </tr>  
          
        ))}
      </tbody>
    </table>
    )}   
    </div>
  )
}

export default AllActivities