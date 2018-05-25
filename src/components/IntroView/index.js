import React from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import './style.css';
const IntroView = ({ authFunction }) => {

  return (
    <div className="container">
      <div className="row">
        <div className="intro-view col-xs-6 col-xs-offset-2">
          <h1>Witaj w aplikacji Kanban Board</h1>
          <p>Aby kontynuować nalezy się zalogować za pomocą konta Google</p>
          <Button className="login-btn" onClick={authFunction}>
            Zaloguj&nbsp;
            <FontAwesome name="google"/>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default IntroView;
