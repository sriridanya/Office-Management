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
import Dropzone from 'react-dropzone';
import axios from 'axios';
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
  button: {
    margin: theme.spacing.unit,
  },
  textField1: {
    //marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    //width: 200,
  }

});

class EmployeeAdd extends Component {
  constructor(props) {
    super(props)
   
    this.state = {
    emp_name: "",
      address: "",
      uid: "",
      email:"",
      img:[],
      mobile:"",
     
      filesToBeSent:[],
      uploadedFileSrc: '',
      submitted: false,
      
      imgurl:'',
    
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   // this.verfication =this.verfication.bind(this)
 
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmit() {
    
    if (this.state.uploadedFile === '') {
       // alert("Upload a img to save")
      }
      else {
       
        var db = firebase.firestore();
       
        var addDoc = db.collection('zyudlyemployee').doc();


  addDoc.set({
            emp_name: this.state.emp_name,
            email: this.state.email,
            mobile:this.state.mobile,
            address:this.state.address,

            uid:addDoc.id
          });
          var  form={
            admin_email:'zyudlyadm@gmail.com',
            password:'zyudly1234',
            to: this.state.email,
            id:addDoc.id
          } 
          
            axios.post('http://localhost:3003/mailverfication/',form)
            .then((result) => {
          
              
            })


          
        // console.log(empnew);
        var img=this.state.img;
        var storage = firebase.app().storage("gs://office-management-c1c61.appspot.com");
    var storageRef = storage.ref();
    
    var spaceRef = storageRef.child(addDoc.id+'/'+this.state.uploadedFileSrc);
    var uploadTask=spaceRef.put(img)
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    
    // console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        // console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        // console.log('Upload is running');
        break;
        default:
        // console.log('default')
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // console.log(' User doesn\'t have permission to access the object')
      break;

    case 'storage/canceled':
    // console.log(' User canceled the upload')
      break;

   

    case 'storage/unknown':
    // console.log('Unknown error occurred, inspect error.serverResponse')
      break;
      default:
      // console.log('default')
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

    var imgurl=downloadURL;
    // console.log('imhurl working',imgurl);
    var basicRef = db.collection('zyudlyemployee').doc(addDoc.id);//zyudlyemployee
    basicRef.update({

      img:imgurl,  
    });
    // console.log('img upload success',updateMany);
    // console.log('File available at', downloadURL);
  });
});
    this.setState({ submitted: true }, () => {
      setTimeout(() => {this.setState({ submitted: false, emp_name: '', email: '', mobile: '',uploadedFileSrc:'', address: '', experience: '',img:''})
    
    this.props.update()
    }, 5000);
    });
}
  }
  onDrop(acceptedFiles, rejectedFiles) {
    // console.log('Accepted files: ', acceptedFiles[0]);
    var img=acceptedFiles[0];
  this.setState({img:img})
  // console.log('state file:',this.state.img);
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
          <DialogTitle id="responsive-dialog-title">Add Employee Details</DialogTitle>
          <DialogContent>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
            >
              <TextValidator


                label="Employee Name"
                onChange={this.handleChange('emp_name')}
                name="emp-name"
                className={classes.smalltextField}
                value={this.state.emp_name}
                validators={['required']}
                errorMessages={['this field is required']}
              />
        

              <TextValidator
                label="Email"
                onChange={this.handleChange('email')}
                name="email"
                value={this.state.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                className={classes.smalltextField}
              />
                   <br />
                        <TextValidator
                   
                            label="Mobile"
                            onChange={this.handleChange('mobile')}
                            name="mobile"
                            value={this.state.mobile}
                            validators={['required', 'matchRegexp:^[0-9]{10}$']}
                            errorMessages={['this feild is required', 'Enter valid no']}
                            className={classes.smalltextField}

                        />

                <TextValidator
                label="Address"
                onChange={this.handleChange('address')}
                name="address"
                value={this.state.address}
                validators={['required']}
                errorMessages={['this field is required']}
                className={classes.smalltextField}
              />

              <br/>
              <br/>
         
<Dropzone onDrop={(files) => this.onDrop(files)}>
                <div> Drop or select file to upload.</div>
        
          </Dropzone>
          <p style={{color:'green'}}>{this.state.uploadedFileSrc} </p>

                     
              <br/>
              <br/>
          
              <Button type="submit" className={classes.textField1} style={{color:'white',backgroundColor:'#0f0c2b'}}
                disabled={submitted}
              >  {
                  (submitted && 'Employee Added...')
                  || (!submitted && 'Submit')
                }
              </Button>
              <Button className={classes.textField1} style={{color:'white',backgroundColor:'#0f0c2b'}} onClick={this.props.handleClose}  autoFocus>
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
