import React from 'react'
import { deleteActivity, EditorPatchActivity, searchActivity } from '../Actions/ActivityActions';
import { useState, useEffect } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import "../css/tableComponent.css"




function AllActivitiesEditor({loggedUser}) {
    
    // podaci koji se salju o ulogovanom kako bi dobili odgovarajuce aktivnosti:
    const userData = {coordinatorId: loggedUser.id, userRole: loggedUser.userRole};
    // skup aktivnosti:
    const [activities, setActivities] = useState([]);
    // Za tabelu bitno:
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    
    useEffect(()=>{   
        searchActivity(userData).then(data => {
            //console.log(data);
            setActivities(data);
        });
    }, [])  
    
    function handleAccept(activity){
        try{
        EditorPatchActivity({activityId: activity.id ,userConfirmedId: loggedUser.id, numOfPoints: 2})
        .then(() => searchActivity(userData))
            .then(data => { setActivities(data);
        });
        } catch(ex){
            console.log('neuspesna potvrda')
        }
    }
    
    function handleDeleteActivity(activity){
        try{
            deleteActivity(activity.id).then(
                searchActivity(userData).then(data => {
                    console.log(data);
                    setActivities(data);
                })
            )
            console.log("obrisana aktivnost");
          } catch(ex){
              console.log(ex);
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
    <div className='container'>
    <div className='tableContainer'>
         {activities.length===0 ? (<h1>Nema Aktivnosti :D</h1>) : (<div><h1> Aktivnosti </h1>
         <Paper className='Paper' sx={{ width: '100%', overflow: 'hidden', marginTop:'10px' }}>
            <TableContainer className='TableContainer' sx={{ maxHeight: 440}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                <TableRow >
                    <TableCell> Ime Prezime:</TableCell>
                    <TableCell>Projekat</TableCell>
                    <TableCell>Tim</TableCell>
                    <TableCell>Pozicija</TableCell>
                    <TableCell>Datum</TableCell>
                    <TableCell>Broj poena:</TableCell>
                    <TableCell> Potvrdi</TableCell>
                    <TableCell> Ponisti</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {activities
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((activity) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={activity.id}>
                            <TableCell>{activity.user.firstName} {activity.user.lastName}</TableCell>
                            <TableCell>{activity.project.short}</TableCell>
                            <TableCell>{activity.team.name}</TableCell>
                            <TableCell>{activity.task.name}</TableCell>
                            <TableCell>{activity.date}</TableCell>
                            {activity.status==='pending' ? 
                                (<TableCell>{activity.numOfPoints}</TableCell>):(
                                <TableCell> <input id={`input-${activity.id}`} defaultValue={activity.task.points}/></TableCell>
                            )}
                            {activity.status==='created' ? (<TableCell onClick={()=>{handleAccept(activity)}}> <AiFillCheckCircle className='buttonImage' color='green' /></TableCell>):(<TableCell></TableCell>)}
                            {activity.status==='created' ? (<TableCell onClick={()=>{handleDeleteActivity(activity)}}> <AiFillCloseCircle className='buttonImage' color='red'/> </TableCell>):(<TableCell></TableCell>)}
             </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={activities.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>      
        
    </div>)}
    </div>
    </div>
  )
}

export default AllActivitiesEditor