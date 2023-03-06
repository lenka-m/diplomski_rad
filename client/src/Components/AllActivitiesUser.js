import React from 'react'
import { searchActivity } from '../Actions/ActivityActions';
import { useState, useEffect } from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import "../css/tableComponent.css"


function AllActivitiesUser({loggedUser}) {
    const [completedActivities, setCompletedActivities] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    useEffect(()=>{   
        searchActivity({userId: loggedUser.id}).then(data => {
           // console.log(data);
            setCompletedActivities(data)
            
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
    <div className='tableContainer'>
       
       
     
        {completedActivities.length===0 ? (<h1>Nema Aktivnosti :D</h1>) : (<div><h1> Moje dosadašnje aktivnosti: </h1>
       
    <Paper className='Paper' sx={{ width: '100%', overflow: 'hidden', marginTop:'10px' }}>
            <TableContainer className='TableContainer' sx={{ maxHeight: 440}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                <TableRow >
                    <TableCell> Tim</TableCell>
                    <TableCell>Projekat</TableCell>
                    <TableCell>Pozicija</TableCell>
                    <TableCell>Datum</TableCell>
                    <TableCell>BrojPoena:</TableCell>
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
                              : (<TableCell>Na čekanju</TableCell>)}
                
             
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
   </div>)}
        
    </div>
  )
}

export default AllActivitiesUser