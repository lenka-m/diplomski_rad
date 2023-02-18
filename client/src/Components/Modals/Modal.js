import React from 'react'
import '../../css/modal.css'
function Modal({setIsOpen}) {
  return (
    <div className='modalBackground' >
        <div className = "modalContainer">
            <div className='modalTitleCloseBtn'>
                <button onClick={()=>{setIsOpen(false)}}> X</button>
            </div>
            <div className='modalTitle'>
                <h1>Are you sure you want to continue?</h1>
            </div>
            <div className='modalBody'>
                <p>The nex page is awesome. You should move forward. You will Enjoy it</p>
            </div>
            <div className='modalFooter'>
                <button onClick={()=>{setIsOpen(false)}}> Cancel</button>
                <button> Continue</button>
            </div>

        </div>
    </div>
  )
}

export default Modal 