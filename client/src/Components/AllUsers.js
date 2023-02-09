import React, {useState, useEffect } from 'react';
import { getAllUsers } from '../Actions/userActions';

function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(()=>{
    
    getAllUsers().then(data => {
        setAllUsers(data);
    });
  }, [])  
  return (
    <div className='EditableComponent'>AllUsers
    <table>
        <tbody>
        {allUsers.map(user => (
            <tr key={user.id}>
                <td >{user.email}</td>
                <td>{user.userRole}</td>
                <td>{user.firstName}</td>
                <td >{user.lastName}</td>
            </tr>  
          
        ))}
      </tbody>
    </table>
    
    </div>
    
  )
}

export default AllUsers