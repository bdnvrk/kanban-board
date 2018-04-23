import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppComponent from './components/AppComponent';
import * as firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';

const config = {
    apiKey: "AIzaSyBl7153mvyfsFiPSkmrfvwwpr_YrdyrFxE",
    authDomain: "kanban-board-spa.firebaseapp.com",
    databaseURL: "https://kanban-board-spa.firebaseio.com",
    projectId: "kanban-board-spa",
    storageBucket: "",
    messagingSenderId: "687381495033"
  };

firebase.initializeApp(config);

ReactDOM.render(<AppComponent />, document.getElementById('root'));
registerServiceWorker();
