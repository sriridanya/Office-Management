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
import Dropzone from 'react-dropzone';
import request from 'superagent';

import withMobileDialog from '@material-ui/core/withMobileDialog';
import './DocumentEdit.css'
const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset_id';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/your_cloudinary_app_name/upload';

class DocumentEdit extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          uploadedFileCloudinaryUrl: ''
        };
      }
      onImageDrop(files) {
        this.setState({
          uploadedFile: files[0]
        });
    
        this.handleImageUpload(files[0]);
      }
      handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);
    
        upload.end((err, response) => {
          if (err) {
            console.error(err);
          }
    
          if (response.body.secure_url !== '') {
            this.setState({
              uploadedFileCloudinaryUrl: response.body.secure_url
            });
          }
        });
      }
     
      render() {
        const { fullScreen } = this.props;
       
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
              <Dropzone
      multiple={false}
      accept="image/*"
      onDrop={this.onImageDrop.bind(this)}>
      <p>Drop an image or click to select a file to upload.</p>
    </Dropzone> 
    <div>
        {this.state.uploadedFileCloudinaryUrl === '' ? null :
        <div>
          <p>{this.state.uploadedFile.name}</p>
          <img src={this.state.uploadedFileCloudinaryUrl} />
        </div>}
      </div>
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
DocumentEdit.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
  
  };
//   const comp1 =withMobileDialog()(BasicEdit);
//   const comp2 =withStyles(styles)(BasicEdit);
  export default withMobileDialog()(DocumentEdit);
