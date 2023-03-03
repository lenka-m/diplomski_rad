import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../Actions/userActions';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../css/navbar.css';
import logoPhoto from "../img/transparent_logo.png";

function Navbar({loggedUser, setLoggedUser}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setLoggedUser(null);
  };

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <header>
      <img src={logoPhoto}></img>
     
      {loggedUser ? (
        <nav className={`navbarLinks ${isVisible ? 'active' : ''}`}>
          <Link className={`navbarLink ${isVisible ? 'active' : ''}`} to="/">
            Homepage
          </Link>
          <Link className={`navbarLink ${isVisible ? 'active' : ''}`} to="/profile">
            ProfilePage
          </Link>
          <Link className={`navbarLink ${isVisible ? 'active' : ''}`} to="/" onClick={handleLogout}>
            Logout
          </Link>
        </nav>
      ) : (
        <nav className={`navbarLinks ${isVisible ? 'active' : ''}`}>
          <Link className={`navbarLink ${isVisible ? 'active' : ''}`} to="/">
            Homepage
          </Link>
          <Link className={`navbarLink ${isVisible ? 'active' : ''}`} to="/login">
            Login
          </Link>
        </nav>
      )}
      <button className="nav-btn" onClick={handleToggle}>
        {isVisible ? <FaTimes /> : <FaBars />}
      </button>
      <style>{
                `.navbarLink.active {
                    display: flex;
                    }`
            }</style>
    </header>
  );
}

export default Navbar;
