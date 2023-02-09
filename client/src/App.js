
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Homepage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import { UserContext } from './Hooks/UserContext';

import {  useState } from 'react';


function App() {

  const [user,setUser] = useState(null);

  

  return (
    <Router>
      <div className='App'>
      <UserContext.Provider value = {{user, setUser}}>
        <Navbar value = {{user}}/>
      </UserContext.Provider>
        <Switch>
          <Route exact path="/">
            <Homepage/>
          </Route>
          <UserContext.Provider value = {{user, setUser}}>  
         {user ? (
            <Route exact path="/profile">
              <ProfilePage/>
            </Route>
         ) : (
            <Route exact path="/login">
              <LoginPage/>
            </Route>
         )}          
          </UserContext.Provider>
        </Switch>      
      </div>
    </Router>
  );
}

export default App;
