import React, { useState, useEffect } from 'react'
import {Paper, Box, Modal, Table, IconButton, Collapse, TableRow,TableHead, TableContainer, TableCell, TableBody, Alert } from '@mui/material/';
import { AiOutlineArrowDown, AiOutlineArrowUp, AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import { getAllTeams } from '../Actions/TeamActions';
import { updateTaskVisibility } from '../Actions/TaskActivities';
import NewTeam from './NewTeam'
import NewTask from './NewTask';
import "../css/tableComponent.css";

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

function AllTeams() {

  const [teams, setTeams] = useState([]);
  const [taskVisibility, setTaskVisibility] = useState({isSuccess: null, message:''});

  // Za modal: 
    const [openNewTeam, setOpenNewTeam] = React.useState(false);
    const handleOpenNewTeam = () => setOpenNewTeam(true);
    const handleCloseNewTeam = () => setOpenNewTeam(false);

    const [openNewTask, setOpenNewTask] = React.useState(false);
    const handleOpenNewTask = () => setOpenNewTask(true);
    const handleCloseNewTask = () => setOpenNewTask(false);

  function handleUpdateVisibility(task){
    try{
      //console.log(task)
      updateTaskVisibility({ visible: !task.visible, taskId: task.id})
      .then(() => getAllTeams())
      .then(data => {
        setTeams(data)
        setTaskVisibility({isSuccess:true, message:`Uspesno azurirana vidljivost kod taska: ${task.name} `})
        setTimeout(()=>{
          setTaskVisibility({isSuccess: null, message:''});
        }, 2000)
      });
          
      } catch(ex){
          console.log('neuspesna potvrda');
          setTaskVisibility({isSuccess:false, message:`Greska u ažuriranju vidljivosti kod taska: ${task.name} `})
          setTimeout(()=>{
            setTaskVisibility({isSuccess: null, message:''});
          }, 2000)
      }
  }
  
  useEffect(()=>{
    
    getAllTeams().then((data)=>{
      
      setTeams(data);
      console.log(data);
    })
  }, [taskVisibility])

  // Tabela sa taskovima je ovde definisana: 
  function Row(team) {
    const { row } = team;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">{row.name}</TableCell>
          <TableCell>{row.coordinator.email}</TableCell>
          <TableCell>{row.tasks.length}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Naziv:</TableCell>
                      <TableCell>Broj poena:</TableCell>
                      <TableCell>Vidljivo:</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell component="th" scope="row">{task.name}</TableCell>
                        <TableCell> {task.points}</TableCell>
                        <TableCell className='editCell' onClick={()=> handleUpdateVisibility(task)}>  {task.visible ? (<AiFillEye className='buttonImage' color='green'/>) : (<AiFillEyeInvisible className='buttonImage' color='red'/>)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  return (
    
    <div className='tableContainer'>
      
    <h1 className='tableHeader'> Timovi </h1>
    
    <div className='rightContainer'>
        <button className="btnAdd" onClick={handleOpenNewTeam}>Dodaj nov tim </button>
        <button className="btnAdd" onClick={handleOpenNewTask}>Dodaj nov task </button>
    </div>
    
    <TableContainer component={Paper} sx = {{marginTop:'20px'}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Tim:</TableCell>
            <TableCell>Koordinator</TableCell>
            <TableCell> Broj Taskova:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team) => (
            <Row key={team.name} row={team} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Modal
        open={openNewTeam}
        onClose={handleCloseNewTeam}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
            <NewTeam  setTeams={setTeams} handleCloseNewTeam = {handleCloseNewTeam} />
        </Box>
      </Modal>

       <Modal
        open={openNewTask}
        onClose={handleCloseNewTask}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
            <NewTask teams={teams}  setTeams={setTeams} handleCloseNewTask = {handleCloseNewTask} />
        </Box>
      </Modal> 

      { taskVisibility.isSuccess === true && <Alert sx={{marginTop:'20px'}}> {taskVisibility.message}</Alert>      }
      { taskVisibility.isSuccess === false && <Alert sx={{marginTop:'20px'}} severity='error'> {taskVisibility.message}</Alert>      }
  </div>
  )
}

export default AllTeams
