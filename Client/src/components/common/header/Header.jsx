import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Head from "./Head";
import { useUser } from "../../../src/UserContext"; // Adjust the path as needed
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const { user, setUser } = useUser(); // Destructure setUser for logout functionality

  // Inside your Header component or wherever you implement the logout functionality
const logout = () => {
  console.log("Logging out");
  setUser(null); // Reset user state in context
  localStorage.removeItem('user'); // Clear user from localStorage
  navigate('/'); // Navigate to homepage or login page
};


  console.log("Header Component Rendered");
  if (user) {
    console.log("Current User:", user); // Log user object if it exists
    console.log("User Name:", user.name); // Log user's name to console
    console.log("User Role:", user.role); // Log user's role to console
  }

  // Inside your Header component or wherever you implement the logout functionality


  return (
    <>
      <Head />
      <header>
        <nav className="flexSB">
          <ul className={click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/courses'>All Courses</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/team'>Team</Link></li>
            {!user && <li><Link to='/login'>Login</Link></li>}
            {!user && <li><Link to='/signup'>Sign Up</Link></li>}
            <li><Link to='/contact'>Contact</Link></li>
            {user && <li><button onClick={logout}>Logout</button></li>} {/* Logout button */}
          </ul>
          {user ? (
            <div className='start'>
              {/* Display user's name and role */}
              <div className='button'>Hello, {user.name} ({user.role})</div>
            </div>
          ) : (
            <div className='start'>
              {/* Show this div only if user is not logged in */}
              <div className='button'>GET CERTIFICATE</div>
            </div>
          )}
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
