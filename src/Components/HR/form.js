import React, { Component } from 'react';
// import empdata from '../employeedata'
// import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';
import compose from 'recompose/compose'
import PropTypes, { array } from 'prop-types';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import * as firebase from 'firebase';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  textField1: {
    //marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    //width: 200,
  },
  dense: {
    marginTop: 19,
  },
  smalltextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }

});
// const db = firebase.firestore();

class BasicEdit extends Component {
  constructor(props) {
    super(props)
   // alert(props.datas.start)
    this.state = {

      start: props.datas.start,
      end: props.datas.end,
      monthyear:'',
      id:'',
      reason:'',
      array:props.array,
      submmited: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      
    });
  };


  componentWillMount(){
    console.log(this.props.update)
  }

  handleSubmit() {




    

   // alert(this.state.id)
  var  emp_name
  //var color
var hh=this.props.posts1.zyudlyemployee
hh.filter((doc)=>{

if(doc.employee_id==this.state.id){
  emp_name=doc.emp_name
}


})


const db = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true};
//        db.settings(settings);
var addDoc = db.collection('hr').doc();
var month=this.state.start.toString().substring(3, 7)
var year=this.state.start.toString().substring(10, 15)


var empnew=  addDoc.set({
title: emp_name,
start: this.state.start.toString(),
end:this.state.end.toString(),
allDay:true,
description:this.state.reason,
id:addDoc.id,
employeeid:this.state.id,
monthyear:month+year,
style: {
  backgroundColor: 
       "#ad4ca4"
      
}
})
return empnew.then(res => {
 
  setTimeout(()=>{
    
    this.setState({
    reason:'',
     id:''
    }),
    swal("record added successfully", "", "success"),
    this.props.update()
  },2000)
  
})


//alert(emp_name)
    // console.log(this.props.Id.uid);
    // var db = firebase.firestore();
    // var basicRef = db.collection('zyudlyemployee').doc(this.props.Id.uid);
    // var updateMany = basicRef.update({
    //   emp_name: this.state.name,
    //   email: this.state.email,
    //   mobile: this.state.mobile
    // });
    // // [END update_document_many]
  
    // return updateMany.then(res => {
    //   console.log('Update: ', res);
    
    //   this.setState({ submitted: true }, () => {
    //     setTimeout(() => this.setState({ submitted: false })
    //     , 5000);
    //   });
    // })

   
  }
componentDidMount(){

//alert(this.props.array)
  // Set the 'capital' field of the city
 

 
  
}
  render() {
     // alert(this.state.emp_name)
    const { fullScreen } = this.props;
    const { classes } = this.props;
    const { submitted } = this.state;
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.open}
          // onClose={()=>{
          //   console.log(this.state.open)
          //   this.setState({open:false})
          // }}
          onClose={this.props.handleClose}

          aria-labelledby="responsive-dialog-title"
          key={this.state.id}
        >
          <DialogTitle id="responsive-dialog-title">Leave Apply</DialogTitle>
          <DialogContent>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
            >


            <TextValidator
             select
             name="employee-name"
             label="Name"
            onChange={this.handleChange('id')}
             margin="normal"
             value={this.state.id}
            className={classes.textField}>
             {this.state.array.map(option => (
            <MenuItem key={option.value}  value={option.value}>
             {option.label}
             </MenuItem>
                ))}
      </TextValidator>

      <br/>
              <TextValidator
                name="reason"
                label="reason"
                value={this.state.reason}
                onChange={this.handleChange('reason')}
           
                // validators={['required', 'isEmail']}
                // errorMessages={['this field is required', 'email is not valid']}
                className={classes.textField}
                margin="normal"
              />
            
<br/>
              <Button className={classes.textField1} style={{color:'white',backgroundColor:'#0f0c2b'}}  type="submit"
                disabled={submitted}
              >  {
                  (submitted && 'Project is submitted')
                  || (!submitted && 'Submit')
                }
              </Button>
              <Button  className={classes.textField1} style={{color:'white',backgroundColor:'#0f0c2b'}}  onClick={this.props.handleClose} color="primary" autoFocus>
                Cancel
                </Button>


            </ValidatorForm>
          </DialogContent>



        </Dialog>
      </div>
    );
  }

}


// const array=(props)=>{
//     return alert(this.props)
// }




const mapStateToPropss = (state) => {


// var c=[]
//     state.zyudlyemployee.map((s)=>{
//         //alert(s.emp_name)
//         c.push({
//            value:s.emp_name ,
//             label:s.emp_name
//         })
//         console.log(c)
//     })
    // alert(state.zyudlyemployee)
    return {
    posts1: state,
   
    }
    }

BasicEdit.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};
//   const comp1 =withMobileDialog()(BasicEdit);
//   const comp2 =withStyles(styles)(BasicEdit);
export default  compose(
    connect(mapStateToPropss),  withStyles(styles),
  withMobileDialog(),
)(BasicEdit);


