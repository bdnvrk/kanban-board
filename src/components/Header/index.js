import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { startAuthorization, requestLogout,logOut } from '../../actions'

class Header extends Component {
  constructor() {
    super();
    this.logoffFunction = this.logoffFunction.bind(this);
    this.authFunction = this.authFunction.bind(this);
  }
  authFunction (e) {
    const { dispatch } = this.props;
    e.preventDefault();

    dispatch(startAuthorization())
  }

  logoffFunction(e) {
    const { dispatch } = this.props;
    e.preventDefault();

    dispatch(logOut);
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

export default connect()(Header);
