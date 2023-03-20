import React, {useState, useEffect } from 'react';
import { deleteUser, getAllUsers } from '../Actions/userActions';
import NewUser from './NewUser';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import {Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import {Box, Modal} from '@mui/material';
import ProfileComponent from './ProfileComponent';

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

function AllUsers({loggedUser}) {

  // Svi korisnici, filtrirani i kriterijum pretrage:
  const [users, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchData, setSearchData] = useState({searchName: '', searchMail:'', searchUserRole:''});
  const [selectedUser, setSelectedUser] = useState(null);
  const [successDeleteUser, setSuccessDeleteUser] = useState({isSuccess: null, message:''});
  // Za tabelu:
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Za modal dodaj korisnika: 
  const [openNewUser, setOpenNewUser] = React.useState(false);
  const handleOpenNewUser = () => setOpenNewUser(true);
  const handleClosNewUser = () => setOpenNewUser(false);

  // Za modal pogledajProfil: 
  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = (selectedUser) => {
    setOpenProfile(true);
    setSelectedUser(selectedUser)
  }
  const handleCloseProfile = () => setOpenProfile(false);

  //Za modal brisanja korisnika:
  const [openDeleteProfileDialog, setOpenDeleteProfileDialog] = React.useState(false);
  const handleOpenDeleteProfileDialog = (selectedUser) => {
    setOpenDeleteProfileDialog(true);
    setSelectedUser(selectedUser)
  }
  const handleCloseDeleteProfileDialog = () => setOpenDeleteProfileDialog(false);
  
  // Pri ucitavanju komponente, prvo uzimamo sve korisnike:
  useEffect(()=>{
    getAllUsers().then(data => {
        setAllUsers(data);
        setFilteredUsers(data);
    });
  }, [])  

  // Brisanje korisnika: 
  function handleDeleteUser(user){
    if(user === loggedUser){
      setSuccessDeleteUser({isSuccess:false, message:'Ne mozete brisati svoj profil'});
      setTimeout(()=>{
        setSuccessDeleteUser({isSuccess:null, message:''})
      }, 3000);
      return;
    } 
     try{
      deleteUser(user.id).then(()=>{
          getAllUsers().then(data=>{
            setAllUsers(data);
            handleCloseDeleteProfileDialog();
          });
          setSuccessDeleteUser({isSuccess: true, message: `Uspesno ste obrisali korisnika ${user.email}`});    
        setTimeout(()=>{
          setSuccessDeleteUser({isSuccess:null, message:''})
        }, 3000);
    })
     
    } catch(ex){
        //console.log('uhvatio gresku');
        setSuccessDeleteUser({isSuccess: false, message: `Greska prilikom brisanja korisnika ${user.email}`});
        setTimeout(()=>{
          setSuccessDeleteUser({isSuccess:null, message:''})
        }, 3000);
    }
  }

  // Odnosi se na pretragu korisnika u tabeli:
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchData({ ...searchData, [name]: value }); 
  };

  // takodje za pretragu korisnika:
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

    <div>

      <h1 className='tableHeader' > Korisnici </h1>
      <div className='rightContainer'>
      <button className="btnAdd" onClick={handleOpenNewUser}>Dodaj novog korisnika </button>
      </div>
      <Paper className="Paper" sx={{ width: '100%', overflow: 'hidden', marginTop: '10px' }}>
        <TableContainer className="TableContainer" sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky ">
            <TableHead>
                  <TableRow >
                    
                    <TableCell> Ime Prezime:</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Uloga</TableCell>
                    <TableCell>Broj poena:</TableCell>
                    <TableCell>Status:</TableCell>
                    
                    <TableCell> Obrisi</TableCell>
                    <TableCell> Vidi profil</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><input type="text"  placeholder='ime prezime' name = "searchName" value={searchData.searchName} onChange={handleChange} /></TableCell>
                    <TableCell><input type="text" placeholder='email' name = "searchMail" value={searchData.searchMail} onChange={handleChange} /></TableCell>
                    <TableCell><select type="text" placeholder='uloga' name = "searchUserRole" value={searchData.searchUserRole} onChange={ handleChange}>
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
                            { user.userRole === "none" ?(<TableCell>{user.userStatus}</TableCell>) :(<TableCell></TableCell>)}
                  <TableCell onClick={()=>{handleOpenDeleteProfileDialog(user)}}><AiFillDelete color='red'/></TableCell>
                          <TableCell onClick={()=>{handleOpenProfile(user)}}><u>PogledajProfil</u></TableCell>
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
            
      <Modal open={openNewUser} onClose={handleClosNewUser} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} >
          <NewUser setAllUsers={setAllUsers} />
        </Box>
      </Modal>

      <Modal open={openProfile} onClose={handleCloseProfile} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} >
          <ProfileComponent loggedUser={selectedUser}/>
        </Box>
      </Modal>

      <Modal open={openDeleteProfileDialog} onClose={handleCloseDeleteProfileDialog} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} >
          <h1 style={{color:'white', textAlign:'center'}}>Da li ste sigurni da želite da obrišete profil?</h1>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
          <button onClick={()=>{handleDeleteUser(selectedUser)}} style={{padding:'5px 20px', margin:'20px', backgroundColor:'green', color:'white'}}>Da</button>
          <button onClick = {()=>{handleCloseDeleteProfileDialog()}}style={{padding:'5px 20px', margin:'20px', backgroundColor:'red', color:'white'}}>Otkaži</button>
          </div>
        </Box>
      </Modal>
      {successDeleteUser.isSuccess===true && <Alert>{successDeleteUser.message}</Alert>}
      {successDeleteUser.isSuccess===false && <Alert severity='error'>{successDeleteUser.message}</Alert>}
</div>
    
  )
}

export default AllUsers