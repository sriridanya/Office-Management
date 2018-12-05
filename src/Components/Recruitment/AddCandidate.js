import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import MenuItem from '@material-ui/core/MenuItem';
import Dropzone from 'react-dropzone';

//import Listsp from './list';
import swal from 'sweetalert';
import axios from 'axios';

import ChipInput from 'material-ui-chip-input'


import * as firebase from 'firebase';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
   // marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
   
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






// const Status = [
//   {
//     value: 'Waiting for interview',
//     label: 'Waiting for interview',
//   },
//   {
//     value: 'HR-Review',
//     label: 'HR-Review',
//   },
//   {
//     value: 'Engineer-Review',
//     label: 'Engineer-Review',
//   },
//   {
//     value: 'Interview Schedule',
//     label: 'Interview Schedule',
//   },
//   {
//     value: 'Selected',
//     label: 'Selected',
//   },
//   {
//     value: 'Rejected',
//     label: 'Rejected',
//   },
// ];




const Status = [
  {
    value: 'Waiting for Verfication',
    label: 'Waiting for Verfication',
  },
  // {
  //   value: 'HR-Review',
  //   label: 'HR-Review',
  // }
];



const Experience = [
  {
    value: '0-1Year',
    label: '0-1Year',
  },
  {
    value: '1-2Years',
    label: '1-2Years',
  },
  {
    value: '2-3Years',
    label: '2-3Years',
  },
  {
    value: '3+Years',
    label: '3+Years',
  },

];


const Post_apply = [
  {
    value: 'Developer',
    label: 'Developer',
  },
  {
    value: 'Data Scientist',
    label: 'Data Scientist',
  },
  {
    value: 'Designer',
    label: 'Designer',
  },
  {
    value: 'Business Executive',
    label: 'Business Executive',
  },
];

class EmployeeAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      candidate_name: "",
      post_apply: "",
      uid: "",
      email:"",
      experience: "",
      status:"",
      img:[],
      skilset:[],
      chips:'',
      mobile:"",
      description: '',
      selectedFile: '',
     item:[],
      filesToBeSent:[],
      uploadedFileSrc: '',
      resume_id:'',
      submitted: false,
      
      imgurl:'',
     
    
    };





    
    this.handleChange = this.handleChange.bind(this);
   
 this.handleSubmit = this.handleSubmit.bind(this);
  
  
    this.handleAddChip=this.handleAddChip.bind(this);
 this.handleDeleteChip=this.handleDeleteChip.bind(this);
  }



  handleDeleteChip(e,index) {
   
   var skilset1= this.state.skilset

   skilset1.splice(index, 1);

  
this.setState({skilset:skilset1})

   }
  
   

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
     
    });
   
    // console.log('array checking'+chips)


    //console.log('name karo'+this.state.candidate_name)
  };


  handleAddChip(event) {
    console.log(event);
    this.setState({
     skilset: event,
    });
   
    // console.log('array checking'+this.state.skilset)


    //console.log('name karo'+this.state.candidate_name)
  };


  onChange = (e) => {
    switch (e.target.name) {
      case 'selectedFile':
        this.setState({ selectedFile: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  }






  handleSubmit(e) {

    e.preventDefault();
    const { description, selectedFile } = this.state;
    let formData = new FormData();

    formData.append('description', description);
    formData.append('selectedFile', selectedFile);
//alert(formData)
    axios.post('http://localhost:3003/', formData)
      .then((result) => {
        // access results...
       
       // alert(result.data.id)
        var resume_id=result.data.id
        this.setState({resume_id:resume_id})
        this.setState({selectedFile:!this.state.selectedFile})
        this.setState({description:!this.state.description})


    
   

        const db = firebase.firestore();
      //  const settings = {/* your settings... */ timestampsInSnapshots: true};
        // db.settings(settings);
   
       
  
 
  var addDoc = db.collection('employeelist').doc();


var empnew=  addDoc.set({
  candidate_name: this.state.candidate_name,
           email: this.state.email,
            mobile:this.state.mobile,
            status:this.state.status,
            post_apply:this.state.post_apply,
            experience:this.state.experience,
            skilset:this.state.skilset,
            resume_id:this.state.resume_id,
            uploadedFileSrc:this.state.uploadedFileSrc,
            uid:addDoc.id
    });
 // console.log(empnew);
  var img=this.state.img;
  // var storage = firebase.app().storage("gs://office-management-e5ec6.appspot.com");
  var storage = firebase.app().storage("gs://office-management-c1c61.appspot.com");
var storageRef = storage.ref();

var spaceRef = storageRef.child(addDoc.id+'/'+this.state.uploadedFileSrc);
var uploadTask=spaceRef.put(img)
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
function(snapshot) {

// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
swal('Upload is ' + progress + '% done');
switch (snapshot.state) {
case firebase.storage.TaskState.PAUSED: // or 'paused'
  console.log('Upload is paused');
  break;
case firebase.storage.TaskState.RUNNING: // or 'running'
  console.log('Upload is running');
  break;
  default:
  console.log('default')
  break;
}
}, function(error) {

// A full list of error codes is available at
// https://firebase.google.com/docs/storage/web/handle-errors
switch (error.code) {
case 'storage/unauthorized':
console.log(' User doesn\'t have permission to access the object')
break;

case 'storage/canceled':
console.log(' User canceled the upload')
break;



case 'storage/unknown':
console.log('Unknown error occurred, inspect error.serverResponse')
break;
default:
console.log('default')
break;
}
}, function() {
// Upload completed successfully, now we can get the download URL
uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

var imgurl=downloadURL;
console.log('imhurl working',imgurl);
var basicRef = db.collection('employeelist').doc(addDoc.id);
var updateMany = basicRef.update({

img:imgurl,
});
console.log('img upload success',updateMany);
console.log('File available at', downloadURL);

});

});




this.setState({ submitted: true }, () => {
setTimeout(() =>{ this.setState({ submitted: false,
   candidate_name: '',
email: '', 
mobile: '',
uploadedFileSrc:'',
skilset: [], 
experience: '',
img:'',
status:'',
post_apply:'',  
description: '',
selectedFile: ''})
this.props.updating()

swal("Successfully Uploaded", "", "success");


}, 5000);





});

});




  }
  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Accepted files: ', acceptedFiles[0]);
    var img=acceptedFiles[0];
  this.setState({img:img})
  console.log('state file:',this.state.img);
    this.setState({img,uploadedFileSrc:acceptedFiles[0].name}); 
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
              select
                label="Post Applying"
                onChange={this.handleChange('post_apply')}
                name="post_apply"
                value={this.state.post_apply}
                validators={['required']}
                errorMessages={['this field is required']}
                className={classes.smalltextField}>
                {Post_apply.map(option => (
            <MenuItem key={option.value} value={option.value}>
             {option.label}
            </MenuItem>
          ))}
                </TextValidator>
              
              <br />

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
            select
            label="Experience"
            onChange={this.handleChange('experience')}
            name="experience"
            value={this.state.experience}
            validators={['required']}
            errorMessages={['this field is required']}
            className={classes.smalltextField}
             >
              {Experience.map(option => (
            <MenuItem key={option.value} value={option.value}>
             {option.label}
            </MenuItem>
          ))}</TextValidator>
          
 
            <TextValidator
            select
            label="Status"
            onChange={this.handleChange('status')}
            name="status"
            value={this.state.status}
            validators={['required']}
            errorMessages={['this field is required']}
            className={classes.smalltextField}
            // InputProps={{
            //   startAdornment: <InputAdornment position="start"></InputAdornment>,
            // }}
             >
             {Status.map(option => (
            <MenuItem key={option.value} value={option.value}>
             {option.label}
            </MenuItem>
          ))}
       
            </TextValidator>
            

            <br/>

            {/* <TextValidator
            label="Skillset"
            onChange={this.handleChange('skilset')}
            name="Skillset"
            value={this.state.skilset}
            validators={['required']}
            errorMessages={['this field is required']}
            className={classes.smalltextField}
            />

            <br/> */}
            
             <ChipInput
              label="Skillset"
              className={classes.smalltextField}
              value={this.state.skilset}
              onChange={(chip) =>{
                
                
                this.handleAddChip(chip)}}
                onDelete={(chip, index) =>this.handleDeleteChip(chip, index)}
              // onClick={()=>{this.delect(rec)}}
              />

      
            <br/>
            <br/>
          
         
 
          <Dropzone onDrop={(files) => this.onDrop(files)}>
          <div> Drop or select file to upload.</div>       
          </Dropzone>
          <p style={{color:'green'}}>{this.state.uploadedFileSrc} </p>
            <br />
            <div>
            <input
              variant="contained"
             className={classes.Filechoose} 
              type="file"
              name="selectedFile"
              onChange={this.onChange}
              //style={{color:'white',backgroundColor:'#0f0c2b'}}
            />

        
          {/* { this.state.identify === true &&
       <Drivelist varible={this.state.list} notification={this.state.notification}/>}   */}
         </div>
         <br/>
              <Button  className={classes.textField} type="submit" style={{color:'white',backgroundColor:'#0f0c2b'}}
                disabled={submitted}
              >  {
                  (submitted && 'Candidate Added...')
                  || (!submitted && 'Submit')
                }
              </Button>
              <Button   className={classes.textField} onClick={this.props.handleClose} style={{color:'white',backgroundColor:'#0f0c2b'}} autoFocus>
                Cancel
                </Button>
    
            </ValidatorForm>
          </DialogContent>

        </Dialog>
       
      </div>
    );
  }

}
EmployeeAdd.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};
//   const comp1 =withMobileDialog()(BasicEdit);
//   const comp2 =withStyles(styles)(BasicEdit);
export default compose(
  withStyles(styles),
  withMobileDialog(),
)(EmployeeAdd);
