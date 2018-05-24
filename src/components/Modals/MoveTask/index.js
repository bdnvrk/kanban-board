import React, {Component} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import FieldWithErrors from '../../FieldWithErrors';
import { isNotEmpty } from '../../../validation';

class MoveTaskModal extends Component {
  getOptions = () => {
    const { lists, currentListId } = this.props;
    const filteredIds = lists.filter(list => list.id !== currentListId);

    return filteredIds.map(list =>
      <option key={list.id} value={list.id}>{list.name}</option>
    );
  }
  render() {
    const { showModal, toggleModal, handleSubmit, moveTask, currentListId, taskId } = this.props;
    const onSubmit = handleSubmit(data => {
      moveTask(taskId, currentListId, data.listId);
    });
    return (
      <form onSubmit={onSubmit}>
        <Modal show={showModal} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Przenieś zadanie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <Field
                label="Przenieś do"
                name="listId"
                component={FieldWithErrors}
                componentClass="select"
                type="text"
                validate={[isNotEmpty]}
              >
                <option value="">Wybierz</option>
                {this.getOptions()}
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
})(MoveTaskModal)
