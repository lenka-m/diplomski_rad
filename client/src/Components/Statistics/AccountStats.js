import React from 'react'

function AccountStats() {
  return (
    <div className = 'numberStats'>
            <div className='topNum'>
                <h1> 56</h1>
                <p> Naloga</p>
            </div>
            <div className='bottomNum' >
                <h3> 1</h3>
                <p>Admin</p>
            </div>
            <div className='bottomNum'>
                <h3> 5</h3>
                <p>Editor</p>
            </div>
            <div className='bottomNum'>
                <h3> 4</h3>
                <p>User</p>
            </div>
            
        </div>
  )
}

export default AccountStats