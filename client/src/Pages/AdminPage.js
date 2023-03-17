import * as React from 'react';
import ProfileComponent from "../Components/ProfileComponent";
import AllUsers from "../Components/AllUsers";
import "../css/profile.css";
import AllProjekti from "../Components/AllProjekti";
import AllTeams from "../Components/AllTeams";
import AllActivitiesAdmin from "../Components/AllActivitiesAdmin";
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
              <Box sx={{ p: 3 }}>
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
                <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white', padding:'7px', borderRadius:'10px'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Korisnici" {...a11yProps(0)} />
                        <Tab label="Projekti" {...a11yProps(1)} />
                        <Tab label="Timovi" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <AllUsers loggedUser={loggedUser} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AllProjekti />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <AllTeams />
                </TabPanel>
            </Box>
            </div>

       </div>
    )
}
export default AdminPage;