import React, { Component } from 'react';
// import empdata from '../employeedata'
// import classNames from 'classnames';
// import { withStyles } from '@material-ui/core/styles';
// // import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';
// import compose from 'recompose/compose'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dropzone from 'react-dropzone';
// import request from 'superagent';

import withMobileDialog from '@material-ui/core/withMobileDialog';
import './DocumentEdit.css'
import { ValidatorForm} from 'react-material-ui-form-validator';

class DocumentEdit extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          uploadedFile:'',
          uploadedFileSrc: null,
          submitted: false,

        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleSubmit() {
        if(this.state.uploadedFile === ''){
          alert("Upload a file to save")
        }
        else{
        this.setState({ submitted: true
         
        });
      }
    }
     
      onImageDrop(files) {
       
        this.setState({
          uploadedFile: files[0]
        }); 
       
    const myFileItemReader= new FileReader()
    myFileItemReader.addEventListener("load",()=>{
      console.log(myFileItemReader.result)
      this.setState({uploadedFileSrc:myFileItemReader.result})
    },false)
    myFileItemReader.readAsDataURL(this.state.uploadedFile)
        
      }
     
     
     
      render() {
        const { fullScreen } = this.props;
       const {uploadedFileSrc}=this.state;
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
       
            
              <DialogTitle  id="responsive-dialog-title">Add Documents </DialogTitle>
              <DialogContent style={{width:'600px'}}> 
              <ValidatorForm
                     ref="form"
                     onSubmit={this.handleSubmit}
                     onError={errors => console.log(errors)}
                 >
             
             {uploadedFileSrc !=null ?<div> <img src={uploadedFileSrc} alt="document"height="250"width="300"/></div> :
                   
            <Dropzone
      multiple={false}
      accept="image/*"
      onDrop={this.onImageDrop.bind(this)}>
      <p>Drop an image or click to select a file to upload.</p>
    </Dropzone> 
              }
             
          
    
             
              <Button   
            color="primary" 
                  //  onClick={this.handleSubmit}
                   
                   type="submit"
                   disabled={submitted}
               >
                   {
                       (submitted && 'Document submitted ')
                       || (!submitted && 'Submit')
                   }</Button>
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
DocumentEdit.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
  
  };
//   const comp1 =withMobileDialog()(BasicEdit);
//   const comp2 =withStyles(styles)(BasicEdit);
  export default withMobileDialog()(DocumentEdit);
