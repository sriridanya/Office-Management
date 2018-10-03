import React, { Component } from 'react';
// import empdata from '../employeedata'
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
// import AddIcon from '@material-ui/icons/Add';
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

class ProjectEdit extends Component{
  constructor(props){
    super(props)
      this.state = {
     
       prj_name: "Title",
    prj_description: "Description",
    team_size: "Size",
    
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
           key={this.props.Id}
              aria-labelledby="responsive-dialog-title"
              
            >
              <DialogTitle id="responsive-dialog-title">Add Project Details</DialogTitle>
              <DialogContent>
              <form className={classes.container} noValidate autoComplete="off">
        <TextField
        required
          id="project-title"
          label="Project Title"
          style={{ margin: 8 }}
          placeholder="Title"
          multiline
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
        required
          id="prj_description"
          label="Project Description"
          style={{ margin: 8 }}
          placeholder="Description"
          multiline
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
   
        <TextField
          required
          id="prj-duration"
          label="Project Duration"
          style={{ margin: 8 }}
          placeholder="size"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
            <TextField
          required
          id="prj-manager"
          label="Project Manager" 
          style={{ margin: 8 }}

          InputLabelProps={{
            shrink: true,
          }}
         placeholder="manager"
          
          margin="normal"
        />
           
        
        <TextField
        required
          id="prj_members"
          label="Team Members"
          style={{ margin: 8 }}
          placeholder="Members"
          multiline
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
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
ProjectEdit.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
  };
//   const comp1 =withMobileDialog()(BasicEdit);
//   const comp2 =withStyles(styles)(BasicEdit);
  export default  compose(
    withStyles(styles),
    withMobileDialog(),
)(ProjectEdit);
