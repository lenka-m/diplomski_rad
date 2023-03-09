import React from 'react'
import ProfileComponent from '../Components/ProfileComponent';
import AllActivitiesUser from '../Components/AllActivitiesUser';
import { Box, Tabs, Tab, Typography } from "@mui/material";
import NewActivity from '../Components/NewActivity';


function UserPage({loggedUser}) {
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
              <Box sx={{ p: 2 }}>
                {children}
              </Box>
            )}
          </div>
        );
      }
  return (
    <div className='ProfilePage'>
      
        <ProfileComponent loggedUser = {loggedUser}/>
        <div className='container'>
        <div className='tableContainer'>
        <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'whitesmoke',padding: '5px', borderRadius:'10px'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Sve aktivnosti" {...a11yProps(0)} />
                        <Tab label="Nova Aktivnost" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                <AllActivitiesUser loggedUser={loggedUser}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <NewActivity loggedUser={loggedUser}/>
                </TabPanel>
            </Box>
          </div>
          </div>
    </div>
  )
}

export default UserPage