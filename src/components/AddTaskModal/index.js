import React from 'react';
import { Button, Modal, ControlLabel, FormGroup, Col, Form } from 'react-bootstrap';
import uniqueId from 'lodash/fp/uniqueId';
import { Field, reduxForm } from 'redux-form'

const AddTaskModal = ({ showModal, addNewTask, toggleModal, handleSubmit, listId, reset }) => {
  const toggle = () => {
    toggleModal();
    reset();
  };
  const onSubmit = handleSubmit(data => {
    const taskId = uniqueId('task_');
    addNewTask(listId, taskId, data);
    toggle();
  });
  return (
    <form onSubmit={onSubmit}>
      <Modal show={showModal} onHide={toggle}>
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
                <Field
                  name="name"
                  component="input"
                  type="text"
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Opis
              </Col>
              <Col sm={9}>
                <Field
                  name="description"
                  component="textarea"
                  type="text"
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Priorytet
              </Col>
              <Col sm={9}>
                <Field
                  name="priority"
                  component="select"
                  type="text"
                >
                  <option value="low">Niski</option>
                  <option value="medium">Średni</option>
                  <option value="high">Wysoki</option>
                  <option value="urgent">Natychmiastowy</option>
                </Field>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Termin wykoniania
              </Col>
              <Col sm={9}>
                <Field
                  name="deadline"
                  component="input"
                  type="date"
                />
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSubmit} type="submit">Dodaj</Button>
          <Button onClick={toggle}>Anuluj</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Podaj nazwę taska'
  }
  if (!values.description) {
    errors.name = 'Wypełnij opis taska'
  }
  if (!values.priority) {
    errors.name = 'Wybierz priorytet'
  }
  if (!values.deadline) {
    errors.name = 'Wybierz datę realizacji'
  }
  return errors
}

export default reduxForm({
  form: 'newTaskData',
  validate
})(AddTaskModal)
