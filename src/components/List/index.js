import React, { Component } from 'react';
import { connect } from 'react-redux';
import pick from 'lodash/fp/pick';
import map from 'lodash/fp/map';
import Panel from 'react-bootstrap/lib/Panel';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import AddTaskModal from '../AddTaskModal';
import './style.css';

class List extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }
  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  }
  render() {
    const { name, id, addNewTask, tasksData } = this.props;
    return (
      <div className="col-xs-3">
        <Panel>
          <Panel.Heading>
            {name}
            <div className="menu">
              <DropdownButton
                bsStyle="link"
                title={<FontAwesome name="bars" />}
              >
                <MenuItem eventKey="1" onClick={this.toggleModal}>Dodaj zadanie</MenuItem>
                <MenuItem eventKey="2">Edytuj</MenuItem>
              </DropdownButton>
            </div>
          </Panel.Heading>
          <Panel.Body>
            <ul>
              {map(task=>{
                return (
                  <li>{task.name}</li>
                );
              })(tasksData)}
            </ul>
          </Panel.Body>
        </Panel>
        <AddTaskModal listId={id} showModal={this.state.showModal} addNewTask={addNewTask} toggleModal={this.toggleModal}/>
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
