import React, {Component} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import uniqueId from 'lodash/fp/uniqueId';
import { Field, reduxForm } from 'redux-form';
import FieldWithErrors from '../FieldWithErrors';
import { isNotEmpty, maxLength20, isNotPastDate } from '../../validation';

class EditListModal extends Component {
  render() {
    const { listId, showModal, editList, toggleModal, handleSubmit, reset } = this.props;
    const onSubmit = handleSubmit(data => {
      editList(listId, data);
      toggleModal();
      reset();
    });
    return (
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edycja listy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal onSubmit={onSubmit}>
            <Field
              label="Nazwa"
              name="name"
              component={FieldWithErrors}
              type="text"
              validate={[isNotEmpty, maxLength20]}
            />
            <Field
              label="Kolejność"
              name="order"
              component={FieldWithErrors}
              type="text"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSubmit} type="submit">Zatwierdź</Button>
          <Button onClick={toggleModal}>Anuluj</Button>
        </Modal.Footer>
      </Modal>
    );
  } 
};

export default reduxForm({
  form: 'editList',
  enableReinitialize: true,
})(EditListModal);
