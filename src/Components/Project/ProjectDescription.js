
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Description from './Description.js';
import projectdata from './ProjectData';

class ProjectDescription extends React.Component {

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
      
        <Dialog
          fullScreen={fullScreen}
          open={this.props.open}
          onClose={this.props.handleClose}
          scroll={this.props.scroll}
          aria-labelledby="responsive-dialog-title"
        
        >
          <DialogTitle  id="responsive-dialog-title">{projectdata[this.props.id-1].prj_name}</DialogTitle>
          <DialogContent>
          
        <Description id={this.props.id}/>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Close
            </Button>
         
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ProjectDescription.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ProjectDescription);


