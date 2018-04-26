import React, { Component } from 'react';
import * as firebase from 'firebase'
import './style.css';

class AppComponent extends Component {

  constructor() {
    super()
    this.state = {
      isConnected: false
    }
  }
  firebaseDatabaseConnectionTest() {
    /* 
      Connection checking function
      TODO: remove in future
    */
    const fireDatabase = firebase.database();
    fireDatabase.ref('/testValue')
      .once('value')
      .then((snapshot) => {
        if (snapshot.val() !== '') {
          this.setState({
            isConnected: true
          })
        }
      })
  }

  render() {
    if (!this.state.isConnected) {
      this.firebaseDatabaseConnectionTest()
    }
    
    return (
      <div className="App">
        {this.state.isConnected ? 'connected' : 'not connected'}
      </div>
    );
  }
}

export default AppComponent;
