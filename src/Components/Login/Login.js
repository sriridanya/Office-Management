import React,{Component}from 'react';
import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import compose from 'recompose/compose'
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types'
import * as firebase from 'firebase'
import {withRouter} from "react-router-dom";

import Drawer from '../ResponsiveDrawer1/drawer';
import Cookies from 'js-cookie';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
const styles = theme => ({
    card: {
      width: 400,

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform:' translate(-50%, -50%)'
  
    //   backgroundColor:'red'bind(this));
    },
    cardhead:{
        
        backgroundColor:' #ef7254'
    },
    button: {
        margin: theme.spacing.unit,
      },
      input: {
        display: 'none',
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
   
  });
class Login extends Component {
constructor(props){
  super(props);
  this.state={
    errormsg:'',
    error:'',
  email:'',
  password:'',
 
  
  
}
this.handleChange = this.handleChange.bind(this);
this.handleSignin = this.handleSignin.bind(this);
 }

 handleChange = name => event => {
 
    this.setState({
      [name]: event.target.value,
    });
  };

  // componentWillMount() {
  //   this.setState  ({ userId: cookie.load('userId') })
  // }
 

  
  
 handleSignin(){

  Cookies.set('email',this.state.email);
  Cookies.set('password',this.state.password);


// console.log(this.state.username)
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((ss) => {
      console.log("this my console"+ss.user.uid)
      // this.setState({ login:true });
      Cookies.set('token',ss.user.uid);
      this.props.onsubmit();
      this.props.history.push("/"); 
      // console.log('hai')
     
    }).catch(function(error) {
      // Handle Errors here.
    this.setState({error:error.code})
      var errorMessage = error.message;
      // ...
      if (this.state.error === 'auth/user-not-found') {
        this.setState({errormsg:'Invalid user name or password',email:'',password:''},() => {
          setTimeout(() => this.setState({ errormsg:'' }), 4000);})
        }
        if (this.state.error === 'auth/wrong-password') {
          this.setState({errormsg:'Invalid password try again',email:'',password:''},() => {
            setTimeout(() => this.setState({ errormsg:'' }), 4000);})
          }
     
        
      //   console.log(this.state.errormsg);
      // console.log(this.state.error);
      // console.log(errorMessage);
    }.bind(this));
    // console.log(this.state.email,this.state.password)
   
  }
 
render() {
  
    const { classes } = this.props;
    return (
      <div style={{backgroundImage:"url('/Assets/240.jpg')" ,backgroundSize:'cover', width:'100%',height:'100vh',position:'relative'}}>
        <Card className={classes.card}
        >
          <div>
          <CardHeader className={classes.cardhead}
         title="Login" 
     
        />
        <CardContent>
        <ValidatorForm
              ref="form"
              onSubmit={this.handleSignin}
            >
             <TextValidator

          name="user-email"
          label="Email"
          onChange={this.handleChange('email')}
          value={this.state.email}
          validators={['required', 'isEmail']}
          errorMessages={['this field is required', 'email is not valid']}
          className={classes.textField}
          margin="normal"
          />

           <TextValidator

          name="user-password"
          label="Password"
          onChange={this.handleChange('password')}
          value={this.state.password}
          validators={['required', ]}
          errorMessages={['this field is required']}
          className={classes.textField}
          margin="normal"
          type="password"
          />
             <br/>
             <p style={{color:'red'}}>  {this.state.errormsg}</p>
  
   <Button variant="contained" style={{color:'white',backgroundColor:'#0f0c2b'}} className={classes.button} onClick={this.handleSignin}>Signin</Button> 
            </ValidatorForm>
           
             </CardContent>
         </div>
         </Card>
      </div>
    );
  }
}


Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

  
  export default compose(
   
    withRouter, withStyles(styles),
  )(Login);
  