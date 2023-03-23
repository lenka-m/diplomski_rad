
import React from 'react'
import { useState } from 'react'
import "../css/homepage.css";
import AllCallsActive from "../Components/AllCallsActive"
import TopTenMonth from '../Components/TopTenMonth';

function Homepage() {
    const [isOpen, setIsOpen] = useState(false);   

    return (
    
    <div className='homepage'>
      <AllCallsActive/>
      <TopTenMonth/>
    </div>
  )
}

export default Homepage