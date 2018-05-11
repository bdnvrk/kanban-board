import React, { Component } from 'react';
import { DropdownButton, MenuItem, Label } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import './style.css';

class Task extends Component {
  remove = () => {
    const { removeSingleTask, id, listId } = this.props;

    removeSingleTask(id, listId);
  }
  render() {
    const { name, priority, deadline } = this.props;
    return(
      <li className="task">
        <div className="data">
          <h3>{name}</h3>
          <span className="priority">Priorytet: {priority}</span><br />
          <Label bsStyle="default">{deadline}</Label>
        </div>
        <div className="menu">
          <DropdownButton
            bsStyle="link"
            title={<FontAwesome name="pencil" />}
          >
            <MenuItem eventKey="1" onClick={() => {}}>Edytuj</MenuItem>
            <MenuItem eventKey="2" onClick={this.remove}>Usuń</MenuItem>
            <MenuItem eventKey="3" onClick={() => {}}>Przenieś</MenuItem>
          </DropdownButton>
        </div>
      </li>
    );
  }
};

export default Task;