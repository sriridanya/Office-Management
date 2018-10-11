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

class CandidateEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
    candidate_name: "",
      post_apply: "",
      experience: "",
      email:"",
      status:"",
      phone:"",
      resume: "",
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
        alert("Upload a file to save")
      }
      else {
        this.setState({
          submitted: true
  
        });
      }
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false, candidate_name: '', email: '', phone: '', post_apply: '', experience: '',status:'' }), 5000);
    });
  }
  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Accepted files: ', acceptedFiles[0].name);
    var filesToBeSent=this.state.filesToBeSent;
    filesToBeSent.push(acceptedFiles);
    this.setState({filesToBeSent,uploadedFileSrc:acceptedFiles[0].name}); 
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
          <DialogTitle id="responsive-dialog-title">Add Candidate Details</DialogTitle>
          <DialogContent>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
            >
              <TextValidator


                label="Candidate Name"
                onChange={this.handleChange('candidate_name')}
                name="candidate-name"
                className={classes.smalltextField}
                value={this.state.candidate_name}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <TextValidator
                label="Post Applying"
                onChange={this.handleChange('post_apply')}
                name="post_apply"
                value={this.state.post_apply}
                validators={['required']}
                errorMessages={['this field is required']}
                className={classes.smalltextField}
              /><br />

              <TextValidator
                label="Email"
                onChange={this.handleChange('email')}
                name="email"
                value={this.state.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                className={classes.smalltextField}
              />
            <TextValidator

name="mobile"
label="Mobile"
onChange={this.handleChange('mobile')}
value={this.state.mobile}
validators={['required','matchRegexp:^[0-9]{10}$']}
errorMessages={['this feild is required','Enter valid no']}
className={classes.smalltextField}

/>
<br/>
<TextValidator
                label="Experience"
                onChange={this.handleChange('experience')}
                name="experience"
                value={this.state.experience}
                validators={['required']}
                errorMessages={['this field is required']}
                className={classes.smalltextField}
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
              <br/>
              <br/>
          
         
 
<Dropzone onDrop={(files) => this.onDrop(files)}>
                <div>Try dropping some files here, or click to select files to upload.</div>
        
          </Dropzone>
          <p style={{color:'green'}}>{'File'+this.state.uploadedFileSrc+'uploaded'} </p>

<br />


            
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
CandidateEdit.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};
//   const comp1 =withMobileDialog()(BasicEdit);
//   const comp2 =withStyles(styles)(BasicEdit);
export default compose(
  withStyles(styles),
  withMobileDialog(),
)(CandidateEdit);
