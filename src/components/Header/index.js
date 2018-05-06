import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addNewList } from '../../actions';
import './style.css';

class Header extends Component {
  constructor() {
    super();
    this.textInput = React.createRef();
    this.state = {
      showModal: false,
    };
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
  render() {
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
          <Nav pullRight>
            <Button 
              bsStyle="warning" 
              onClick={this.toggleModal} 
              className="addItemButton">
                Dodaj nową listę
            </Button>
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

const mapDispatchToProps = {
  addNewList,
}

export default connect(null, mapDispatchToProps)(Header);
