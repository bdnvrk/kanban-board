import React, { Component } from 'react';
import { Button, Modal, ControlLabel, FormGroup, FormControl, Col, Form } from 'react-bootstrap';

const AddTaskModal = ({ showModal, submitHandler, toggleModal }) => (
  <Modal show={showModal} onHide={toggleModal}>
    <Modal.Header closeButton>
      <Modal.Title>Dodaj nowe zadanie</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Nazwa
          </Col>
          <Col sm={9}>
            <FormControl type="text" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Opis
          </Col>
          <Col sm={9}>
            <FormControl componentClass="textarea" type="text" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Priorytet
          </Col>
          <Col sm={9}>
            <FormControl componentClass="select" type="text">
              <option value="select">Niski</option>
              <option value="other">Średni</option>
              <option value="other">Wysoki</option>
              <option value="other">Natychmiastowy</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Termin wykoniania
          </Col>
          <Col sm={9}>
            <FormControl type="date" />
          </Col>
        </FormGroup>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={submitHandler}>Dodaj</Button>
      <Button onClick={toggleModal}>Anuluj</Button>
    </Modal.Footer>
  </Modal>
);

export default AddTaskModal;