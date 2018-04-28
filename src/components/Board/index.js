import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/fp/map';
import { Button, Modal } from 'react-bootstrap';
import { addNewList } from '../../actions';
import List from '../List';
import Header from '../Header';
import './style.css';


class Board extends Component {
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
    const { lists } = this.props;
    return (
      <div className="container">
        <Header />
        <Button 
          bsStyle="primary" 
          onClick={this.toggleModal} 
          className="addItemButton">
            Dodaj nową listę
        </Button>
        <div className="row">
          {map(list => {
            return (
              <List key={list.id} name={list.name} />
            );
          })(lists)}   
        </div>

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

const mapStateToProps = (state) => ({
  lists: state.lists,
});

const mapDispatchToProps = {
  addNewList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
