import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
import get from 'lodash/fp/get';
import { startAuthorization, requestLogout, toggleFilter } from '../../actions'
import { addNewList } from '../../actions';
import get from 'lodash/fp/get';
import './style.css';

class Header extends Component {
  constructor() {
    super();
    this.logoffFunction = this.logoffFunction.bind(this);
    this.textInput = React.createRef();
    this.state = {
      showModal: false,
    };
  }
  authFunction(e) {
    e.preventDefault();
    this.props.startAuthorization();
  }

  logoffFunction(e) {
    e.preventDefault();
    this.props.requestLogout();
  }  

  renderLogutButton() {
    return (
      <Button onClick={this.logoffFunction}>
        Wyloguj
      </Button>
    );
  }

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  }

  addList = () => {
    const value = this.textInput.current.value;
    this.props.addNewList(value);
    this.toggleModal();
  }

  renderTopPanelFunctions = () => {
    const { isUserAuthorized, userName } = this.props;

    if ( isUserAuthorized ) {
      return (
        <React.Fragment>
          <Nav pullLeft className="headerForm">
            <Button 
              bsStyle={this.props.filterEnabled ? 'warning' : 'default'}
              onClick={this.props.toggleFilter}>
                Pokaz moje zadania
            </Button>
            <Button 
              bsStyle="warning" 
              onClick={this.toggleModal}>
                Dodaj nową listę
            </Button>
          </Nav>
          <Nav pullRight className="headerForm">
            {this.renderLogutButton()}
          </Nav>
          <Nav pullRight className="userInfo">
            <Navbar.Text>
              { isUserAuthorized ? `Jesteś zalogowany jako: ${ userName }` : '' }
            </Navbar.Text>
          </Nav>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Kanban Board</a>
            </Navbar.Brand>
          </Navbar.Header>
          {this.renderTopPanelFunctions()}  
        </Navbar>
        
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Podaj nazwę listy</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input ref={this.textInput} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.addList}>Dodaj</Button>
            <Button onClick={this.toggleModal}>Anuluj</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = (state) => (
  {
    isUserAuthorized: state.authorization.user.loggedIn,
    userName: get('authorization.user.userData.displayName')(state),
    filterEnabled: state.filterEnabled,
  }
);

const mapDispatchToProps = {
  addNewList,
  startAuthorization,
  requestLogout,
  toggleFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
