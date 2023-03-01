import React, { useState, useEffect } from 'react'
import { deleteActivity, adminPatchActivity, searchActivity } from '../Actions/ActivityActions';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import "../css/tableComponent.css"


function AllActivitiesAdmin({loggedUser}) {
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [filterValue, setFilterValue] = useState({isSet: false, activityStatus:'none'});

    // Opsta funkcija za kupljenje svih aktivnosti:
    function fetchAllActivities(){
        searchActivity({userRole: loggedUser.userRole}).then(data => {
            setActivities(data);
            setFilteredActivities(data);
        });
    }
    // Filtriranje aktivnosti: 
    function handleFilter(value) {
        if(filterValue.isSet ===  false || (filterValue.isSet === true && filterValue.activityStatus!=value)){
            setFilteredActivities(activities.filter(activity => activity.status === value));
            setFilterValue({isSet: true, activityStatus: value});
        } else{
            setFilteredActivities(activities);
            setFilterValue({isSet: false, activityStatus: 'none'});
        }
    }

    // Pri ucitavanju stranice uzimamo sve aktivnosti:
    useEffect(()=>{   
        fetchAllActivities();
    }, [])  
    
    //Klik na potvrdu aktivnosti:
    function handleAccept(activity) {
        try{
            adminPatchActivity({activityId: activity.id, userConfirmedId: loggedUser.id, numOfPoints: 2})
                .then(fetchAllActivities());
            // console.log("Uspesno potvrdjena aktivnosti");
        } catch(ex){
            console.log(ex);
        }
    }
    
    // Klik na odbijanje aktivnosti: 
    function handleDeleteActivity(activity){
        try{
            deleteActivity(activity.id)
                .then(fetchAllActivities())
            // console.log("obrisana aktivnost");
          } catch(ex){
              console.log(ex);
          }
    }

  
  return (
    <div className='container'>
    <div className='tableContainer'>
        {activities.length===0 ? (<h1 className='tableTitle'>Nema Aktivnosti :D</h1>) : (
        <div>
            <div className='titleContainer'>
                <h1> Aktivnosti </h1>
                <div className='filterButtons'>
                    <button
                        className={(filterValue.activityStatus === 'created') ?  "clicked" : ""} 
                        value="created"   
                        onClick={(e) => handleFilter(e.target.value)}> 
                        Potvrdjeno</button>
                    <button 
                        className={(filterValue.activityStatus === 'pending') ?  "clicked" : ""} 
                        value = "pending" 
                        onClick={(e) => handleFilter(e.target.value)}> 
                        Nisu potvrdjeni</button>
                </div>
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
                        <td> <input id={`input-${activity.id}`} defaultValue = {activity.task.points} /></td>
                        <td>
                        {activity.userConfirmed ?  (<p>{activity.userConfirmed.email}</p>) :(<p>/</p>)} 
                        </td>
                        <td onClick={()=>{handleAccept(activity)}}> <AiFillCheckCircle className='buttonImage' color='white' /></td>
                        <td onClick={()=>{handleDeleteActivity(activity)}}> <AiFillCloseCircle className='buttonImage' color='red'/> </td>
                        
                    </tr>  
                
                ))}
                </tbody>
            </table>
        )}   
        </div>)}
        
    </div>
    </div>
  )
}

export default AllActivitiesAdmin