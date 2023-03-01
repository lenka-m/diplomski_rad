import React, { useState, useEffect } from 'react'
import { deleteActivity, adminPatchActivity, searchActivity } from '../Actions/ActivityActions';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import "../css/tableComponent.css"
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';

function AllActivitiesAdmin1({loggedUser}) {
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [filterValue, setFilterValue] = useState({isSet: false, activityStatus:'none'});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

  
    // Opsta funkcija za kupljenje svih aktivnosti:
    function fetchAllActivities(){
        searchActivity({userRole: loggedUser.userRole}).then(data => {
            setActivities(data);
            setFilteredActivities(data);
        });
    }
    // Filtriranje aktivnosti: 
    function handleFilter(value) {
        if(filterValue.isSet ===  false || (filterValue.isSet === true && filterValue.activityStatus!=value)){
            setFilteredActivities(activities.filter(activity => activity.status === value));
            setFilterValue({isSet: true, activityStatus: value});
        } else{
            setFilteredActivities(activities);
            setFilterValue({isSet: false, activityStatus: 'none'});
        }
    }

    // Pri ucitavanju stranice uzimamo sve aktivnosti:
    useEffect(()=>{   
        fetchAllActivities();
    }, [])  
    
    //Klik na potvrdu aktivnosti:
    function handleAccept(activity) {
        try{
            adminPatchActivity({activityId: activity.id, userConfirmedId: loggedUser.id, numOfPoints: 2})
                .then(fetchAllActivities());
            // console.log("Uspesno potvrdjena aktivnosti");
        } catch(ex){
            console.log(ex);
        }
    }
    
    // Klik na odbijanje aktivnosti: 
    function handleDeleteActivity(activity){
        try{
            deleteActivity(activity.id)
                .then(fetchAllActivities())
            // console.log("obrisana aktivnost");
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
        {activities.length===0 ? (<h1 className='tableTitle'>Nema Aktivnosti :D</h1>) : (
        <div>
            <div className='titleContainer'>
                <h1> Aktivnosti </h1>
                <div className='filterButtons'>
                    <button
                        className={(filterValue.activityStatus === 'created') ?  "clicked" : ""} 
                        value="created"   
                        onClick={(e) => handleFilter(e.target.value)}> 
                        Potvrdjeno</button>
                    <button 
                        className={(filterValue.activityStatus === 'pending') ?  "clicked" : ""} 
                        value = "pending" 
                        onClick={(e) => handleFilter(e.target.value)}> 
                        Nisu potvrdjeni</button>
                </div>
            </div>
            {filteredActivities.length == 0 ? (<h1> Nema aktivnosti</h1>) : (

     
            <Paper className='Paper' sx={{ width: '100%', overflow: 'hidden', marginTop:'10px', backgroundColor:'transparent' }}>
            <TableContainer className='TableContainer' sx={{ maxHeight: 440}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                <TableRow >
                    <TableCell> Ime Prezime:</TableCell>
                    <TableCell>Projekat</TableCell>
                    <TableCell>Tim</TableCell>
                    <TableCell>Pozicija</TableCell>
                    <TableCell>Opis:</TableCell>
                    <TableCell>Broj poena:</TableCell>
                    <TableCell> Potvrdjeno</TableCell>
                    <TableCell/>
                    <TableCell/>
                </TableRow>
                </TableHead>
                <TableBody>
                {filteredActivities
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((activity) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={activity.id}>
                            <TableCell>{activity.user.firstName} {activity.user.lastName}</TableCell>
                            <TableCell>{activity.project.short}</TableCell>
                            <TableCell>{activity.team.name}</TableCell>
                            <TableCell>{activity.task.name}</TableCell>
                            <TableCell>s</TableCell>
                            <TableCell> <input id={`input-${activity.id}`} defaultValue = {activity.task.points} /></TableCell>
                            <TableCell>
                                {activity.userConfirmed ?  
                                    (<p>{activity.userConfirmed.email}</p>) :
                                    (<p>/</p>)} 
                            </TableCell>
                            <TableCell onClick={()=>{handleAccept(activity)}}> <AiFillCheckCircle className='buttonImage' color='green' /></TableCell>
                            <TableCell onClick={()=>{handleDeleteActivity(activity)}}> <AiFillCloseCircle className='buttonImage' color='red'/> </TableCell>
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredActivities.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>
        )}   
        </div>)}
        
    </div>
    
    
    </div>
  )
}

export default AllActivitiesAdmin1