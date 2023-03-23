import React, { useEffect, useState } from 'react'
import { getTopTen } from '../Actions/userActions';

function TopTenMonth() {

    const [topUsers, setTopUsers] = useState([]);

    useEffect(()=>{
        getTopTen().then((data)=>{
            setTopUsers(data);
            console.log(data);
        })
    },[])

  return (
    <div className='HomepageContainer'>
        <h1>Top 10 bestovaca u poslednjih mesec dana</h1>


        {topUsers.length===0 ? (
            <p>ne</p>
        ):(
            <div className='rowContainer'>
            <div className= 'topUserContainer'>
                <img className="profilePic" src={`http://localhost:3001/${topUsers[0].pic}`} alt="profilna" />
                <h1>{topUsers[0].firstName} {topUsers[0].lastName}</h1>
                
            </div>
            <div className='tableTopUsers'>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Broj poena</th>
                        </tr>
                    </thead>
                    
                    {topUsers.map((user)=>{
                        return(
                        <tr key={user.rank}>
                            <td>{user.rank}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.points}</td>
                        </tr>
                        )
                    })}

                    
                </table>
            </div>
        </div>
        )}
        
    </div>
  )
}

export default TopTenMonth