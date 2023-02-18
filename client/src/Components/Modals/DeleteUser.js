import React from 'react'
import { deleteUser, getAllUsers } from '../../Actions/userActions';
import '../../css/modal.css'
function DeleteUser({setIsOpen, user, setAllUser}) {

    function handleDeleteUser(){
        try{
          deleteUser(user.id).then(
              getAllUsers().then(data=>{
                setAllUser(data);
              })
          )
         // console.log("obrisan");
        } catch(ex){
            console.log(ex);
        }
      }
  return (
    <div className='modalBackground' >
        <div className = "modalContainer">
            <div className='modalTitleCloseBtn'>
                <button onClick={()=>{setIsOpen(false)}}> X</button>
            </div>
            <div className='modalTitle'>
                <h1>Da li ste sigurni da zelite da obrisete korisnika: {user.email}</h1>
            </div>
            <div className='modalFooter'>
                <button onClick={()=>{setIsOpen(false)}}> Cancel</button>
                <button onClick = {(e)=> {handleDeleteUser()}}> Continue</button>
            </div>

        </div>
    </div>
  )
}

export default DeleteUser 