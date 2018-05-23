import React, {Component} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import FieldWithErrors from '../FieldWithErrors';
import { isNotEmpty, maxLength20, isNotPastDate } from '../../validation';

class AddTaskModal extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.showModal !== nextProps.showModal) {
      this.props.initialize();
    }
  }
  getUsersList = () => {
    const { users } = this.props;
    return Object.keys(users).map(user => (
      <option value={user}>{users[user]}</option>
    ));
  }
  render() {
    const { showModal, toggleModal, handleSubmit, listId, reset, combineAddTask } = this.props;
    const onSubmit = handleSubmit(data => {
      const taskId = window.getTaskId();
      
      combineAddTask(listId, taskId, data)
      toggleModal();
      reset();
    });
    return (
      <form onSubmit={onSubmit}>
        <Modal show={showModal} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Dodaj nowe zadanie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <Field
                label="Nazwa"
                name="name"
                component={FieldWithErrors}
                type="text"
                validate={[isNotEmpty, maxLength20]}
              />
              <Field
                label="Opis"
                name="description"
                component={FieldWithErrors}
                componentClass="textarea"
                type="text"
                validate={[isNotEmpty]}
              />
              <Field
                label="Priorytet"
                name="priority"
                component={FieldWithErrors}
                componentClass="select"
                type="text"
                validate={[isNotEmpty]}
              >
                <option value="">Wybierz</option>
                <option value="low">Niski</option>
                <option value="medium">Średni</option>
                <option value="high">Wysoki</option>
                <option value="urgent">Natychmiastowy</option>
              </Field>
              <Field
                label="Termin wykoniania"
                name="deadline"
                component={FieldWithErrors}
                type="date"
                validate={[isNotEmpty, isNotPastDate]}
              />
              <Field
                label="Przypisz do"
                name="user"
                component={FieldWithErrors}
                componentClass="select"
                type="text"
                validate={[isNotEmpty]}
              >
                <option value="">Wybierz</option>
                {this.getUsersList()}
              </Field>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onSubmit} type="submit">Dodaj</Button>
            <Button onClick={toggleModal}>Anuluj</Button>
          </Modal.Footer>
        </Modal>
      </form>
    );
  } 
};

export default reduxForm({
  form: 'newTaskData',
  enableReinitialize: true,
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
})(AddTaskModal)
