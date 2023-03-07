import React from "react";
import "../css/profile.css";
import ProfileComponent from '../Components/ProfileComponent'
import AllActivitiesEditor from "../Components/AllActivitiesEditor";
import { useEffect, useState } from "react";
import { searchTeams } from "../Actions/TeamActions";
import AllTasks from "../Components/AllTasks";
import { Box, Tabs, Tab } from "@mui/material";
import NewTaskEditor from "../Components/NewTaskEditor";

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
        <div className="ProfilePage">
            <ProfileComponent loggedUser={loggedUser} />

            <AllActivitiesEditor loggedUser={loggedUser} />


            {teams.map((team) => (
                <div className='container' key={team.id}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'rgba(0,0,0,0.15)'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Tim" {...a11yProps(0)} />
                            <Tab label="Novi task" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <AllTasks team={team} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <NewTaskEditor team = {team}/>
                    </TabPanel>
                </Box>
                </div> 
            ))}
            
        </div>
    )
}

export default EditorPage;
