import * as React from 'react';
import ProfileComponent from "../Components/ProfileComponent";
import AllUsers from "../Components/All/AllUsers";
import Stats from "../Components/Charts/Stats"
import "../css/profile.css";
import AllProjekti from "../Components/All/AllProjekti";
import AllTeams from "../Components/All/AllTeams";
import AllActivitiesAdmin from "../Components/All/AllActivitiesAdmin";
import { Box, Tabs, Tab } from "@mui/material";


function AdminPage({loggedUser}){
    

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
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
              <Box sx={{ p: 4 }}>
                {children}
              </Box>
            )}
          </div>
        );
      }
    return(
       <div className="homepage">

            <ProfileComponent loggedUser={ loggedUser}/>
            <AllActivitiesAdmin loggedUser = {loggedUser}/>
            
            <div className='HomepageContainer'>
            
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white', padding:'3px', marginBottom:'25px',borderRadius:'10px'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Analitika" {...a11yProps(0)} />
                        <Tab label="Korisnici" {...a11yProps(1)} />
                        <Tab label="Projekti" {...a11yProps(2)} />
                        <Tab label="Timovi" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Stats></Stats>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AllUsers loggedUser={loggedUser} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <AllProjekti />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <AllTeams />
                </TabPanel>
                
            </Box>
            </div>

       </div>
    )
}
export default AdminPage;