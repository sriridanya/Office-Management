import React, { Component } from 'react';
//import Calendar from 'react-calendar';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import moment from "moment";
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import "react-datepicker/dist/react-datepicker.css";
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Cookies from 'js-cookie';
import * as firebase from 'firebase';

const empolyeename=[
{
  
        value: 'hr-admin',
        label: 'hr-admin',
      },
      {
        value: 'arun',
        label: 'arun',
      },

]
const styles =  {
  root:{
    // height:'100%',
    // paddingBottom:"50%"
  },
  card:{
    width:'35%',
    height:"80%",
    position:'fixed',
    left:'30%',
 
  },

  container: {
    width:'500px',
    color:'red',
  }
  ,fromdate:{
    width:'100%'

  },
  type:{
    color:"red",
    float:'left'
  },
  type1:{
    color:"red",
    float:'center',
    marginLeft:'10px'
  }
}


 
class MyApp extends Component {
  constructor(props) {
    super(props)
  this.state = {
    title:'',
    Reason:'',
    startDate: moment(),
    enddate:moment(),
    
  }
  //this.onChange=this.onChange.bind(this)
  this.onChange1=this.onChange1.bind(this)
  this.onChange2=this.onChange2.bind(this)
  this.procced=this.procced.bind(this)
  this.handleChange = this.handleChange.bind(this);
  this.handleChange1 = this.handleChange1.bind(this);
}


onChange1(e){
  this.setState({ title:e.target.value })
}


componentWillMount(){

 
 
 
  var db=firebase.firestore()



  //alert( Cookies.get('token'))
  
  
  
      var c;
      db.collection("zyudlyemployee").where("employee_id", "==", Cookies.get('token'))
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            //alert(doc.data().emp_name)
              c=doc.data().emp_name
                      
               });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      })
  
      setTimeout(() => {
        this.setState({
          title:c
        })
     
      },2000)
}



onChange2(e){
  this.setState({ Reason:e.target.value })
}


handleChange(date) {

  this.setState({
    startDate: date
  });
  alert(this.state.startDate)
}


handleChange1(date) {
 
  this.setState({
    enddate: date
  });

  alert(this.state.enddate)
}


procced()
{


 
  const db = firebase.firestore();
  // const settings = {/* your settings... */ timestampsInSnapshots: true};
  //        db.settings(settings);
  var addDoc = db.collection('hr').doc();


var empnew=  addDoc.set({
  title: this.state.title,
 start: this.state.startDate.toString(),
 end:this.state.enddate.toString(),
 allDay:true,
 description:this.state.Reason,
 id:addDoc.id,
 employeeid:Cookies.get('token'),
 status:''
 
  
 });

 

}
  render() 
 
  {
    const { classes } =this.props;
    return (
      <div className={classes.root}>
       


        <Card  className={classes.card}>
      <CardContent>
      <Typography variant="title" align="center" color="primary"
      
      >
          leave form
        </Typography>
          <div className={classes.type1}>
        {/* <TextField
          id="outlined-with-placeholder"
          label="empolyeename"
          placeholder="Placeholder"
          className={classes.textField}
          onChange={this.onChange1}
          margin="normal"
          value={this.state.message}
          variant="outlined"
          
        /> */}


          {/* <TextField
           id="outlined-with-placeholder"
            select
            label="empolyeename"
            onChange={this.onChange1}
            name="empolyeename"
            value={this.state.message}
            validators={['required']}
            errorMessages={['this field is required']}
            className={classes.smalltextField}
            // InputProps={{
            //   startAdornment: <InputAdornment position="start"></InputAdornment>,
            // }}
             >
             {empolyeename.map(option => (
            <MenuItem key={option.value} value={option.value}>
             {option.label}
            </MenuItem>
          ))}
       
            </TextField> */}
        </div>
        <br/>
        <div className={classes.fromdate}>
        <div className={classes.type}>
        <Typography className={classes.pos}  variant="title" color="textSecondary">
          fromdate
        </Typography>
        </div>
        <div className={classes.type1}>
         <DatePicker
         
        selected={this.state.startDate}
        onChange={this.handleChange}
        dateFormat="DD-MMM YYYY"
        utcOffset={-4}
        todayButton="Today in Puerto Rico"
        
      />
           
       </div>
      </div>
      <br/>
      <br/>
      <br/>
      <div className={classes.fromdate}>
      <div className={classes.type}>
        <Typography className={classes.pos}  variant="title" color="textSecondary">
          todate
        </Typography>
        </div>
        <div className={classes.type1}>
          <DatePicker
        selected={this.state.enddate}
        onChange={this.handleChange1}
        dateFormat="DD-MMM YYYY"
        utcOffset={-4}
        todayButton="Today in Puerto Rico"
      />
      
        </div>
        </div>
        <br/>
        <br/>

         <TextField
          id="outlined-multiline-static"
          label="Reason"
          multiline
          rows="4"
          value={this.state.Reason}
          onChange={this.onChange2}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
            
            <br/>
        <br/>
        <Button variant="contained" color="secondary" onClick={this.procced} className={classes.button}>
        Secondary
      </Button>
      
      </CardContent>
    </Card>
    </div>
        
     
    );
  }
}



MyApp.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default  withStyles(styles)(MyApp)