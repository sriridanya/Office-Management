import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase'






import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';


import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger'
import ReduxThunk from 'redux-thunk' 

import postReducer from './Components/reducer/postReducer'
var config = {
   

    // Initialize Firebase
    
      // apiKey: "AIzaSyBEtlkAT899IYBDDdq5Zr9WizhhBtd-QVE",
      // authDomain: "firstproject-1d257.firebaseapp.com",
    //gopi  // databaseURL: "https://firstproject-1d257.firebaseio.com",
      // projectId: "firstproject-1d257",
      // storageBucket: "firstproject-1d257.appspot.com",
      // messagingSenderId: "290507534180"
    



      
        apiKey: "AIzaSyCuhZFjg_2-kyk0_JmnRypBjBMT49VrT_I",
        authDomain: "office-management-c1c61.firebaseapp.com",
        databaseURL: "https://office-management-c1c61.firebaseio.com",
        projectId: "office-management-c1c61",
        storageBucket: "",
        messagingSenderId: "52748314353"
      


  };





  firebase.initializeApp(config);
  

  const middleware= [ReduxThunk];
  if(process.env.NODE_ENV !== 'production')
  {
      middleware.push(createLogger());
  }
  
  
  const store = createStore(postReducer,composeWithDevTools(
      applyMiddleware(...middleware),
  ));
  
  


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();




// calender-http://intljusticemission.github.io/react-big-calendar/examples/index.html#popup