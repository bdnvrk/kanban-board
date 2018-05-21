import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import pick from 'lodash/fp/pick';
import map from 'lodash/fp/map';
import Panel from 'react-bootstrap/lib/Panel';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import AddTaskModal from '../AddTaskModal';
import EditListModal from '../EditListModal';
import Task from '../Task';
import './style.css';

class List extends Component {
  constructor() {
    super();
    this.state = {
      showAddModal: false,
      showEditModal: false,
    };
  }
  toggleAddModal = () => {
    this.setState(state => ({
      showAddModal: !state.showAddModal,
    }));
  }
  toggleEditModal = () => {
    this.setState(state => ({
      showEditModal: !state.showEditModal,
    }));
  }
  removeList = () => {
    const { removeListWithTasks, id, tasks } = this.props;
    removeListWithTasks(id, tasks);
  }
  render() {
    const { name, id, tasksData, order, connectDropTarget } = this.props;
    const maskClass = this.props.isOver ? 'mask isOver' : 'mask';
    return connectDropTarget(
      <div className="col-xs-3 list">
        <Panel>
          {this.props.canDrop && <div className={maskClass}></div>}
          <Panel.Heading>
            {name}
            {' '}
            <span className="counter">{this.props.tasks.length}</span>
            <div className="menu">
              <DropdownButton
                id="list-menu"
                bsStyle="link"
                title={<FontAwesome name="bars" />}
              >
                <MenuItem eventKey="1" onClick={this.toggleAddModal}>Dodaj zadanie</MenuItem>
                <MenuItem eventKey="2" onClick={this.toggleEditModal}>Edytuj</MenuItem>
                <MenuItem eventKey="3" onClick={this.removeList}>Usuń</MenuItem>
              </DropdownButton>
            </div>
          </Panel.Heading>
          <Panel.Body>
            <ul className="tasksList">
              {map(task => {
                return (
                  <Task
                    key={`task-${task.id}`}
                    id={task.id}
                    name={task.name}
                    priority={task.priority}
                    deadline={task.deadline}
                    removeSingleTask={this.props.removeSingleTask}
                    listId={id}
                    lists={this.props.lists}
                    moveTask={this.props.moveTask}
                  />
                );
              })(tasksData)}
            </ul>
          </Panel.Body>
        </Panel>
        <AddTaskModal 
          listId={id} 
          showModal={this.state.showAddModal} 
          addNewTask={this.props.addNewTask} 
          toggleModal={this.toggleAddModal}
        />
        {this.state.showEditModal && 
          <EditListModal 
            initialValues={{ name, order: order + 1 }} 
            listsNumber={this.props.listsNumber}
            listId={id} 
            showModal={this.state.showEditModal} 
            editList={this.props.editList} 
            toggleModal={this.toggleEditModal}
          />
        }
      </div>
    );
  }
}

const target = {
  drop(props, monitor) {
    const { moveTask, id } = props;
    const { taskId, currentListId } = monitor.getItem();

    moveTask(taskId, currentListId, id);
  },
  canDrop: (props, monitor) => {
    const { id } = props;
    const { currentListId } = monitor.getItem();

    return currentListId !== id;
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

const mapStateToProps = (state, props) => {
  return {
    tasksData: pick(props.tasks, state.tasks),
  };
}

const ConnectedComponent = connect(mapStateToProps)(List);

export default DropTarget(['TASK'], target, collect)(ConnectedComponent);