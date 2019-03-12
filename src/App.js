import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import './App.css';
// import ResponsiveDrawer from './Components/ResponsiveDrawer/ResponsiveDrawer';
import Login from './Components/Login/Login';
import * as firebase from 'firebase'
import ResponsiveDrawer from './Components/ResponsiveDrawer1/drawer';
import lottie from 'lottie-web'
import Signup from './Components/signup/signup'
import { Route, Switch } from 'react-router-dom';
import Acknoweldgement from './Components/signup/acknoweldgement'
//import {connect} from 'react-redux';
// import * as firbase from "firebase"
//import Admin from './Components/admin/admin'

class App extends Component {
  ref=null
  constructor(props) {
    super(props);

    this.state = { login:false,progress:true,id:''};
  this.signin=this.signin.bind(this);
  this.signout=this.signout.bind(this);
  }
  componentWillMount(){
    var _this=this






    setTimeout(()=>{
    _this.setState({progress:false});

    },2000)
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
  //   console.log(user.uid)
     
        _this.setState({login:true,id:user.uid});
      } else {
        // No user is signed in.
       
        _this.setState({login:false});
      }
    });


  
}

componentDidMount(){
  var _this=this
  lottie.loadAnimation({
    container: _this.ref, // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/material_wave_loading.json' // the path to the animation json
  });
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
    
const props=this.props


    return (
      <BrowserRouter >
       
        <div className="App">
        <Switch>
        <Route  path='/signup/:id' render= {(props)=><Signup {...props} />}/> 
        <Route  path='/acknoweldgement' render= {(props)=><Acknoweldgement {...props} />}/> 
         {this.state.progress ?<div> <div style={{align:'center',height:'100vh'}} ref={ref =>this.ref=ref}/></div>: this.state.login ? <ResponsiveDrawer {...props} onlogout={()=>{this.signout()}}/> : <div> <Login {...props} onsubmit={()=>{this.signin()}}/></div>}    

       </Switch>
           
        </div>
      </BrowserRouter>
    );
  }
}


 
export default  App
