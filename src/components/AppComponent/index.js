import React, { Component } from 'react';
import * as firebase from 'firebase'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../../reducers';
import Board from '../Board';
import Header from '../Header';
import Footer from '../Footer';

const store = createStore(rootReducer, composeWithDevTools());

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

  componentDidMount() {
    this.firebaseDatabaseConnectionTest()
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <Board />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default AppComponent;
