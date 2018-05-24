import React, { Component } from 'react';
import { DropdownButton, MenuItem, Label, Button } from 'react-bootstrap';
import { DragSource } from 'react-dnd';
import FontAwesome from 'react-fontawesome';
import MoveTaskModal from '../Modals/MoveTask';
import EditTaskModal from '../Modals/EditTask';
import TaskDetailsModal from '../Modals/TaskDetails';
import priorityItems from '../../constants/priorityItems';
import getLabelFromValue from '../../helperFunctions/getLabelFromValue';
import './style.css';

class Task extends Component {
  constructor() {
    super();
    this.state = {
      showMoveModal: false,
      showEditModal: false,
      showDetailsModal: false,
    };
  }
  toggleMoveModal = () => {
    this.setState(state => ({
      showMoveModal: !state.showMoveModal,
    }));
  }
  toggleEditModal = () => {
    this.setState(state => ({
      showEditModal: !state.showEditModal,
    }));
  }
  toggleDetailsModal = () => {
    this.setState(state => ({
      showDetailsModal: !state.showDetailsModal,
    }));
  }
  remove = () => {
    const { combineRemoveSingleTask, id, listId } = this.props;

    combineRemoveSingleTask(id, listId);
  }
  render() {
    const { connectDragSource, taskData } = this.props;
    return connectDragSource(
      <li className="task">
        <div className="data">
          <h3>{taskData.name}</h3>
          <span className="priority">
            Priorytet: {getLabelFromValue(taskData.priority, priorityItems)}
          </span><br />
          <Label bsStyle="default">{taskData.deadline}</Label>
        </div>
        <div className="menu">
          <Button bsStyle="link" onClick={this.toggleDetailsModal}>
            <FontAwesome name="file" />
          </Button>
          <DropdownButton
            id="task-menu"
            bsStyle="link"
            title={<FontAwesome name="pencil" />}
          >
            <MenuItem eventKey="1" onClick={this.toggleEditModal}>Edytuj</MenuItem>
            <MenuItem eventKey="2" onClick={this.remove}>Usuń</MenuItem>
            <MenuItem eventKey="3" onClick={this.toggleMoveModal}>Przenieś</MenuItem>
          </DropdownButton>
        </div>
        <TaskDetailsModal 
          showModal={this.state.showDetailsModal} 
          toggleModal={this.toggleDetailsModal}
          users={this.props.users}
          {...taskData}
        />
        <MoveTaskModal 
          showModal={this.state.showMoveModal} 
          toggleModal={this.toggleMoveModal}
          lists={this.props.lists}
          moveTask={this.props.moveTask}
          currentListId={this.props.listId}
          taskId={taskData.id}
        />
        {this.state.showEditModal && 
          <EditTaskModal 
            initialValues={taskData} 
            showModal={this.state.showEditModal} 
            toggleModal={this.toggleEditModal}
            editTask={this.props.editTask}
            taskId={taskData.id}
            users={this.props.users}
          />
        }
      </li>
    );
  }
};

const boxSource = {
  beginDrag(props) {
    return {
      taskId: props.taskData.id,
      currentListId: props.listId,
    }
  },
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default DragSource('TASK', boxSource, collect)(Task);
