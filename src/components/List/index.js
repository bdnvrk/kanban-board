import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import './style.css';

const List = ({ name }) => (
  <div className="col-xs-3">
    <Panel>
      <Panel.Heading>
        {name}
        <div className="menu">
          <DropdownButton
            bsStyle="link"
            title={<FontAwesome name="bars" />}
          >
            <MenuItem eventKey="1">Dodaj zadanie</MenuItem>
            <MenuItem eventKey="2">Edytuj</MenuItem>
          </DropdownButton>
        </div>
      </Panel.Heading>
      <Panel.Body>Tutaj w przyszłości będziesz mógł dodawać taski</Panel.Body>
    </Panel>
  </div>
);

export default List;
