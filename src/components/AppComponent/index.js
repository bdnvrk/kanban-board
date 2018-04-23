import React, { Component } from 'react';
import * as firebase from 'firebase'
import './style.css';

class AppComponent extends Component {

  constructor() {
    super()
    this.state = {
      connectionStatus: 'notConnected'
    }
  }
  firebaseDatabaseConnectionTest() {
    /* 
      Connection checking function
    */
    const fireDatabase = firebase.database();
    fireDatabase.ref('/testValue')
      .once('value')
      .then((snapshot) => {
        this.setState({
          connectionStatus: snapshot.val()
        })
      })
  }

  render() {
    this.firebaseDatabaseConnectionTest()

    return (
      <div className="App">
        {this.state.connectionStatus}
      </div>
    );
  }
}

export default AppComponent;
