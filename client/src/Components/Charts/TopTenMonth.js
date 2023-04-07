import React, { useEffect, useState } from 'react'
import { getTopTen } from '../../Actions/userActions';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material'


function TopTenMonth() {

    const [topUsers, setTopUsers] = useState([]);

    useEffect(()=>{
        getTopTen().then((data)=>{
            setTopUsers(data);
        })
    },[])

  return (
    <div className='HomepageContainer'>
        <h1>Top 10</h1>
        {topUsers.length===0 ? (
            <h3>-- trenutno niko nije aktivan --</h3>
        ):(
            <div className='rowContainer'>
            <div className= 'topUserContainer'>
                <img className="profilePic" src={`http://localhost:3001/${topUsers[0].pic}`} alt="profilna" />
                <h1>{topUsers[0].firstName} {topUsers[0].lastName}</h1>
                
            </div>
            <div className='tableTopUsers'>
                
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align="left">No.</TableCell>
            <TableCell align="left">Clan</TableCell>
            <TableCell align="left">Poeni</TableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
        {topUsers.map((user, index) => (
  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell align="left">{user.rank}</TableCell>
    <TableCell align="left">{user.firstName} {user.lastName}</TableCell>
    <TableCell align="left">{user.points}</TableCell>
  </TableRow>
))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
        </div>
        )}
        
    </div>
  )
}

export default TopTenMonth