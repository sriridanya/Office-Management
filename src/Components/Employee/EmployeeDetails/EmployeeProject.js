import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { Typography } from '@material-ui/core';
// import {Redirect,Link}from 'react-router-dom'



class EmployeeProject extends Component {


    render() {
        const { fullScreen } = this.props;


        return (
            // <Link  to={{
            //     pathname: this.props.match.url + '/' + this.props.name,

            //   }} 
            // >
            <Dialog
                fullScreen={fullScreen}
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="responsive-dialog-title"
                key={this.props.key}
            >
                <DialogTitle id="responsive-dialog-title">{this.props.prjname}</DialogTitle>

                <DialogContent>
                    <Typography gutterBottom variant="headline" >
                        {this.props.prjdetail}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Close
            </Button>

                </DialogActions>
            </Dialog>

            //   </Link>
        );
    }

}
EmployeeProject.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(EmployeeProject);

