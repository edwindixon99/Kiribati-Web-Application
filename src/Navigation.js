import { NavLink } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import Authentication from './Authentication'


const responseGoogle = (response) => {
  console.log("Hello")
  console.log(response);
  console.log(response.dt.Ot);
}


const Navigation = () => (
    <nav>
      <ul>
        <li><NavLink to='/kiribati'>Kiribati</NavLink></li>
        <li><NavLink to='/english'>English</NavLink></li>
        <li><NavLink to='/register'>Register</NavLink></li>
      </ul>
      <Authentication />
    </nav>
  );

export default Navigation;