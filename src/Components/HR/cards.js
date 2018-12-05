import React, { Component } from 'react';
//import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextValidator  from 'react-material-ui-form-validator';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Payslip from './payslip'
import {connect} from 'react-redux';
import * as firebase from 'firebase';

import * as firbase from "firebase"
const styles = theme=>({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textField:{
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});



class SimpleCard extends Component {
    constructor(props) {
      super(props)
   // alert(props.array)
      this.state = {
        id:'',
        monthyear:'',
        arrays:[],
        payslip:false,
       
        submmited: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.submit = this.submit.bind(this);
      this.handleClose=this.handleClose.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
          
        });
      };


      handleClose(){
       
        this.setState({
        payslip:false
      })
      }

      submit(){


   
var emp=[]
        //alert(this.state.id)
       var data= new Date(this.state.monthyear)
       var month=data.toString().substring(3, 7)
       var year=data.toString().substring(10, 15)

       var monthyear=month+year

       // alert(this.state.id)
 
        
        const db = firebase.firestore();
        db.collection("hr").where("employeeid", "==", this.state.id).where('monthyear', "==", monthyear)
        .get()
        .then(function(querySnapshot) {
          console.log(querySnapshot.docs)
         if(querySnapshot.docs.length===0){
        //  alert('no record')
         }
            querySnapshot.forEach(function(doc) { 
            // alert(doc.data())
            // console.log(doc.data())
            emp.push(doc.data())
           
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });



               //alert(monthyear)
setTimeout(()=>{
  var _this=this
  _this.setState({
  payslip:true,arrays:emp
})
},3000)
        
      }
    
    
    
      // componentWillMount(){

      //   setTimeout(()=>{
      //     this.setState({
      //       array:this.props.array
      //     })
      //   },2000)
       
      // }

      

    render() {
        const { classes } = this.props;

  return (
    <div>   
       <Card className={classes.card}>

   
      <CardContent>
      <TextField
       select
          id="standard-uncontrolled"
          label="name"
          defaultValue="foo"
          onChange={this.handleChange('id')}
          className={classes.textField}
          value={this.state.id}
          margin="normal">
             {this.props.array.map(option => (
            <MenuItem key={option.value} value={option.value}>
             {option.label}
            </MenuItem>
          ))}
          </TextField>

      <TextField
        id="date"
        label="month"
        type="month"
        onChange={this.handleChange('monthyear')}
        Value={this.monthyear}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />

       <Button  className={classes.textField} onClick={this.submit} style={{color:'white',backgroundColor:'#0f0c2b'}} autoFocus>
                submit
                </Button>
               

      </CardContent>
       <CardActions>
       
        
      </CardActions> 
    </Card>


 {this.state.payslip ? <Payslip open={this.state.payslip} id={this.state.id} arrays={this.state.arrays} handleClose={this.handleClose}/>: null}
    </div>

  );
}
}
SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};




const mapStateToPropss = (state) => {
  var c=[]
  state.zyudlyemployee.map((s)=>{
      //alert(s.emp_name)
      c.push({
         value:s.employee_id ,
          label:s.emp_name
      })
    //  console.log(c)
  })
  // alert(state.zyudlyemployee)
  return {
  posts1: state,
  array:c
  }
  }

export default connect(mapStateToPropss)(withStyles(styles)(SimpleCard));