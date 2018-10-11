import React, { Component } from 'react';
// import empdata from '../employeedata'
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
// import Typography from '@material-ui/core/Typography';
import compose from 'recompose/compose'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import TextField from '@material-ui/core/TextField';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import AddIcon from '@material-ui/icons/Add';
import withMobileDialog from '@material-ui/core/withMobileDialog';
// import AddIcon from '@material-ui/icons/Add';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dropzone from 'react-dropzone';
import * as firebase from 'firebase';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  smalltextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  button: {
    margin: theme.spacing.unit,
  },

});

class EmployeeAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
    emp_name: "",
      address: "",
      uid: "",
      email:"",
      img:[],
      mobile:"",
     
      filesToBeSent:[],
      uploadedFileSrc: '',
      submitted: false,
      
      submmited: false,
    
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
 
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmit() {
    if (this.state.uploadedFile === '') {
        alert("Upload a img to save")
      }
      else {
        var db = firebase.firestore();
        var addDoc = db.collection('employeelist').doc();
      var empnew=  addDoc.set({
            emp_name: this.state.emp_name,
            email: this.state.email,
            mobile:this.state.mobile,
            address:this.state.address,
            img:'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg',
            uid:addDoc.id
          });
        console.log(empnew);
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false, emp_name: '', email: '', mobile: '', address: '', experience: '',img:''}), 5000);
    });
}
  }
  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Accepted files: ', acceptedFiles[0].name);
    var img=this.state.img;
    img.push(acceptedFiles);
    this.setState({img,uploadedFileSrc:acceptedFiles[0].name}); 
}
  render() {
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
          key={this.props.Id}
          aria-labelledby="responsive-dialog-title"

        >
          <DialogTitle id="responsive-dialog-title">Add Employee Details</DialogTitle>
          <DialogContent>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
            >
              <TextValidator


                label="Employee Name"
                onChange={this.handleChange('emp_name')}
                name="emp-name"
                className={classes.smalltextField}
                value={this.state.emp_name}
                validators={['required']}
                errorMessages={['this field is required']}
              />
        

              <TextValidator
                label="Email"
                onChange={this.handleChange('email')}
                name="email"
                value={this.state.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                className={classes.smalltextField}
              />
                   <br />
                        <TextValidator

                            name="mobile"
                            label="Mobile"
                            onChange={this.handleChange('mobile')}
                            name="mobile"
                            value={this.state.mobile}
                            validators={['required', 'matchRegexp:^[0-9]{10}$']}
                            errorMessages={['this feild is required', 'Enter valid no']}
                            className={classes.smalltextField}

                        />

<TextValidator
                label="Address"
                onChange={this.handleChange('address')}
                name="address"
                value={this.state.address}
                validators={['required']}
                errorMessages={['this field is required']}
                className={classes.smalltextField}
              />

          
 
              
              <br/>
              <br/>
          
         
 
<Dropzone onDrop={(files) => this.onDrop(files)}>
                <div> Drop or select file to upload.</div>
        
          </Dropzone>
          <p style={{color:'green'}}>{this.state.uploadedFileSrc} </p>

<br />


            
              <Button color="primary" type="submit"
                disabled={submitted}
              >  {
                  (submitted && 'Employee Added')
                  || (!submitted && 'Submit')
                }
              </Button>
              <Button onClick={this.props.handleClose} color="primary" autoFocus>
                Cancel
                </Button>

            </ValidatorForm>
          </DialogContent>

        </Dialog>
      </div>
    );
  }

}
EmployeeAdd.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};
//   const comp1 =withMobileDialog()(BasicEdit);
//   const comp2 =withStyles(styles)(BasicEdit);
export default compose(
  withStyles(styles),
  withMobileDialog(),
)(EmployeeAdd);
