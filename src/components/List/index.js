import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { name, id, addNewTask, tasksData, tasks, editList, order, listsNumber } = this.props;
    return (
      <div className="col-xs-3 list">
        <Panel>
          <Panel.Heading>
            {name}
            {' '}
            <span className="counter">{tasks.length}</span>
            <div className="menu">
              <DropdownButton
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
                    name={task.name}
                    priority={task.priority}
                    deadline={task.deadline}
                  />
                );
              })(tasksData)}
            </ul>
          </Panel.Body>
        </Panel>
        <AddTaskModal 
          listId={id} 
          showModal={this.state.showAddModal} 
          addNewTask={addNewTask} 
          toggleModal={this.toggleAddModal}
        />
        {this.state.showEditModal && 
          <EditListModal 
            initialValues={{ name, order: order + 1 }} 
            listsNumber={listsNumber}
            listId={id} 
            showModal={this.state.showEditModal} 
            editList={editList} 
            toggleModal={this.toggleEditModal}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    tasksData: pick(props.tasks, state.tasks),
  };
}

export default connect(mapStateToProps)(List);
