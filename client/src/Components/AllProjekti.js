import React from 'react'
import { useState, useEffect } from 'react'
import {getAllProjects} from '../Actions/ProjectActions'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import NewProject from './NewProject'

function AllProjekti() {

  const [projects, setProjects] = useState([]);
  const [newProjectComponent, setNewProjectComponent] = useState(false);
  useEffect(()=>{
    getAllProjects().then((data)=>{
      setProjects(data);
    })
  }, [])
  return (
    
    <div className='tableContainer'>
      
    <h1> Projekti </h1>
    <table className = 'content-table'>
    <thead>
        <tr>
            <td> Ime</td>
            <td> Skracenica</td>
            <td> Sajt</td>
            <td> Vidljivo</td>
            <td> Edit</td>
            
        </tr>
    </thead>
    <tbody>
     {projects.map(project => (
        <tr key={project.id}>
            <td >{project.name}</td>
            <td> {project.short}</td>
            <td>{project.website}</td>
            <td className='buttonCell'>  {project.visible ? (<AiFillEye className='buttonImage' color='white'/>) : (<AiFillEyeInvisible className='buttonImage' color='red'/>)}</td>
        </tr>  
      
    ))} 
  </tbody>
</table>
{newProjectComponent ? (<NewProject setNewProjectComponent={setNewProjectComponent} setProjects={setProjects} />
) : (<button onClick={()=>setNewProjectComponent(true)}> Dodaj novi projekat</button>)}

</div>
  )
}

export default AllProjekti
