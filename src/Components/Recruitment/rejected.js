import React from 'react';
import PropTypes from 'prop-types';
//import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';

// const action = (
//   <Button color="secondary" size="small">
//     lorem ipsum dolorem
//   </Button>
// );

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit,
  
    
  },
});

function LongTextSnackbar(props) {
  const { classes } = props;

  return (
    <div>
     
      
      <SnackbarContent  style={{ backgroundColor: "#B32D00" }}
        className={classes.snackbar}
        message="Candidate is Rejected"
       
      />
      
    </div>
  );
}

LongTextSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LongTextSnackbar);