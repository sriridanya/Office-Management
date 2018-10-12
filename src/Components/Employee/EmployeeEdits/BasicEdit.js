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
  handleSubmit() {
    console.log(this.props.Id.uid);
    var db = firebase.firestore();
    var basicRef = db.collection('employeelist').doc(this.props.Id.uid);
    var updateMany = basicRef.update({
      emp_name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile
    });
    // [END update_document_many]
  
    return updateMany.then(res => {
      console.log('Update: ', res);
      this.setState({ submitted: true }, () => {
        setTimeout(() => this.setState({ submitted: false }), 5000);
      });
    })

   
  }
componentDidMount(){


  // Set the 'capital' field of the city
 

 
  
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
<br/>
              <Button color="primary" type="submit"
                disabled={submitted}
              >  {
                  (submitted && 'Project is submitted')
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
