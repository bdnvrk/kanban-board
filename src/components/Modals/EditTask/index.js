import React, {Component} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import FieldWithErrors from '../../FieldWithErrors';
import { isNotEmpty, maxLength30 } from '../../../validation';
import priorityItems from '../../../constants/priorityItems';

class EditTaskModal extends Component {
  getUsersList = () => {
    const { users } = this.props;
    return Object.keys(users).map(user => (
      <option key={user} value={user}>{users[user]}</option>
    ));
  }
  render() {
    const { showModal, editTask, toggleModal, handleSubmit, taskId } = this.props;
    const onSubmit = handleSubmit(data => {
      editTask(taskId, data);
      toggleModal();
    });
    return (
      <form onSubmit={onSubmit}>
        <Modal show={showModal} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edytuj zadanie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <Field
                label="Nazwa"
                name="name"
                component={FieldWithErrors}
                type="text"
                validate={[isNotEmpty, maxLength30]}
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
                {priorityItems.map(item => (
                  <option value={item.value}>{item.label}</option>
                ))}
              </Field>
              <Field
                label="Termin wykoniania"
                name="deadline"
                component={FieldWithErrors}
                type="date"
                validate={[isNotEmpty]}
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
            <Button onClick={onSubmit} type="submit">Zapisz</Button>
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
})(EditTaskModal)
