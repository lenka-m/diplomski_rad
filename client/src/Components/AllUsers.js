import React, {useState, useEffect } from 'react';
import { deleteUser, getAllUsers } from '../Actions/userActions';
import NewUser from './NewUser';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';


function AllUsers({loggedUser}) {
  const [users, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newUserComponent, setNewUserComponent]  = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchData, setSearchData] = useState({searchName: '', searchMail:'', searchUserRole:''})
  
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

  

  return (
    <div className='tableContainer'>
      
      <h1> Korisnici </h1>
      {newUserComponent ? (<NewUser setNewUserComponent={setNewUserComponent} setAllUsers={setAllUsers} />
) : (<button className='btnAdd' onClick={()=>setNewUserComponent(true)}> Dodaj novog korisnika</button>)}

      <table className = 'content-table'>
      <thead>
          <tr>
              <td> Redni broj</td>
              <td> Ime i prezime</td>
              <td> Email</td>
              <td> Uloga</td>
              <td> Azuriraj</td>
              <td> Obrisi</td>
              
              
          </tr>
      </thead>
      <tbody>
      <tr>
        <td></td>
          <td>
            <input type="text" name = "searchName" value={searchData.searchName} onChange={handleChange} />
          </td>
          <td>
          <input type="text" name = "searchMail" value={searchData.searchMail} onChange={handleChange} />
          </td>
          <td>
          <input type="text" name = "searchUserRole" value={searchData.searchUserRole} onChange={ handleChange} />
          </td>
          
          
        </tr>
      {filteredUsers.map(user => (
          
          <tr key={user.id}>
            <td>{user.id}</td>
              <td >{user.firstName} {user.lastName}</td>
              <td> {user.email}</td>
              <td> {user.userRole}</td>
              <td><AiFillEdit color='orange'/> </td>
              <td onClick={()=>{handleDeleteUser(user)}}><AiFillDelete color='red'/></td>
          </tr>  
        
      ))} 
    </tbody>
  </table>
</div>
    
  )
}

export default AllUsers