import React from 'react'
import { useState, useEffect } from 'react'
import { getAllProjects, updateProjectVisibility } from '../Actions/ProjectActions'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import NewProject from './NewProject'

function AllProjekti(user) {

  const [projects, setProjects] = useState([]);
  const [newProjectComponent, setNewProjectComponent] = useState(false);
  useEffect(()=>{
    getAllProjects().then((data)=>{
      setProjects(data);
    })
  }, [])
  function handleUpdateVisibility(project){
    try{
      console.log(project)
      updateProjectVisibility({ visible: !project.visible, projectId: project.id})
      .then(() => getAllProjects())
      .then(data => {
        setProjects(data)
      });
          
      } catch(ex){
          console.log('neuspesna potvrda')
      }
  }
  return (
    
    <div className='tableContainer'>
      
    <h1> Projekti </h1>
    {newProjectComponent ? (<NewProject setNewProjectComponent={setNewProjectComponent} setProjects={setProjects} />
) : (<button className='btnAdd' onClick={()=>setNewProjectComponent(true)}> Dodaj novi projekat</button>)}

    <table className = 'content-table'>
    <thead>
        <tr>
            <td> Ime</td>
            <td> Skracenica</td>
            <td> Sajt</td>
            <td> Vidljivo</td>
            
            
        </tr>
    </thead>
    <tbody>
     {projects.map(project => (
        <tr key={project.id}>
            <td >{project.name}</td>
            <td> {project.short}</td>
            <td>{project.website}</td>
            <td className='editCell' onClick={()=> handleUpdateVisibility(project)}>  {project.visible ? (<AiFillEye className='buttonImage' color='white'/>) : (<AiFillEyeInvisible className='buttonImage' color='red'/>)}</td>
        </tr>  
      
    ))} 
  </tbody>
</table>

</div>
  )
}

export default AllProjekti
