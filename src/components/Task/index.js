import React, { Component } from 'react';
import { DropdownButton, MenuItem, Label } from 'react-bootstrap';
import { DragSource } from 'react-dnd';
import FontAwesome from 'react-fontawesome';
import MoveTaskModal from '../MoveTaskModal';
import EditTaskModal from '../EditTaskModal';
import './style.css';

class Task extends Component {
  constructor() {
    super();
    this.state = {
      showMoveModal: false,
      showEditModal: false,
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
          <span className="priority">Priorytet: {taskData.priority}</span><br />
          <Label bsStyle="default">{taskData.deadline}</Label>
        </div>
        <div className="menu">
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
