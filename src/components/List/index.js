import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';

const Column = () => (
  <div className="col-xs-3">
    <Panel>
      <Panel.Heading>Nazwa kolumny</Panel.Heading>
      <Panel.Body>Tutaj w przyszłości będziesz mógł dodawać taski</Panel.Body>
    </Panel>
  </div>
);

export default Column;