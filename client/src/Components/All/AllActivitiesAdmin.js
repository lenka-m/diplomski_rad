import React, { useState, useEffect } from 'react'
import { deleteActivity, adminPatchActivity, searchActivity, EditorPatchActivity, PatchActivityPoints } from '../../Actions/ActivityActions';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import {Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';


function AllActivitiesAdmin({loggedUser}) {
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [filterValue, setFilterValue] = useState({isSet: false, activityStatus:'none'});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Za editovanje poena:
    const [editMode, SetEditMode] = useState({isEdit: false, activityId:null })
    const [numOfPoints, setNumOfPoints] = useState(0);

    // Za pracenje koja aktivnost je prihvacena
    const [confirmActivitySuccess, setConfirmActivitySuccess] = useState({isSuccess:null, message:''});
    // Opsta funkcija za kupljenje svih aktivnosti:
    async function fetchAllActivities(){
        searchActivity({userRole: loggedUser.userRole}).then(data => {
            setActivities(data);
            setFilteredActivities(data);
        });
    }
    // Filtriranje aktivnosti: 
    function handleFilter(value) {
        if(filterValue.isSet ===  false || (filterValue.isSet === true && filterValue.activityStatus!==value)){
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
    },[])  
    
    //Klik na potvrdu aktivnosti:
    function handleAccept(activity) {
        try{
            adminPatchActivity({activityId: activity.id, userConfirmedId: loggedUser.id, numOfPoints: activity.numOfPoints})
                .then(()=>{fetchAllActivities().then(()=>{
                    setConfirmActivitySuccess({isSuccess: true, message:'Uspesno prihvacena aktivnost'});
                        setTimeout(()=>{
                    setConfirmActivitySuccess({isSuccess:null, message:''});
                }, 2000)       
                })
                })
        } catch(ex){
            console.log(ex);
        }
    }
    // update number of points:
    function handleUpdatePoints(){
        const Formdata = {activityId: editMode.activityId, numOfPoints:numOfPoints}
        try{
            console.log(
            'pozivamo handle update'
            )
            PatchActivityPoints(Formdata).then(()=>{
                console.log('zovemo podatke nove')
                fetchAllActivities().then(()=>{
                    SetEditMode({isEdit:false, activityId:null});
                    console.log('zatvaramo tu opciju')
                })
                
            })
        } catch(ex){
            console.log(ex);
        }
    }
    
    // Klik na odbijanje aktivnosti: 
    function handleDeleteActivity(activity){
        try{
            deleteActivity(activity.id)
                .then(fetchAllActivities())
            setConfirmActivitySuccess({isSuccess: true, message:'Uspesno odbijena aktivnost'});
            setTimeout(()=>{
                setConfirmActivitySuccess({isSuccess:null, message:''});
            }, 2000)
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
    <div className='HomepageContainer'>
    
        {activities.length===0 ? (<h1 className='tableTitle'>Nema Aktivnosti :D</h1>) : (
        <div style={{width:'100%'}}>
            <div className='titleContainer'>
                <h1> Aktivnosti </h1>
                <div className='rightContainerRow'>
                <button 
                        className={(filterValue.activityStatus === 'pending') ?  "clicked" : "greenBtn"} 
                        value = "pending" 
                        onClick={(e) => handleFilter(e.target.value)}> 
                        Potvrđeno</button>
                <button
                        className={(filterValue.activityStatus === 'created') ?  "clicked" : "greenBtn"} 
                        value="created"   
                        onClick={(e) => handleFilter(e.target.value)}> 
                        Nisu potvrdjeni</button>
                    
                </div>
            </div>
            {filteredActivities.length === 0 ? (<h1> Nema aktivnosti</h1>) : (

     
            <Paper className='Paper' sx={{ width: '100%', overflow: 'hidden', marginTop:'10px' }}>
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
                            {(editMode.isEdit===true && editMode.activityId===activity.id) ? (
                                <TableCell>
                                    <div>
                                        <input style={{width:'50%', textAlign:'center'}} onChange={(e)=>{setNumOfPoints(e.target.value)}} value={numOfPoints}></input>
                                        <AiFillCheckCircle onClick={handleUpdatePoints}/>
                                    </div>
                                </TableCell>
                            ):(
                                <TableCell>
                                    <div style = {{display:'flex', alignItems:'row', justifyContent:'space-evenly'}}>
                                        <p>{activity.numOfPoints}</p>
                                        <AiFillEdit onClick={(()=>{
                                            setNumOfPoints(activity.numOfPoints);
                                            SetEditMode({isEdit: true, activityId:activity.id})
                                        })} color='orange'/>
                                    </div>
                                </TableCell>
                            )}
                            
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
    
    {confirmActivitySuccess.isSuccess === true && <Alert severity="success">{confirmActivitySuccess.message}</Alert>}
    {confirmActivitySuccess.isSuccess === false && <Alert severity='error'>{confirmActivitySuccess.message}</Alert>}
    
    </div>
  )
}

export default AllActivitiesAdmin