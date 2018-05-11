import React from 'react';
import { DropdownButton, MenuItem, Label } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import './style.css';

const Task = ({ name, priority, deadline }) => {
  return (
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
          <MenuItem eventKey="1" onClick={this.toggleEditModal}>Edytuj</MenuItem>
          <MenuItem eventKey="2" onClick={this.removeList}>Usuń</MenuItem>
          <MenuItem eventKey="3" onClick={this.removeList}>Przenieś</MenuItem>
        </DropdownButton>
      </div>
    </li>
  ); 
};

export default Task;