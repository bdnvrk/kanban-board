import React from 'react';
import { ControlLabel, FormGroup, Col, FormControl } from 'react-bootstrap';
import './style.css';

const FieldWithErrors = ({ input, label, type, meta, componentClass, children }) => {
  const { touched, error } = meta;
  const showErrors = touched && error; 
  
  return (
    <FormGroup validationState={showErrors ? 'error' : undefined}>
      <Col componentClass={ControlLabel} sm={3}>
        {label}
      </Col>
      <Col sm={9}>
        <FormControl {...input} componentClass={componentClass} type={type}>
          {children}
        </FormControl>
        {showErrors && <FormControl.Feedback />}
        {showErrors && <span className="error">{error}</span>}
      </Col>
    </FormGroup>
  );
};

export default FieldWithErrors;
