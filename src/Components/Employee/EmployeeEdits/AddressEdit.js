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
  textField1: {
    //marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    //width: 200,
  },
});

class AddressEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {

      
      city: this.props.Id.address,
      
      submitted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmit() {
    var db = firebase.firestore();
    var addrRef = db.collection('zyudlyemployee').doc(this.props.Id.uid);
    var updateMany = addrRef.update({
      address: this.state.city,
      
    });
    // [END update_document_many]
  
    return updateMany.then(res => {
      // console.log('Update: ', res);
      this.setState({ submitted: true }, () => {
        setTimeout(() => this.setState({ submitted: false }), 5000);
      });
    })
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
          <DialogTitle id="responsive-dialog-title">Edit Address Information</DialogTitle>
          <DialogContent>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
              // onError={errors => console.log(errors)}
            >


              < TextValidator

                label="Street"
                name="street"
                className={classes.textField}
                value={this.state.street}
                onChange={this.handleChange('street')}
                validators={['required']}
                errorMessages={['this field is required']}
                margin="normal"
              />

              < TextValidator

                id="addr_city"
                label="City"
                name="city"
                value={this.state.city}
                onChange={this.handleChange('city')}
            
                validators={['required']}
                className={classes.smalltextField}
                errorMessages={['this field is required']}
                margin="normal"
              />

              < TextValidator

                id="addr_state"
                label="State"
                name="state"
                value={this.state.state}
                onChange={this.handleChange('state')}
                validators={['required']}
               
                className={classes.smalltextField}
                errorMessages={['this field is required']}
                margin="normal"
              />
              <br />
              <Button
        style={{color:'white',backgroundColor:'#0f0c2b'}}
        className={classes.textField1}
                type="submit"
                disabled={submitted}
              >
                {
                  (submitted && 'Your changes are submitted')
                  || (!submitted && 'Submit')
                }
              </Button>
              <Button  className={classes.textField1} onClick={this.props.handleClose} style={{color:'white',backgroundColor:'#0f0c2b'}} autoFocus>
                Cancel
                </Button>




            </ValidatorForm>

          </DialogContent>

        </Dialog>
      </div>
    );
  }

}
AddressEdit.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};
//   const comp1 =withMobileDialog()(BasicEdit);
//   const comp2 =withStyles(styles)(BasicEdit);
export default compose(
  withStyles(styles),
  withMobileDialog(),
)(AddressEdit);
