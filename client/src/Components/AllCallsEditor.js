import React from 'react'
import { useState, useEffect } from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import {Box, Modal} from '@mui/material';
import { searchCall } from '../Actions/CallActions'
import NewCall from './NewCall'

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
 
function AllCallsEditor({loggedUser}) {
  // Podaci u tabeli:
  const [calls, setCalls] = useState([]);
  
  // React material za tabelu:
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Za modal: 
  const [openNewCall, setOpenNewCall] = React.useState(false);
  const handleOpenNewCall = () => setOpenNewCall(true);
  const handleCloseNewCall = () => setOpenNewCall(false);

  useEffect(()=>{
    searchCall({postedBy:loggedUser.id}).then((data)=>{
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
    <div className='tableContainer'>  

      <h1 className='tableHeader'> Pozivi </h1>

      <div className='rightContainer'>
        <button className="btnAdd" onClick={handleOpenNewCall}>Dodaj nov poziv </button>
      </div>

      <Paper className='Paper' sx={{ width: '100%', overflow: 'hidden', marginTop:'10px' }}>
            <TableContainer className='TableContainer' sx={{ maxHeight: 440}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                <TableRow >
                    <TableCell> Naziv</TableCell>
                    <TableCell>Status:</TableCell>
                    <TableCell>DatumOd:</TableCell>
                    <TableCell>DatumDo</TableCell>
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
                            <TableCell >{call.header}</TableCell>
                          
                            { call.status==='upcoming' && <TableCell><i style={{color:'orange'}}>{call.status}</i></TableCell>}
                            { call.status==='active' && <TableCell><i style={{color:'green'}}>{call.status}</i></TableCell>}
                            { call.status==='passed' && <TableCell><i style={{color:'red'}}>{call.status}</i></TableCell>}
                          
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
                          {(call.status === 'active' || call.status ==="upcoming") ? (
                          <TableCell sx={{textAlign:'center'}}>
                            <a href={call.applyLink} target="_blank" rel="noopener noreferrer">
                              <button style={{padding:'7px', backgroundColor:'green', color:'whitesmoke', border:'none', borderRadius:'5px'}}>
                                Prijavi se!
                              </button>
                            </a>
                          </TableCell>) :(<TableCell sx={{textAlign:'center'}}><a href = {call.applyLink} target='_blank'>link</a></TableCell>)}
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
      <Modal
        open={openNewCall}
        onClose={handleCloseNewCall}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
            <NewCall  setCalls={setCalls} handleCloseNewCall = {handleCloseNewCall} loggedUser={loggedUser} />
        </Box>
      </Modal>
</div>
  )
}

export default AllCallsEditor
