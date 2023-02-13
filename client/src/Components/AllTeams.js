import React from 'react'
import { useState, useEffect } from 'react'
import { getAllTeams } from '../Actions/TeamActions';
import NewTeam from './NewTeam'
import "../css/tableComponent.css";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import NewTask from './NewTask';

function TaskHeader() {
  return (
    <thead>
      <tr>
        <td>Task Name</td>
        <td>Points</td>
        <td>Visibility</td>
      </tr>
    </thead>
  );
}

function AllTeams() {

  const [teams, setTeams] = useState([]);
  const [newTeamComponent, setNewTeamComponent] = useState(false);
  const [newTaskComponent, setNewTaskComponent] = useState(false)
  useEffect(()=>{
    getAllTeams().then((data)=>{
      
      setTeams(data);
      
    })
  }, [])
  return (
    
    <div className='tableContainer'>
      
    <h1> Timovi </h1>
    <table className='content-table'>
      <thead>
        <tr>
          
          <td>Name</td>
          <td>Coordinator</td>
          <td>Tasks</td>
        </tr>
      </thead>
      <tbody>
        {teams.map(team => (
          <tr key={team.id}>
            <td>{team.name}</td>
            {team.coordinator ? (<td>{team.coordinator.firstName} {team.coordinator.lastName}</td>) :(<td><i>Nema koord</i></td>)}
            
            <td>
              {team.tasks.length==0 ? (<td> /</td>):(
                <table className='task-table'>
                  <TaskHeader />
                  <tbody>
                    {team.tasks.map(task => (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.points}</td>
                        <td className='buttonCell'>  {task.visible ? (<p/>) : (<AiFillEyeInvisible className='buttonImage' color='red'/>)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {newTeamComponent ? (<NewTeam setNewTeamComponent={setNewTeamComponent} setTeams={setTeams} />
    ) : (<button onClick={()=>setNewTeamComponent(true)}> Dodaj novi tim</button>)}

    {newTaskComponent ? (<NewTask setNewTaskComponent = {setNewTaskComponent} setTeams = {setTeams} teams ={teams}/>
    ): (<button onClick={()=> setNewTaskComponent(true)}> Dodaj novi task</button>) }

  </div>
  )
}

export default AllTeams
