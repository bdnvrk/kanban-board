import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../../reducers';
import Board from '../Board';
import Header from '../Header';
import Footer from '../Footer';

const logger = createLogger();
const middleware = applyMiddleware(thunk, logger); 

const store = createStore(
  rootReducer,
  composeWithDevTools(middleware)
);

class AppComponent extends Component {
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
