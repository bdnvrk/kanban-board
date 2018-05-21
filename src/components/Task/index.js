import React, { Component } from 'react';
import { DropdownButton, MenuItem, Label } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import EditTaskModal from '../EditTaskModal';
import './style.css';

class Task extends Component {
  constructor() {
    super();
    this.state = {
      showEditModal: false,
    };
  }
  toggleEditModal = () => {
    this.setState(state => ({
      showEditModal: !state.showEditModal,
    }));
  }
  remove = () => {
    const { combineRemoveSingleTask, id, listId } = this.props;

    combineRemoveSingleTask(id, listId);
  }
  render() {
    const { name, priority, deadline, description, editTask, id } = this.props;
    return(
      <li className="task">
        <div className="data">
          <h3>{name}</h3>
          <span className="priority">Priorytet: {priority}</span><br />
          <Label bsStyle="default">{deadline}</Label>
        </div>
        <div className="menu">
          <DropdownButton
            id="task-menu"
            bsStyle="link"
            title={<FontAwesome name="pencil" />}
          >
            <MenuItem eventKey="1" onClick={this.toggleEditModal}>Edytuj</MenuItem>
            <MenuItem eventKey="2" onClick={this.remove}>Usuń</MenuItem>
            <MenuItem eventKey="3" onClick={() => {}}>Przenieś</MenuItem>
          </DropdownButton>
        </div>
        {this.state.showEditModal && 
          <EditTaskModal 
            initialValues={{ name, priority, deadline, description }} 
            showModal={this.state.showEditModal} 
            toggleModal={this.toggleEditModal}
            editTask={editTask}
            taskId={id}
          />
        }
      </li>
    );
  }
};

export default Task;