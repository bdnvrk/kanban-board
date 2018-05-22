import React, {Component} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import FieldWithErrors from '../FieldWithErrors';
import { isNotEmpty, maxLength20 } from '../../validation';

class EditTaskModal extends Component {
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
                validate={[isNotEmpty]}
              />
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