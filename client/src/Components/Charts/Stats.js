import React, { useEffect, useState } from 'react'
import "../../css/common.css"
import { getUserStatistics } from '../../Actions/userActions';
import BarChart from './BarChart';
import LineChart from './LineChart';
import { pointsPerMonth } from '../../Actions/ActivityActions';



function Stats() {
  const [firstNumbers, setFirstNumbers] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [userData, setUserData] = useState({
    labels: ['Full', 'Beba', 'Obzerver'],
    datasets:[]
  });
  const [memberStatus, setMemberStatus] = useState({
    labels: ['Admin', 'Editor', 'None'],
    datasets: []
  });
    

  useEffect(()=>{
    getUserStatistics().then((data)=>{
      //console.log(data);
      //setUserData(data);
      //console.log(data);
      setMemberStatus({...memberStatus, 
        datasets: [{
          label: "Broj korisnika:",
          data: [data.userRoleCounts.adminCount, data.userRoleCounts.editorCount, data.userRoleCounts.noneCount],
          backgroundColor: ['#306FB4','#F2AA40','#86BD48']
        }]
      })
      setUserData({...userData, 
        datasets: [{
          label: "Statusi članova:",
          data: [data.memberStatusCounts.fullCount, data.memberStatusCounts.bebaCount, data.memberStatusCounts.obzerverCount],
          backgroundColor: ['#306FB4','#F2AA40','#86BD48']
        }]
        
      })
      setFirstNumbers({
        totalUsersCount: data.firstNumbers.totalUsersCount,
        totalMemberCount: data.firstNumbers.totalMemberCount,
        lastMonthCount: data.firstNumbers.lastMonthCount,
        lastYearCount: data.firstNumbers.lastYearCount
      })
      //console.log(data)
    })

    pointsPerMonth().then((data)=>{
      setActivityData(data);
    })
  },[])

  return (
    <div className='HomepageContainer' style={{ backgroundColor: 'white', alignContent: 'center', justifyContent: 'center', width: '100%' }}>
    <div className = 'StatCardContainer'>
      <div className='StatCard'>
        <h2>{firstNumbers.totalUsersCount}</h2>
        <h2>Profila</h2>
      </div>
      <div className='StatCard'>
      <h2>{firstNumbers.totalMemberCount}</h2>
        <h2>Članova</h2>
      </div>
      <div className='StatCard'>
      <h2>{firstNumbers.lastYearCount}</h2>
        <h2>Active last year</h2>
      </div>
    </div>
    <div className='chartContainer'>
      <BarChart  chartData={memberStatus} title = {"Ukupan broj naloga"} />
      <BarChart  chartData={userData} title = {"Odnos članova"} />
      {/* <PieChart  chartData={userData} title = {"Odnos članova"}/> */}
    </div>
    <div className='chartContainer' style = {{width:'100%', display:'flex', flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
    <LineChart style={{width:'100%'}} chartData={activityData} title = "Aktivnosti"/>
    </div>
  </div>

  )
}

export default Stats