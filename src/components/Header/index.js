import React from 'react';
import { Button, Navbar, Nav, NavItem } from 'react-bootstrap';

const Header = ({ authFunction, authorizedUser, logoffFunction }) => (
  <Navbar> 
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#home">Kanban Board</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="#" onClick={authFunction}>
        Login
      </NavItem>
      <NavItem eventKey={2} href="#" onClick={logoffFunction}>
        Logout
      </NavItem>
    </Nav>
    
  </Navbar>
);

export default Header;
