import React, {useState, useEffect } from 'react';
import { getAllUsers } from '../Actions/userActions';
import NewUser from './NewUser';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';


function AllUsers({loggedUser}) {
  const [users, setAllUsers] = useState([]);
  const [newUserComponent, setNewUserComponent]  = useState(false);
  useEffect(()=>{
    getAllUsers().then(data => {
        setAllUsers(data);
    });
  }, [])  

  function handleDeleteUser(user){
    if(user === loggedUser){
      alert('Ne mozete obrisati svoj profil');
      return;
    }
    console.log(user);

  }
  return (
    <div className='tableContainer'>
      
      <h1> Korisnici </h1>
      {newUserComponent ? (<NewUser setNewUserComponent={setNewUserComponent} setAllUsers={setAllUsers} />
) : (<button className='btnAdd' onClick={()=>setNewUserComponent(true)}> Dodaj novog korisnika</button>)}

      <table className = 'content-table'>
      <thead>
          <tr>
              <td> Ime i prezime</td>
              <td> Uloga</td>
              <td> Email</td>
              <td> Azuriraj</td>
              <td> Obrisi</td>
              
              
          </tr>
      </thead>
      <tbody>
      {users.map(user => (
          <tr key={user.id}>
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