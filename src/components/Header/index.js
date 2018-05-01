import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { startAuthorization, requestLogout } from '../../actions'
//import { start } from 'repl';

class Header extends Component {
  constructor() {
    super();
    this.logoffFunction = this.logoffFunction.bind(this);
    this.authFunction = this.authFunction.bind(this);
  }
  authFunction(e) {
    e.preventDefault();
    this.props.startAuthorization();
  }

  logoffFunction(e) {
    //e.preventDefault();
    this.props.requestLogout();
  }

  render() {
    return (
      <Navbar> 
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">Kanban Board</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#" onClick={this.authFunction}>
            Login
          </NavItem>
          <NavItem eventKey={2} href="#" onClick={this.logoffFunction}>
            Logout
          </NavItem>
        </Nav>
        
      </Navbar>
    )
  }
}

const mapDispatchToProps = {
  startAuthorization,
  requestLogout
}

export default connect(null, mapDispatchToProps)(Header);
