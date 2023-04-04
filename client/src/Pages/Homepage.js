
import React from 'react'
import { useState } from 'react'
import "../css/homepage.css";
import AllCallsActive from '../Components/All/AllCallsActive'
import TopTenMonth from '../Components/Charts/TopTenMonth';


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