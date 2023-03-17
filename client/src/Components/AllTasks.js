import React, { useState, useEffect }  from 'react'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'

import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Modal, Box} from '@mui/material';
import {searchTasks, updateTaskVisibility } from '../Actions/TaskActivities'
import NewTaskEditor from './NewTaskEditor';
import NewTask from './NewTask';
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
function AllTasks({team, setTeams, loggedUser}) { 

    const [tasks, setTasks] = useState(team.tasks || []);
    const [newTaskEditorComponent , setNewTaskEditorComponent] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [openNewTask, setOpenNewTask] = React.useState(false);
    const handleOpenNewTask = () => setOpenNewTask(true);
    const handleCloseNewTask = () => setOpenNewTask(false);
    function handleUpdateVisibility(task){
        try{
            updateTaskVisibility({ visible: !task.visible, taskId: task.id})
                .then(() => searchTasks({teamId: team.id}))
                  .then(data => { setTasks(data)
                });
            
        } catch(ex){
            console.log('neuspesna potvrda')
        }
    }

    useEffect(() => {
        setTasks(team.tasks || []);
    }, [team]);

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
      
      
    <h1 className='tableHeader'> {team.name} Tim </h1>
    <div className='rightContainer'>
        <button className="btnAdd" onClick={handleOpenNewTask}>Dodaj nov task </button>
    </div>

    <Paper className='Paper' sx={{ width: '100%', overflow: 'hidden', marginTop:'10px' }}>
            <TableContainer className='TableContainer' sx={{ maxHeight: 440}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                <TableRow >
                    <TableCell> Naziv</TableCell>
                    <TableCell>BrojPoena</TableCell>
                    <TableCell>Vidljivo</TableCell>
                 
                  
                </TableRow>
                </TableHead>
                <TableBody>
                {tasks
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((task) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={task.id}>
                            <TableCell>{task.name}</TableCell>
                            <TableCell>{task.points}</TableCell>
                            <TableCell className='editCell' onClick={()=> handleUpdateVisibility(task)}>  {task.visible ? (<AiFillEye className='buttonImage' color='green'/>) : (<AiFillEyeInvisible className='buttonImage' color='red'/>)}</TableCell>
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={tasks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>
            <Modal
        open={openNewTask}
        onClose={handleCloseNewTask}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
            <NewTaskEditor loggedUser={loggedUser} setTeams={setTeams} team = {team} handleCloseNewTask = {handleCloseNewTask}  />
        </Box>
      </Modal> 

</div>
  )
}

export default AllTasks

