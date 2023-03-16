import React, {useState,useEffect} from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import { searchCall } from '../Actions/CallActions';
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
function AllCallsActive() {
  const [calls, setCalls] = useState([]);

  // React material za tabelu:
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(()=>{
    searchCall({status:"active"}).then((data)=>{
      setCalls(data);
    })
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
    
    <div className='HomepageContainer' >
      <h1>Aktivni pozivi</h1>
      {calls.length===0 ? (<h3> -- Trenutno nema aktivnih poziva --</h3>):(
        <Paper className='Paper' sx={{ width: '100%', overflow: 'hidden', marginTop:'10px' }}>
            <TableContainer className='TableContainer' sx={{ maxHeight: 440}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                <TableRow >
                    <TableCell>Naziv</TableCell>
                    <TableCell>Posted by</TableCell>
                    <TableCell>Od:</TableCell>
                    <TableCell>Do:</TableCell>
                    <TableCell>Projekat: </TableCell>
                    <TableCell>Tim: </TableCell>
                    <TableCell>Link: </TableCell>                 
                </TableRow>
                </TableHead>
                <TableBody>
                {calls
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((call) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={call.id}>
                            <TableCell>{call.header}</TableCell>
                            <TableCell>{call.postedBy.email}</TableCell>                          
                            <TableCell>{call.startDate}</TableCell>
                            <TableCell>{call.endDate}</TableCell>
                          {call.project ? (
                            <TableCell>{call.project.name}</TableCell>
                          ):(
                            <TableCell>/</TableCell>
                          )}
                          {call.team ? (
                            <TableCell>{call.team.name}</TableCell>
                          ):(
                            <TableCell>/</TableCell>
                          )}
                          <TableCell>
                            <a href={call.applyLink} target="_blank" rel="noopener noreferrer">
                              <button style={{padding:'7px', backgroundColor:'green', color:'whitesmoke', border:'none', borderRadius:'5px'}}>
                                Prijavi se!
                              </button>
                            </a>
                          </TableCell>
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={calls.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>
        
      )}
        
        
    </div>
    
  )
}

export default AllCallsActive