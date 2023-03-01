import React from 'react'
import { useState, useEffect } from 'react'
import { getAllProjects, updateProjectVisibility } from '../Actions/ProjectActions'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import NewProject from './NewProject'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';

function AllProjekti(user) {

  const [projects, setProjects] = useState([]);
  const [newProjectComponent, setNewProjectComponent] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

   // Za tabelu funkcija:
   const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // Za Tabelu funkcija:
  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };

  return (
    
    <div className='tableContainer'>
      
    <h1> Projekti </h1>
    {newProjectComponent ? (<NewProject setNewProjectComponent={setNewProjectComponent} setProjects={setProjects} />
) : (<button className='btnAdd' onClick={()=>setNewProjectComponent(true)}> Dodaj novi projekat</button>)}

<Paper className='Paper' sx={{ width: '100%', overflow: 'hidden', marginTop:'10px' }}>
            <TableContainer className='TableContainer' sx={{ maxHeight: 440}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                <TableRow >
                    <TableCell> Ime</TableCell>
                    <TableCell>Skracenica</TableCell>
                    <TableCell>Sajt</TableCell>
                    <TableCell>Vidljivo</TableCell>
                 
                  
                </TableRow>
                </TableHead>
                <TableBody>
                {projects
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((project) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={project.id}>
                            <TableCell>{project.name}</TableCell>
                            <TableCell>{project.short}</TableCell>
                            <TableCell>{project.website}</TableCell>
                            <TableCell className='editCell' onClick={()=> handleUpdateVisibility(project)}>  {project.visible ? (<AiFillEye className='buttonImage' color='green'/>) : (<AiFillEyeInvisible className='buttonImage' color='red'/>)}</TableCell>
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={projects.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>

</div>
  )
}

export default AllProjekti
