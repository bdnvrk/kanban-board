import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Button} from 'react-bootstrap';
import { startAuthorization, requestLogout } from '../../actions'
import './style.css';

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
    e.preventDefault();
    this.props.requestLogout();
  }  

  renderLoginButton() {
    return (
      <Button onClick={this.authFunction}>
        Zaloguj
      </Button>
    );
  }

  renderLogutButton() {
    return (
      <Button onClick={this.logoffFunction}>
        Wyloguj
      </Button>
    );
  }

  render() {
    const { isUserAuthorized, userName } = this.props;
    return (
      <Navbar> 
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">Kanban Board</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullRight>
            { isUserAuthorized ? this.renderLogutButton() : this.renderLoginButton() }
          </Navbar.Form>
          <Navbar.Text pullRight>
            { isUserAuthorized ? `Jesteś zalogowany jako: ${ userName }` : '' }
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
const mapStateToProps = (state) => (
  {
    isUserAuthorized: state.authorization.user.loggedIn,
    userName: state.authorization.user.userData.displayName 
  }
)

const mapDispatchToProps = {
  startAuthorization,
  requestLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
