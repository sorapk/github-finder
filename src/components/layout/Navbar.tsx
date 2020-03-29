import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const redirect_uri = 'http://localhost:3000/callback';
  return (
    <nav className='navbar bg-primary blue'>
      <h1>
        <i className='fab fa-github'></i> Github Finder
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
