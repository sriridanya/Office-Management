import React,{Component}from 'react';

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { NavLink } from 'react-router-dom'
///import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Login from '../../App'
import { Route} from 'react-router-dom';





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


class Signup extends Component {
    constructor(props){
      super(props);
      this.state={
      
      
      
    }
   
     }
   




   
     
            render() {
 
        const { classes } = this.props;
        return (
         <div style={{backgroundImage:"url('/Assets/240.jpg')" ,backgroundSize:'cover', width:'100%',height:'100vh',position:'relative'}}>
           <Card className={classes.card}
    >
      <div>
      <CardHeader className={classes.cardhead}
     title="welcome to zyudlylabs" 
 
    />
        <CardContent>
        <NavLink to='/login'>
        <Typography variant="h2" component="h5">
   Login 
     </Typography>

</NavLink>

 <Route  path='/' component={Login}/> 
  
   
   </CardContent>
</div>
</Card>

          </div>
        );
      }
    }
    

    export default  withStyles(styles)(Signup);






//     <Typography variant="h2" component="h5">
//     {this.state.email}
//     </Typography>

//     <TextField
//     id="standard-password-input"
//     label="Password"
//    // className={classes.textField}
//    value={this.state.password}
//    onChange={this.handleChange('password')}
//     type="text"
//     autoComplete="current-password"
//     margin="normal"
//   />
//   <br/>
//   <br/>
//   <Button variant="contained" style={{color:'white',backgroundColor:'#0f0c2b'}} onClick={this.handleSignin} >
//   Default
// </Button>