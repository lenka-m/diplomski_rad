import React, {useState, useEffect } from 'react';
import { deleteUser, getAllUsers } from '../Actions/userActions';
import NewUser from './NewUser';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';

function AllUsers({loggedUser}) {
  const [users, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newUserComponent, setNewUserComponent]  = useState(false);
  const [searchData, setSearchData] = useState({searchName: '', searchMail:'', searchUserRole:''})
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(()=>{
    getAllUsers().then(data => {
        setAllUsers(data);
        setFilteredUsers(data);
        console.log('pozvaoOVO');
    });
  }, [])  

  function handleDeleteUser(user){
    if(user === loggedUser){
      alert('Ne mozete obrisati svoj profil');
      return;
    }
    try{
      deleteUser(user.id).then(
          getAllUsers().then(data=>{
            setAllUsers(data);
          })
      )
      console.log("obrisan");
    } catch(ex){
        console.log(ex);
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchData({ ...searchData, [name]: value });
    console.log(searchData.searchName)
  };
  
  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          (user.firstName.toLowerCase().includes(searchData.searchName.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchData.searchName.toLowerCase()) )&&
          user.email.toLowerCase().includes(searchData.searchMail.toLowerCase()) &&
          user.userRole.toLowerCase().includes(searchData.searchUserRole.toLowerCase())
      )
    );
  }, [searchData, users]);

  
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
      
      
      {newUserComponent ? (<NewUser setNewUserComponent={setNewUserComponent} setAllUsers={setAllUsers} />
) : (<button className='btnAdd' onClick={()=>setNewUserComponent(true)}> Dodaj novog korisnika</button>)}

     
  <Paper className='Paper' sx={{ width: '100%', overflow: 'hidden', marginTop:'10px' }}>
            <TableContainer className='TableContainer' sx={{ maxHeight: 440}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow >
                    
                    <TableCell> Ime Prezime:</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Uloga</TableCell>
                    <TableCell>Broj poena:</TableCell>
                    <TableCell>Status:</TableCell>
                    <TableCell>Azuriraj</TableCell>
                    <TableCell> Obrisi</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><input type="text" name = "searchName" value={searchData.searchName} onChange={handleChange} /></TableCell>
                    <TableCell><input type="text" name = "searchMail" value={searchData.searchMail} onChange={handleChange} /></TableCell>
                    <TableCell><select type="text" name = "searchUserRole" value={searchData.searchUserRole} onChange={ handleChange}>
                        <option></option>
                        <option>editor</option>
                        <option> none</option>
                        <option>admin</option>
                      </select></TableCell>
                    <TableCell/>
                    <TableCell/>
                    <TableCell/>
                    <TableCell/>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
               
                {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                            <TableCell>{user.firstName} {user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.userRole}</TableCell>
                            { user.userRole === "none" ?(<TableCell>{user.totalPoints}</TableCell>) :(<TableCell></TableCell>)}
                            { user.userRole === "none" ?(<TableCell>Beba</TableCell>) :(<TableCell></TableCell>)}
              <TableCell><AiFillEdit color='orange'/> </TableCell>
              <TableCell onClick={()=>{handleDeleteUser(user)}}><AiFillDelete color='red'/></TableCell>
          
                             </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>
</div>
    
  )
}

export default AllUsers