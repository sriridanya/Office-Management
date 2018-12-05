import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import empdata from '../Employee/employeedata';
import projdata from '../Project/ProjectData';
import Grid from '@material-ui/core/Grid';
import EmployeeIcon from '@material-ui/icons/SupervisorAccount';
import Typography from '@material-ui/core/Typography';
import ProjectIcon from '@material-ui/icons/BusinessCenter';
import CompletedIcon from '@material-ui/icons/VerifiedUser';
import OngoingIcon from '@material-ui/icons/TrendingUp'

const styles = {
    root: {
        flexGrow: 1,
      },
};
const emp_size=empdata.length;
const prj_count=projdata.length;
var ongoing=0;
var completed=0;
for(let i=0;i<prj_count;i++){
    if(projdata[i].status==="Ongoing"){
       ongoing++
    }
    else if(projdata[i].status==="Completed") {
       completed++
    }
}
function DashboardCardCount(props) {
  const { classes } = props;
 
  return (
      
    <div className={classes.root}>
          <Grid container spacing={16}>
          <Grid item xs={6} sm={3}>
    
    <div style={{float:"left",backgroundColor:"#ff7b58",  height:180,width:"30%",paddingTop:'10%',paddingBottom:'10%',paddingLeft:"5%",paddingRight:"5%"}}>
          <EmployeeIcon style={{color:"#f3f6f9"}} fontSize="large"/>
          </div>
    </Grid>
    </Grid>
    </div>
  );
}

DashboardCardCount.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardCardCount);