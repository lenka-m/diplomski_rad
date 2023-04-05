import React from 'react'
import {searchActivity } from '../../Actions/ActivityActions';
import { useState, useEffect } from 'react';
import NewActivity from '../New//NewActivity';
import {Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';

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

function AllActivitiesUser({loggedUser}) {
    const [completedActivities, setCompletedActivities] = useState([]);
      // React material za tabelu:
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // Za modal: 
    const [openNewActivity, setOpenNewActivity] = React.useState(false);
    const handleOpenNewActivity = () => setOpenNewActivity(true);
    const handleCloseNewActivity = () => setOpenNewActivity(false);
        
    
    useEffect(()=>{   
        searchActivity({userId: loggedUser.id}).then(data => {
            setCompletedActivities(data);    
        });
    }, [])      

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
    <div className='HomepageContainer'>
        <h1>Aktivnosti</h1>
        <div className='rightContainerRow' style = {{marginBottom:'20px'}}>
        <button className="greenBtn" onClick={handleOpenNewActivity}>Dodaj novu aktivnost </button>
      </div>
        {completedActivities.length===0 ? (<h3> -- Trenutno nema aktivnosti--</h3>):(
    
    <Paper className='Paper' sx={{ width: '100%', overflow: 'hidden', marginTop:'10px' }}>
    <TableContainer className='TableContainer' sx={{ maxHeight: 440}}>
    <Table stickyHeader aria-label="sticky table">
        <TableHead>
        <TableRow >
            <TableCell>Tim</TableCell>
            <TableCell>Projekat</TableCell>
            <TableCell>Pozicija:</TableCell>
            <TableCell>Datum</TableCell>
            <TableCell>Broj poena: </TableCell>
            <TableCell>Status: </TableCell>

        </TableRow>
        </TableHead>
        <TableBody>
        {completedActivities
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((activity) => {
            return (
                <TableRow hover role="checkbox" tabIndex={-1} key={activity.id}>
                      
                <TableCell>{activity.team.name}</TableCell>
                <TableCell>{activity.project.name}</TableCell>
                <TableCell>{activity.task.name}</TableCell>
                <TableCell>{activity.date}</TableCell>
                {activity.status ==='completed' ? 
                 (<TableCell>{activity.numOfPoints} </TableCell>)
                : (<TableCell>pending</TableCell>)}
                </TableRow>
            );
            })}
        </TableBody>
    </Table>
    </TableContainer>
    <TablePagination
    rowsPerPageOptions={[10, 25, 100]}
    component="div"
    count={completedActivities.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </Paper>
   )}
    <Modal
        open={openNewActivity}
        onClose={handleCloseNewActivity}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
            <NewActivity  loggedUser={loggedUser} setCompletedActivities={setCompletedActivities} handleCloseNewActivity = {handleCloseNewActivity} />
        </Box>
      </Modal>
        
    </div>
  
  ) 
}

export default AllActivitiesUser