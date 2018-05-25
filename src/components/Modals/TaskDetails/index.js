import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import priorityItems from '../../../constants/priorityItems';
import getLabelFromValue from '../../../helperFunctions/getLabelFromValue';

class TaskDetailsModal extends Component {
  getUser = () => {
    const { user, users } = this.props;
    return users[user];
  }
  render() {
    const { showModal, toggleModal } = this.props;
    return (
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Przypisane do: </strong>
            {this.getUser()}
          </p>
          <p>
            <strong>Priorytet: </strong>
            {getLabelFromValue(this.props.priority, priorityItems)}
          </p>
          <p>
            <strong>Data wykonania: </strong>
            {this.props.deadline}
          </p>
          <p>
            <strong>Szczegółowy opis zadania: </strong> <br />
            {this.props.description}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={toggleModal}>Zamknij</Button>
        </Modal.Footer>
      </Modal>
    );
  } 
};

export default TaskDetailsModal;
