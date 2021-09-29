import { NavLink } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';


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
      <GoogleLogin
    clientId="236247714069-pie6693vletboqghfvdptc2tmenva2al.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
    </nav>
  );

export default Navigation;