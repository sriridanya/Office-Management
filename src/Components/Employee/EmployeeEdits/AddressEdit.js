import React, { Component } from 'react';
import empdata from '../employeedata'
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import compose from 'recompose/compose'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
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

class AddressEdit extends Component{
  constructor(props){
    super(props)
      this.state = {
     
        street: empdata[this.props.Id-1].address.street_address,
    city: empdata[this.props.Id-1].address.city,
    state: empdata[this.props.Id-1].address.state,
    
      };
    }
   
      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
     
      render() {
        const { fullScreen } = this.props;
        const { classes } = this.props;
        
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
              <form className={classes.container} noValidate autoComplete="off">
        <TextField
        required
          id="addr_street"
          label="Street"
          className={classes.textField}
          value={this.state.street}
          onChange={this.handleChange('street')}
        
          margin="normal"
        />
        <TextField
        required
          id="addr_city"
          label="City"
          onChange={this.handleChange('city')}
          value={this.state.city}
          
          className={classes.textField}
          margin="normal"
        />
        <TextField
          required
          id="addr_state"
          label="State"
         
          value={this.state.state}
          className={classes.textField}
          margin="normal"
        />
        
       
     
       
      </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                  Save
                </Button>
                <Button onClick={this.props.handleClose} color="primary" autoFocus>
                 Cancel
                </Button>
              </DialogActions>
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
  export default  compose(
    withStyles(styles),
    withMobileDialog(),
)(AddressEdit);
