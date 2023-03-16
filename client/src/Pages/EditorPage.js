import "../css/profile.css";
import ProfileComponent from '../Components/ProfileComponent'
import AllActivitiesEditor from "../Components/AllActivitiesEditor";
import { useEffect, useState } from "react";
import { searchTeams } from "../Actions/TeamActions";
import AllTasks from "../Components/AllTasks";
import { Box, Tabs, Tab } from "@mui/material";
import NewCall from "../Components/NewCall";
import AllCallsEditor from "../Components/AllCallsEditor";

function EditorPage({loggedUser}){

    const [teams, setTeams] = useState([]);

    useEffect(()=>{
        searchTeams({coordinatorId: loggedUser.id}).then((data)=>{
          setTeams(data)          
        })
    }, )

    return(
        <div className="homepage">
            <ProfileComponent loggedUser={loggedUser} />
            <AllActivitiesEditor loggedUser={loggedUser} />
                <div className='container'>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'rgba(0,0,0,0.15)'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Tim" {...a11yProps(0)} />
                            <Tab label = "Nov poziv" {...a11yProps(2)}/>
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        {teams.map((team) => (
                          <AllTasks team={team} key={team.id}/>
                        ))}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                          <AllCallsEditor loggedUser = {loggedUser}/>
                    </TabPanel>
                </Box>
                </div> 
            
            
        </div>
    )
}

export default EditorPage;
