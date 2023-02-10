import React from 'react'
import { useState, useEffect } from 'react'
import { getAllTeams } from '../Actions/returnAll'
import NewTeam from './NewTeam'

function AllTeams() {

  const [teams, setTeams] = useState([]);
  const [newTeamComponent, setNewTeamComponent] = useState(false);
  useEffect(()=>{
    getAllTeams().then((data)=>{
      setTeams(data);
    })
  }, [])
  return (
    
    <div className='tableContainer'>
      
    <h1> Projekti </h1>
    <table className = 'content-table'>
    <thead>
        <tr>
            <td> Name</td>
          
            
        </tr>
    </thead>
    <tbody>
     {teams.map(team => (
        <tr key={team.id}>
            <td >{team.name}</td>
        </tr>  
      
    ))} 
  </tbody>
</table>
{newTeamComponent ? (<NewTeam setNewTeamComponent={setNewTeamComponent} setTeams={setTeams} />
) : (<button onClick={()=>setNewTeamComponent(true)}> Dodaj novi tim</button>)}

</div>
  )
}

export default AllTeams
