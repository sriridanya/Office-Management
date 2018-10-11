import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase'
var config = {
    apiKey: "AIzaSyBBaglVBECx-bqKyG7u4wu6HSFN0m0WVfw",
    authDomain: "office-management-e5ec6.firebaseapp.com",
    databaseURL: "https://office-management-e5ec6.firebaseio.com",
    projectId: "office-management-e5ec6",
    storageBucket: "office-management-e5ec6.appspot.com",
    messagingSenderId: "413843782944"
  };
  firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
