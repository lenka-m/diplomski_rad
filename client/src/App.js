import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Homepage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import { getUser } from './Actions/userActions';
import {  useEffect, useState } from 'react';

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    
    if (token) {
        getUser().then((data) => {
        setLoggedUser(data)
      });
    } 
  }, []);
  
  return (
    <Router>
      <div className='App'>
        <Navbar loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          {loggedUser ? (
            <Route exact path="/profile">
              <ProfilePage loggedUser={loggedUser}/>
            </Route>
          ) : (
            <Route exact path="/login">
              <LoginPage loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
            </Route>
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
