import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startAuthorization, requestLogout, getDataFromDb } from '../../actions'
import { Navbar, Nav, NavItem, Button, Modal } from 'react-bootstrap';
import { addNewList, combineAddTask } from '../../actions';
import './style.css';

class Header extends Component {
  constructor() {
    super();
    this.logoffFunction = this.logoffFunction.bind(this);
    this.authFunction = this.authFunction.bind(this);
    this.getData = this.getData.bind(this);
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

  renderLoginButton() {
    return (
      <Button 
        onClick={this.authFunction}
        className="headerButton">
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

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  }

  getData(e){
    
    this.props.getDataFromDb();
  }

  addList = () => {
    const value = this.textInput.current.value;
    this.props.addNewList(value);
    this.toggleModal();
  }

  render() {
    const { isUserAuthorized, userName } = this.props;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Kanban Board</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">
              Link
            </NavItem>
            <NavItem eventKey={2} href="#">
              Link
            </NavItem>
          </Nav>
          
          <Nav pullRight className="headerForm">
            
            { isUserAuthorized ? this.renderLogutButton() : this.renderLoginButton() }
            {' '/* spacing between elements */}
            <Button 
              bsStyle="warning" 
              onClick={this.getData}>
                test
            </Button> 
            <Button 
              bsStyle="warning" 
              onClick={this.toggleModal}>
                Dodaj nową listę
            </Button>
          </Nav>
          <Nav pullRight>
            <Navbar.Text>
              { isUserAuthorized ? `Jesteś zalogowany jako: ${ userName }` : '' }
            </Navbar.Text>
          </Nav>
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
    userName: state.authorization.user.userData.displayName 
  }
)

const mapDispatchToProps = {
  addNewList,
  startAuthorization,
  requestLogout,
  getDataFromDb
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
