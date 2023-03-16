
import React from 'react'
import Modal from '../Components/Modals/Modal'
import { useState } from 'react'
import "../css/homepage.css";
import AllCallsActive from "../Components/AllCallsActive"

function Homepage() {
    const [isOpen, setIsOpen] = useState(false);   

    return (
    
    <div className='homepage'>
      <AllCallsActive/>
    </div>
  )
}

export default Homepage