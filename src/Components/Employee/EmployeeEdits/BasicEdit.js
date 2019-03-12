import React, { Component } from 'react';
// import empdata from '../employeedata'
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';
import compose from 'recompose/compose'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
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

});
// const db = firebase.firestore();

class BasicEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {

      name: this.props.Id.emp_name,
      email: this.props.Id.email,
      mobile: this.props.Id.mobile,
      id: this.props.Id.key,
      submmited: false,
      Basic:0,
      Transport_Allowance:'0',
      Hostel_EXP_Allowance:'0',
      Special_Allowance:'0',
      TDS:185,
      Professional_Tax_Deduction:'0',
      exceptedsalary:0
     
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
   // console.log(this.props.Id.uid);
    var db = firebase.firestore();
    var basicRef = db.collection('zyudlyemployee').doc(this.props.Id.uid);
    var updateMany = basicRef.update({
      emp_name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      payslip:{
      exceptedsalary:this.state.exceptedsalary,
      Basic:this.state.exceptedsalary/100*30,
      Transport_Allowance:this.state.Transport_Allowance,
      Special_Allowance:this.state.Special_Allowance,
      TDS:this.state.TDS,
      Professional_Tax_Deduction:this.state.Professional_Tax_Deduction,
      }

    });
    // [END update_document_many]
  
    return updateMany.then(res => {
     // console.log('Update: ', res);
    
      this.setState({ submitted: true }, () => {
        setTimeout(() => this.setState({ submitted: false })
        , 5000);
      });
    })

   
  }
componentWillMount(){

  //alert(this.props.Id.payslip.Basic)
if(this.props.Id.payslip){
   if(this.props.Id.payslip.Basic || this.props.Id.payslip.Transport_Allowance || this.props.Id.payslip.Special_Allowance || this.props.Id.payslip.TDS || this.props.payslip.Professional_Tax_Deduction || this.props.Id.payslip.exceptedsalary){
   // alert('working')
   var _this=this
   _this.setState({
      Basic:this.props.Id.payslip.Basic,
      Transport_Allowance:this.props.Id.payslip.Transport_Allowance,
      Special_Allowance:this.props.Id.payslip.Special_Allowance,
      TDS:this.props.Id.payslip.TDS,
      Professional_Tax_Deduction:this.props.Id.payslip.Professional_Tax_Deduction,
      exceptedsalary:this.props.Id.payslip.exceptedsalary

    })
  }else{
    //alert('not working')
  }
} 
}
  render() {
    const { fullScreen } = this.props;
    const { classes } = this.props;
    const { submitted } = this.state;
///alert(this.state.exceptedsalary/100*30)

// var Professional_Tax_Deduction=parseInt(this.state.Professional_Tax_Deduction)
// var TDS=parseInt(this.state.TDS)
// var Special_Allowance=parseInt(this.state.Special_Allowance)
// var Transport_Allowance=parseInt(this.state.Transport_Allowance)
// console.log(this.state.Basic)
//  var total=parseInt(this.state.Professional_Tax_Deduction)+parseInt(this.state.exceptedsalary/100*30)+parseInt(this.state.Special_Allowance)+parseInt(this.state.TDS)+parseInt(this.state.Transport_Allowance)


// var total=this.state.TDS+parseInt(this.state.Professional_Tax_Deduction)+parseInt(this.state.Special_Allowance)+parseInt(this.state.exceptedsalary/100*30)
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
          <DialogTitle id="responsive-dialog-title">Edit Basic Information</DialogTitle>
          <DialogContent>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
            >



           
              <TextValidator

                name="employee-name"
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                validators={['required']}
                errorMessages={['this field is required']}
                margin="normal"
              />
              <TextValidator

                name="employee-email"
                label="Email"
                value={this.state.email}
                onChange={this.handleChange('email')}
           
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                className={classes.textField}
                margin="normal"
              />
              <TextValidator

                name="mobile"
                label="Mobile"
                value={this.state.mobile}
                onChange={this.handleChange('mobile')}
              
                validators={['matchRegexp:^[0-9]{10}$']}
                errorMessages={['Enter valid no']}
                className={classes.textField}
                margin="normal"
              />
            
              <DialogTitle id="responsive-dialog-title">Salary Details</DialogTitle>

                <TextValidator

                name="excepted-salary"
                label="excepted-salary"
                className={classes.textField}
                value={this.state.exceptedsalary}
                onChange={this.handleChange('exceptedsalary')}
                validators={['required']}
                errorMessages={['this field is required']}
                margin="normal"
                />
                <br/>
              <TextValidator

              name="Basic"
              label="Basic"
              className={classes.textField}
              value={this.state.exceptedsalary/100*30}
              onChange={this.handleChange('Basic')}
              validators={['required']}
              errorMessages={['this field is required']}
              margin="normal"
              />

               <TextValidator

              name="Transport Allowance"
              label="Transport Allowance"
              className={classes.textField}
              value={this.state.Transport_Allowance}
              onChange={this.handleChange('Transport_Allowance')}
              validators={['required']}
              errorMessages={['this field is required']}
              margin="normal"
              />
   

            
            <TextValidator
            name="Special Allowance"
            label="Special Allowance"
            className={classes.textField}
            value={this.state.Special_Allowance}
            onChange={this.handleChange('Special_Allowance')}
            validators={['required']}
            errorMessages={['this field is required']}
            margin="normal"
            />


            <TextValidator

            name="TDS"
            label="TDS"
            className={classes.textField}
            value={185}
            onChange={this.handleChange('TDS')}
            validators={['required']}
            errorMessages={['this field is required']}
            margin="normal"
            />

            <TextValidator

            name="Professional Tax Deduction"
            label="Professional Tax Deduction"
            className={classes.textField}
            value={this.state.Professional_Tax_Deduction}
            onChange={this.handleChange('Professional_Tax_Deduction')}
            validators={['required']}
            errorMessages={['this field is required']}
            margin="normal"
            />

            <TextValidator

            name="Final Salary"
            label="Final-Salary"
            className={classes.textField}
            value={parseInt(this.state.exceptedsalary,10)/100*30+parseInt(this.state.TDS,10)+parseInt(this.state.Professional_Tax_Deduction,10)+parseInt(this.state.Special_Allowance,10)+parseInt(this.state.Transport_Allowance,10)}
           // onChange={this.handleChange('Professional_Tax_Deduction')}
            validators={['required']}
            errorMessages={['this field is required']}
            margin="normal"
              />

          <br/>
          <br/>
              <Button className={classes.textField1} style={{color:'white',backgroundColor:'#0f0c2b'}}  type="submit"
                disabled={submitted}
              >  {
                  (submitted && 'Updating...')
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
BasicEdit.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};
//   const comp1 =withMobileDialog()(BasicEdit);
//   const comp2 =withStyles(styles)(BasicEdit);
export default compose(
  withStyles(styles),
  withMobileDialog(),
)(BasicEdit);
