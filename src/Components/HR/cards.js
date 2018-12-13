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
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

import { DatePicker } from 'material-ui-pickers';
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
  textField1:{
    marginLeft:' -42%',
    //marginRight: theme.spacing.unit,
    width: 150,
  },
  textField:{
    marginLeft: theme.spacing.unit,
      //marginRight: theme.spacing.unit,
      width: 150,
    },

    smalltextField1: {
      marginLeft: '-23%',
      marginRight: theme.spacing.unit,
      width: 200,
    },
    smalltextField2: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
      left: '6%'
    },
    smalltextField3: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
     // width: 200,
      left: '12%',
      marginTop:'1%',
    

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
      this.handleCandidateEditcolse=this.handleCandidateEditcolse.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
          
        });
      };


      handleCandidateEditcolse(){
       
     //   alert('nass '+this.state.submmited)
        this.setState({
          submmited:false
      })
      }

      submit(){
     //   alert(new Date(this.state.monthyear).toUTCString())
      

var emp=[]
//alert(this.state.id)
var data= new Date(this.state.monthyear)
var month=data.toString().substring(4, 7)
var year=data.toString().substring(10, 15)

var monthyear=month+year

const db = firebase.firestore();

   db.collection("hr").where("employeeid", "==", this.state.id)
   .get()
   .then(function(querySnapshot) {
     console.log(querySnapshot.docs)
    if(querySnapshot.docs.length===0){
     alert('no record')
 
 
     
    }
       querySnapshot.forEach(function(doc) { 
      

       if(doc.data().startmonthyear===monthyear|| doc.data().endmonthyear===monthyear){
     var doccc=  doc.data()
       emp.push(doccc)
       var a = emp.indexOf(doccc);
      // alert(a)
      // alert(a)
       emp[a].identy = monthyear;
       //alert(emp)

       console.log(emp)
  //     }
       }else{
       // emp.push({identy: monthyear})
       }
       });
   })
 
   .catch(function(error) {
       console.log("Error getting documents: ", error);
   });
 





       //alert(monthyear)
setTimeout(()=>{


// if(emp.length !==0){
this.setState({
submmited:true,
arrays:emp,
}),console.log(emp)
// }

// else{
//   alert('no data')
// }
},3000)

// setTimeout(()=>{

// },4000)   
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
        <div>
      <TextField
       select
          id="standard-uncontrolled"
          label="name"
          defaultValue="foo"
          onChange={this.handleChange('id')}
         className={classes.smalltextField1}
          value={this.state.id}
       //   margin="normal"
       >
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
        value={this.monthyear}
       // margin="normal"
        className={classes.smalltextField2}
        InputLabelProps={{
          shrink: true,
        }}
      /> 

      

       <Button  className={classes.smalltextField3} onClick={this.submit} style={{color:'white',backgroundColor:'#0f0c2b'}} autoFocus>
                submit
                </Button>
                {this.state.submmited ? <Payslip open={this.state.submmited} handleClose={this.handleCandidateEditcolse} id={this.state.id} arrays={this.state.arrays} monthyear={this.state.monthyear} />: null}
</div>
      </CardContent>
       <CardActions>
       
        
      </CardActions> 
    </Card>


       
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




// <MuiPickersUtilsProvider utils={DateFnsUtils}>
// <DatePicker  value={this.monthyear}   margin="normal" className={classes.smalltextField2} onChange={this.handleChange('monthyear')} />

// </MuiPickersUtilsProvider>