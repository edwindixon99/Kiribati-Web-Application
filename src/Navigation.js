import { NavLink } from 'react-router-dom';
import React from 'react';
import Authentication from './Authentication'
import {Nav, Navbar} from 'react-bootstrap';
import logo from "./Kiribati_National_Emblem.png"

const Navigation = () => (
  <div>
  <Navbar bg="light" variant="light" sticky="top" expand="lg">

    <Navbar.Brand><NavLink to='/' className="nav-link"><img src={logo} width="30" height="30" alt="" />Translations</NavLink></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <NavLink to='/kiribati' className="nav-link">Kiribati</NavLink>
        <NavLink to='/english' className="nav-link">English</NavLink>
      </Nav>
    {/* <Authentication /> */}
    </Navbar.Collapse>

  </Navbar>
  <br />
  </div>

   
  );

export default Navigation;
