import { NavLink } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import Authentication from './Authentication'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';



const responseGoogle = (response) => {
  console.log("Hello")
  console.log(response);
  console.log(response.dt.Ot);
}


const Navigation = () => (
  <div>
  <Navbar bg="light" variant="light">
    <Container>
    <Navbar.Brand href="#home"><img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Kiribati_National_Emblem.png" width="30" height="30" class="d-inline-block align-top" alt="" />Translations</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <NavLink to='/kiribati' className="nav-link">Kiribati</NavLink>
        <NavLink to='/english' className="nav-link">English</NavLink>
        <NavLink to='/register' className="nav-link">Register</NavLink>
      </Nav>
    <Authentication />
    </Navbar.Collapse>
    </Container>
  </Navbar>
  <br />
  </div>

   
  );

export default Navigation;




// <nav className="navbar navbar-expand-lg navbar-light bg-light">
// <a className="navbar-brand" href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Kiribati_National_Emblem.png" width="30" height="30" class="d-inline-block align-top" alt="" />Translations</a>
// <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//   <span className="navbar-toggler-icon"></span>
// </button>
// <div className="collapse navbar-collapse" id="navbarNav">
//   <ul className="navbar-nav">
//     <li className="nav-item active">
//       <NavLink to='/kiribati' className="nav-link">Kiribati</NavLink>
//     </li>
//     <li className="nav-item">
//       <NavLink to='/english' className="nav-link">English</NavLink>
//     </li>
//     <li className="nav-item">
//       <NavLink to='/register' className="nav-link">Register</NavLink>
//     </li>
//   </ul>
//   <ul className="navbar-nav ms-auto">
//     <li className="nav-item active">
//       <Authentication />
//     </li>
//   </ul>
// </div>
// </nav>

{/* <nav className="navbar navbar-light bg-light">
<a className="navbar-brand" href="#" >
  <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
  Bootstrap
</a>
<div class="collapse navbar-collapse" id="navbarNav">
<ul class="navbar-nav">
<li className="nav-item"><NavLink to='/kiribati' className="nav-link">Kiribati</NavLink></li>
<li className="nav-item"><NavLink to='/english' className="nav-link">English</NavLink></li>
<li className="nav-item"><NavLink to='/register' className="nav-link">Register</NavLink></li>
</ul>
</div>
</nav> */}