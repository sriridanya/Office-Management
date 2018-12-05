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
    
    <div style={{float:"left",backgroundColor:"#ff7b58",  height:80,width:"30%",paddingTop:'10%',paddingBottom:'10%',paddingLeft:"5%",paddingRight:"5%"}}>
          <EmployeeIcon style={{color:"#f3f6f9"}} fontSize="large"/>
          </div>
       
          <div style={{float:"left",height:80,width:"70%",padding:'10%',backgroundColor:"#fefefe"}}>
          <Typography gutterBottom variant="body1" style={{fontWeight:"bold",color:"#ff7b58"}}>
            Total Employees
          </Typography>
          <Typography gutterBottom variant="subheading" >
           {emp_size}
          </Typography>
          
        </div>
    
    </Grid>
    <Grid item xs={6} sm={3}>
    
    <div style={{float:"left",backgroundColor:"#39bbe0",  height:80,width:"30%",paddingTop:'10%',paddingBottom:'10%',paddingLeft:"5%",paddingRight:"5%"}}>
    <ProjectIcon  style={{color:"#f3f6f9"}}fontSize="large"/>
          </div>
       
          <div style={{float:"left",height:80,width:"70%",padding:'10%',backgroundColor:"#fefefe"}}>
          <Typography gutterBottom variant="body1" style={{fontWeight:"bold",color:"#39bbe0"}}>
            Total Projects
          </Typography>
          <Typography gutterBottom variant="subheading" >
           {prj_count}
          </Typography>
          
        </div>
    
    </Grid>
    <Grid item xs={6} sm={3}>
    
    <div style={{float:"left",backgroundColor:"#b883db",  height:80,width:"30%",paddingTop:'10%',paddingBottom:'10%',paddingLeft:"5%",paddingRight:"5%"}}>
    <OngoingIcon style={{color:"#f3f6f9"}} fontSize="large"/>
          </div>
       
          <div style={{float:"left",height:80,width:"70%",padding:'10%',backgroundColor:"#fefefe"}}>
          <Typography gutterBottom variant="body1"style={{fontWeight:"bold",color:"#b883db"}}>
           Ongoing 
          </Typography>
          <Typography gutterBottom variant="subheading" >
           {ongoing}
          </Typography>
          
        </div>
    
    </Grid>
    <Grid item xs={6} sm={3}>
    
    <div style={{float:"left",backgroundColor:"#39bf58",  height:80,width:"30%",paddingTop:'10%',paddingBottom:'10%',paddingLeft:"5%",paddingRight:"5%"}}>
    <CompletedIcon style={{color:"#f3f6f9"}} fontSize="large"/>
          </div>
       
          <div style={{float:"left",height:80,width:"70%",padding:'10%',backgroundColor:"#fefefe"}}>
          <Typography gutterBottom variant="body1" style={{fontWeight:"bold",color:"#39bf58"}}> 
            Completed 
          </Typography>
          <Typography gutterBottom variant="subheading" >
           {completed}
          </Typography>
          
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