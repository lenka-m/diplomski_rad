import React from 'react'
import { useState, useEffect } from 'react'
import { getAllProjects, updateProjectVisibility } from '../Actions/ProjectActions'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import NewProject from './NewProject'
import {Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import {Box, Modal} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minwidth: 600,
  bgcolor: '#0C2D48',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};
 
function AllProjekti(user) {

  const [projects, setProjects] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibilitySuccess, setVisibilitySuccess] = useState({isSuccess:null, message:'Uspesno ste promenili vidljivost projekta'});


    // Za modal: 
    const [openNewProject, setOpenNewProject] = React.useState(false);
    const handleOpenNewProject = () => setOpenNewProject(true);
    const handleCloseNewProject = () => setOpenNewProject(false);
    

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
        setProjects(data)})
      .then(()=>{
        setVisibilitySuccess({isSuccess:true, message:`Uspesno ste azurirali vidljivost: ${project.name}`});
        setTimeout(()=>{
          setVisibilitySuccess({isSuccess:null, message:''});
        }, 4000)
      })
          
      } catch(ex){
          console.log('neuspesna potvrda');
          setVisibilitySuccess({isSuccess:false, message:`Greska prilikom azuriranja vidljivosti: ${project.name}`});
        setTimeout(()=>{
          setVisibilitySuccess({isSuccess:null, message:''});
        }, 4000)
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

      <h1 className='tableHeader'> Projekti </h1>

      <div className='rightContainer'>
        <button className="btnAdd" onClick={handleOpenNewProject}>Dodaj nov projekat </button>
      </div>

      <Paper className='Paper' sx={{ width: '100%', overflow: 'hidden', marginTop:'10px' }}>
            <TableContainer className='TableContainer' sx={{ maxHeight: 440}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                <TableRow >
                    <TableCell> Naziv</TableCell>
                    <TableCell>Skraćenica</TableCell>
                    <TableCell>Koordinator</TableCell>
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
                            <TableCell>{project.coordinator.email}</TableCell>
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
            <Modal
        open={openNewProject}
        onClose={handleCloseNewProject}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
            <NewProject  setProjects={setProjects} handleCloseNewProject = {handleCloseNewProject} />
        </Box>
      </Modal>

      {visibilitySuccess.isSuccess && <Alert sx={{marginTop:'20px'}}>{visibilitySuccess.message}</Alert>}

</div>
  )
}

export default AllProjekti
