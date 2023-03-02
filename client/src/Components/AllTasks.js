import React, { useState, useEffect }  from 'react'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'

import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import {searchTasks, updateTaskVisibility } from '../Actions/TaskActivities'
import NewTask from './NewTask'
import NewTaskEditor from './NewTaskEditor';

function AllTasks({team}) { 

    const [tasks, setTasks] = useState(team.tasks || []);
    const [newTaskEditorComponent , setNewTaskEditorComponent] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    <div className='container'>
    <div className='tableContainer'>
      
      
    <h1> {team.name} Tim </h1>
    {newTaskEditorComponent ? (<NewTaskEditor setNewTaskEditorComponent={setNewTaskEditorComponent} team ={team} setTasks={setTasks} />
) : (<button className='btnAdd' onClick={()=>setNewTaskEditorComponent(true)}> Dodaj novi task</button>)}

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

</div>
</div>
  )
}

export default AllTasks

