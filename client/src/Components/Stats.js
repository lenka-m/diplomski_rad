import React from 'react'
import "../css/common.css"
import MemberStats from './Statistics/MemberStats'
import AccountStats from './Statistics/AccountStats'
function Stats() {
  return (
    <div className='container'>
        <MemberStats/>
        <AccountStats/>
    </div>
  )
}

export default Stats