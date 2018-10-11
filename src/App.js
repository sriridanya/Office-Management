import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import './App.css';
// import ResponsiveDrawer from './Components/ResponsiveDrawer/ResponsiveDrawer';
import Login from './Components/Login/Login';
import * as firebase from 'firebase'
import ResponsiveDrawer from './Components/ResponsiveDrawer/ResponsiveDrawer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { login:false};
  this.signin=this.signin.bind(this);
  this.signout=this.signout.bind(this);
  }
  
  signin(){
  this.setState({login:true});


    
  }
  signout = ()=>{
 firebase.auth().signOut()
    this.setState({login:false});
    console.log('hello');
  }

  render() {
    return (
      <BrowserRouter >
        <div className="App">
      {/* {this.state.login ? <ResponsiveDrawer onLogout={()=>{this.signout()}}/> : <div> <Login onSubmit={()=>{this.signin()}}/></div>} */}
         <ResponsiveDrawer/>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
