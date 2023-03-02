import React from 'react'
import { useState, useEffect } from 'react'
import { getAllTeams } from '../Actions/TeamActions';
import NewTeam from './NewTeam'
import "../css/tableComponent.css";
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import NewTask from './NewTask';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { updateTaskVisibility } from '../Actions/TaskActivities';

function AllTeams() {

  const [teams, setTeams] = useState([]);
  const [newTeamComponent, setNewTeamComponent] = useState(false);
  const [newTaskComponent, setNewTaskComponent] = useState(false);

  function handleUpdateVisibility(task){
    try{
      //console.log(task)
      updateTaskVisibility({ visible: !task.visible, taskId: task.id})
      .then(() => getAllTeams())
      .then(data => {
        setTeams(data)
      });
          
      } catch(ex){
          console.log('neuspesna potvrda')
      }
  }
  
  useEffect(()=>{
    getAllTeams().then((data)=>{
      
      setTeams(data);
      console.log(data);
    })
  }, [])
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
      
    <h1> Timovi </h1>
    <div className='btnContainer'>
    {newTeamComponent ? (<NewTeam setNewTeamComponent={setNewTeamComponent} setTeams={setTeams} />
    ) : (  !newTaskComponent && <button className ='btnAdd ' onClick={()=>setNewTeamComponent(true)}> Dodaj novi tim</button>)}

    {newTaskComponent ? (<NewTask setNewTaskComponent = {setNewTaskComponent} setTeams = {setTeams} teams ={teams}/>
    ): (!newTeamComponent && <button className='btnAdd ' onClick={()=> setNewTaskComponent(true)}> Dodaj novi task</button>) }
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

  </div>
  )
}

export default AllTeams
