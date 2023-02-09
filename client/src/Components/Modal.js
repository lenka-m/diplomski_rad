import React from 'react'
import "../css/modal.css"
import {ImCancelCircle} from "react-icons/im"

function Modal({closeModal, text}) {
  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <div className='modalHeader'>
                <h1>Login uspešan</h1>
                <button  className='CancelButton' onClick={()=> closeModal(false)}><ImCancelCircle className='icon' /></button>
            </div>
            <div className='modalBody'>
                <p>{text} </p>
            </div>
            <div className='modalFooter'>
                <button onClick = {()=> closeModal(false)}>Ok</button>                
            </div>
        </div>
    </div>
  )
}

export default Modal