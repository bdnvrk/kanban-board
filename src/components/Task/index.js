import React, { Component } from 'react';
import { DropdownButton, MenuItem, Label } from 'react-bootstrap';
import { DragSource } from 'react-dnd';
import FontAwesome from 'react-fontawesome';
import MoveTaskModal from '../MoveTaskModal';
import './style.css';

class Task extends Component {
  constructor() {
    super();
    this.state = {
      showMoveModal: false,
    }
  }
  toggleMoveModal = () => {
    this.setState(state => ({
      showMoveModal: !state.showMoveModal,
    }));
  }
  remove = () => {
    const { removeSingleTask, id, listId } = this.props;

    removeSingleTask(id, listId);
  }
  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <li className="task">
        <div className="data">
          <h3>{this.props.name}</h3>
          <span className="priority">Priorytet: {this.props.priority}</span><br />
          <Label bsStyle="default">{this.props.deadline}</Label>
        </div>
        <div className="menu">
          <DropdownButton
            id="task-menu"
            bsStyle="link"
            title={<FontAwesome name="pencil" />}
          >
            <MenuItem eventKey="1" onClick={() => {}}>Edytuj</MenuItem>
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
          taskId={this.props.id}
        />
      </li>
    );
  }
};

const boxSource = {
	beginDrag(props) {
		return {
			taskId: props.id,
      currentListId: props.listId,
		}
	},
}

const collect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
});

export default DragSource('TASK', boxSource, collect)(Task);