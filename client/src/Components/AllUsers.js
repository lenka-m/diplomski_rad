import React, {useState, useEffect } from 'react';
import { getAllUsers } from '../Actions/userActions';
import RegisterNewUser from './RegisterNewUser';

function AllUsers() {
  const [users, setAllUsers] = useState([]);
  const [newUserComponent, setNewUserComponent]  = useState(false);
  useEffect(()=>{
    getAllUsers().then(data => {
        setAllUsers(data);
    });
  }, [])  
  return (
    <div className='tableContainer'>
      
    <h1> Projekti </h1>
    <table className = 'content-table'>
    <thead>
        <tr>
            <td> Ime</td>
            <td> Skracenica</td>
            <td> Sajt</td>
            <td> Vidljivo</td>
            <td> Edit</td>
            
        </tr>
    </thead>
    <tbody>
     {users.map(user => (
        <tr key={user.id}>
            <td >{user.firstName}</td>
            <td> {user.lastName}</td>
            <td>{user.userRole}</td>
        </tr>  
      
    ))} 
  </tbody>
</table>
{newUserComponent ? (<RegisterNewUser setNewUserComponent={setNewUserComponent} setAllUsers={setAllUsers} />
) : (<button onClick={()=>setNewUserComponent(true)}> Dodaj novog korisnika</button>)}
</div>
    
  )
}

export default AllUsers