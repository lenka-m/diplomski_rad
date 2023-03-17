import React from "react";
import "../css/profile.css";
import ProfileComponent from '../Components/ProfileComponent'
import AllActivitiesEditor from "../Components/AllActivitiesEditor";
import { useEffect, useState } from "react";
import { searchTeams } from "../Actions/TeamActions";
import AllTasks from "../Components/AllTasks";
import { Box, Tabs, Tab } from "@mui/material";
import AllCallsEditor from "../Components/AllCallsEditor"

function EditorPage({loggedUser}){

    const [teams, setTeams] = useState([]);      // Svi timovi editor profila
    const [value, setValue] = React.useState(0); //Odnosi se na tab koji je otvoren.

    // Kad ucitavas komponentu, nadji prvo sve timove od korisnika:
    useEffect(()=>{
        searchTeams({coordinatorId: loggedUser.id}).then((data)=>{
          setTeams(data)          
        })
    }, [])

    // kada promeni tab, msenjaj komponentu u tabu:
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    // konfig tab komponente
    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

      // konfig tab komponente
      function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 2 }}>
                {children}
              </Box>
            )}
          </div>
        );
      }

    return(
        <div className="homepage">
            <ProfileComponent loggedUser={loggedUser} />
            <AllActivitiesEditor loggedUser={loggedUser} />
                <div className='HomepageContainer'>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor:'white'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Timovi" {...a11yProps(0)} />
                            <Tab label="Pozivi" {...a11yProps(1)} />
                            
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                    {teams.map((team) => (
                        <AllTasks team={team} key = {team.id}/>
                    ))}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <AllCallsEditor loggedUser={loggedUser}></AllCallsEditor>
                    </TabPanel>
                </Box>
                </div> 
            
            
        </div>
    )
}

export default EditorPage;
