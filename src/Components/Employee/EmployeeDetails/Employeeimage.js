import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
// import {Redirect,Link}from 'react-router-dom'


  
class Employeeimage extends Component{
    state = {
        open: true,
    
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
render(){
    const { fullScreen } = this.props;
   

    return(
        // <Link  to={{
        //     pathname: this.props.match.url + '/' + this.props.name,
            
        //   }} 
        // >
        <Dialog
        fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
          key={this.props.key}
      >
      <DialogTitle id="responsive-dialog-title">{this.props.name}</DialogTitle>
        
        <DialogContent>
         
        <img src= {this.props.image} alt={this.props.name} height='400' width='500'/>
        </DialogContent>
        <DialogActions>
            <Button onClick={this.handleClose} color="primary">
             Close
            </Button>
       
          </DialogActions>
      </Dialog>
      
    //   </Link>
    );
}
   
}
Employeeimage.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
  };
  
  export default withMobileDialog()(Employeeimage);

