import React, { Component } from 'react';
// import empdata from '../employeedata'
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import compose from 'recompose/compose'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import withMobileDialog from '@material-ui/core/withMobileDialog';
// import AddIcon from '@material-ui/icons/Add';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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

class ProjectEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prj_name: "",
      prj_description: "",
      prj_duration: "",
      start_date:"",
      status:"",
      technology:"",
      prj_manager: "",
   
      
      submmited: false,
      add_team:[{   prj_members:'',role:''}],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddTeam=this.handleAddTeam.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmit() {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false, prj_description: '', prj_duration: '', prj_manager: '', prj_members: '', prj_name: '' }), 5000);
    });
  }
  handleAddTeam= (e) => {
    this.setState((prevState) => ({
      add_team: [...prevState.add_team, {prj_members:"",role:""}],
    }));
  }
  render() {
    const { fullScreen } = this.props;
    const { classes } = this.props;
    const { submitted } = this.state; 
    let {add_team} = this.state

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
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
            >
              <TextValidator


                label="Project Title"
                onChange={this.handleChange('prj_name')}
                name="project-title"
                className={classes.textField}
                value={this.state.prj_name}
                validators={['required']}
                errorMessages={['this field is required']}
              /><br />
              <TextValidator
                label="Project Description"
                onChange={this.handleChange('prj_description')}
                name="prj_description"
                value={this.state.prj_description}
                validators={['required']}
                errorMessages={['this field is required']}
                className={classes.textField}
              /><br />

              <TextValidator
                label="Project Duration"
                onChange={this.handleChange('prj_duration')}
                name="prj-duration"
                value={this.state.prj_duration}
                validators={['required']}
                errorMessages={['this field is required']}
                className={classes.smalltextField}
              />
              <TextField
        id="date"
        label="Start Date"
        type="date"
        defaultValue="2016-05-24"
        className={classes.smalltextField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={this.handleChange('start_date')}
      />
 
                <TextValidator
                label="Status"
                onChange={this.handleChange('status')}
                name="status"
                value={this.state.status}
                validators={['required']}
                errorMessages={['this field is required']}
                className={classes.smalltextField}
              />
          
              <TextValidator

                name="prj-manager"
                onChange={this.handleChange('prj_manager')}
                label="Project Manager"
                value={this.state.prj_manager}
                validators={['required']}
                errorMessages={['this field is required']}
                className={classes.smalltextField}
              /><br /><br />

 <Typography gutterBottom variant="title" component="h2">
                 Add Team Members
                  </Typography>
         
             
             
        {
          add_team.map((val, idx)=> {
           
            return (
              <div key={idx}>
    <TextValidator

label="Team Members"
onChange={this.handleChange('add_team.prj_members')}
name="prj_members"
value={this.state.add_team.prj_members}
validators={['required']}
errorMessages={['this field is required']}
className={classes.textField}
/> 
<TextValidator

label="Role"
onChange={this.handleChange('add_team.role')}
name="role"
value={this.state.add_team.role}
validators={['required']}
errorMessages={['this field is required']}
className={classes.textField}
/>
              </div>
            )
          })
        }
             
              <Button variant="fab"  onClick={this.handleAddTeam.bind(this)} mini color="secondary" aria-label="Add" className={classes.button}>
          <AddIcon />
        </Button> <br/>
              <TextValidator
                label="Technology"
                onChange={this.handleChange('technology')}
                name="Technology"
                value={this.state.technology}
                validators={['required']}
                errorMessages={['this field is required']}
                className={classes.smalltextField}
              />
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
ProjectEdit.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};
//   const comp1 =withMobileDialog()(BasicEdit);
//   const comp2 =withStyles(styles)(BasicEdit);
export default compose(
  withStyles(styles),
  withMobileDialog(),
)(ProjectEdit);
