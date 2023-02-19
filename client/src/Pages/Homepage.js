
import React from 'react'
import Modal from '../Components/Modals/Modal'
import { useState } from 'react'
import "../css/homepage.css";

function Homepage() {
    const [isOpen, setIsOpen] = useState(false);   

    return (
    
    <div className='homepage'>
      {/* <h1> hey, click the button to open the modal.</h1>
      <button className='openModalBtn' onClick={()=> setIsOpen(true)}> Open</button>
      {isOpen && <Modal setIsOpen = { setIsOpen} />} */}
    </div>
  )
}

export default Homepage