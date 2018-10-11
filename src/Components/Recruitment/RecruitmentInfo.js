
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import CandidateInfo from './CandidateInfo.js';
import recruitmentdata from './RecruitmentData';

class RecruitmentInfo extends React.Component {
    

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
      
        <Dialog
          fullScreen={fullScreen}
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="responsive-dialog-title"
          scroll={this.props.scroll}
        >
          <DialogTitle  id="responsive-dialog-title">{recruitmentdata[this.props.id-1].candidate_name}</DialogTitle>
          <DialogContent style={{overflow:'scroll'}}>
          
        <CandidateInfo id={this.props.id}/>
            
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

RecruitmentInfo.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(RecruitmentInfo);


