import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppComponent from './components/AppComponent';
import * as firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppComponent />, document.getElementById('root'));
registerServiceWorker();
