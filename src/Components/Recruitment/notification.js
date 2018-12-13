import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import * as firebase from 'firebase';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from 'react-icons-kit'
import {alertCircled} from 'react-icons-kit/ionicons/alertCircled'



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
  this.remove=this.remove.bind(this)
  }
  componentWillMount(){
  
  }

  remove(e){
   // alert(e)
    const db = firebase.firestore();

  
  
// alert(id1)
var basicRef = db.collection('hr').doc(e);
var updateMany = basicRef.update({

notification:'ok'

})
return updateMany.then(res => {
 

  this.props.update()


} )

  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
  //  alert(this.state.reasons)
  //console.log(this.state.reasons)
    const { classes } = this.props;
    return (
      <div className={classes.assign}>
 
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
       
          <DialogContent>
            {this.state.reasons.map((doc)=>{
            return (
              <div>
                  <Typography>-------------------------------------------</Typography>
            <Typography align='center'>{doc.status}
              <IconButton  aria-label="Delete"  color="secondary"    onClick={()=>{this.remove(doc.id)}} handleClose={this.close}>
                  <div style={{ color: '#de072b' }}>
                  <Icon icon={alertCircled}  size={18} />
                  </div>              
                  </IconButton> 
            </Typography>
           
              <Typography>-------------------------------------------</Typography>
            </div>
            )}
         

            )}
            
          </DialogContent>
          
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
  