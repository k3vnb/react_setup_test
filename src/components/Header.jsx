import React from 'react';
import { Link } from 'react-router-dom';

function Header(){
  return(
    <div>
      <h3>Help Me</h3>
      <Link to="/">Home</Link> | <Link to="/newticket">Create Ticket</Link>
    </div>
  );
}

export default Header;
