import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import * as firebase from 'firebase';



const styles = theme => ({
    assign: {
        maxWidth: '486px',
        position: 'absolute',
        right: '-30px',
        top: '20px',
        height: '500px'
    },
    // textField: {
    //   marginLeft: theme.spacing.unit,
    //   marginRight: theme.spacing.unit,
    //   width: 500,
    // },
    // smalltextField: {
    //   marginLeft: theme.spacing.unit,
    //   marginRight: theme.spacing.unit,
    //   width: 200,
    // },
    // dense: {
    //   marginTop: 19,
    // },
    // button: {
    //   margin: theme.spacing.unit,
    // },
  
  });
  

  class AlertDialog extends Component {
  constructor(props) {
    super(props)
   // alert(props.reasons)
 this.state = {
    open: true,
    reasons:props.reasons
  };
  }
  componentWillMount(){
  
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
  //  alert(this.state.reasons)
    const { classes, theme } = this.props;
    return (
      <div className={classes.assign}>
 
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <div style={{backgroundColor:'red'}}> 
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          </div>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             {this.state.reasons}   </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      
      
      </div>
    );
  }
}

//export default AlertDialog;



AlertDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    
  };




export default withStyles(styles)(AlertDialog);
  