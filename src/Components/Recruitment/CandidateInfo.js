
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import recruitmentdata from './RecruitmentData';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },

  card: {
    minWidth: 275,
  
  },
  title: {
    marginBottom: 16,
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
  cardnav:{
      backgroundColor:'#dadada',
      
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
});

function CandidateInfo(props) {
  const { classes } = props;
const id=props.id-1
const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card className={classes.card}>
          <CardHeader
        className={classes.cardnav}
        title="Candidate Information"
 />
      <CardContent>
        <Typography className={classes.title} gutterBottom variant="headline" >
       {recruitmentdata[id].candidate_name}
        
        </Typography>
        <Typography className={classes.title}  gutterBottom variant="subheading">
Position Applied : {recruitmentdata[id].post_applied}</Typography>
<Typography className={classes.title}  gutterBottom variant="subheading">
Experience : {recruitmentdata[id].experience}
</Typography>
      </CardContent>
      </Card>
      
        </Grid>
        <Grid item xs={6}>
        <Card className={classes.card}>
        <CardHeader
        className={classes.cardnav}
        title="Contact Information"
 />
            <CardContent>
            <Typography className={classes.title}  gutterBottom variant="headline">
{bull}Email Id : {recruitmentdata[id].email}
</Typography>
<Typography  className={classes.title}  gutterBottom variant="headline">
{bull} Phone No : {recruitmentdata[id].phone}
</Typography>



                </CardContent>
            </Card>
        </Grid>
       
        <Grid item xs={6}>
        <Card className={classes.card}>
        <CardHeader
        className={classes.cardnav}
        title="Status"
 />
            <CardContent>
            <Typography className={classes.title}  gutterBottom variant="headline">
 {recruitmentdata[id].status}
</Typography>


                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12}>
        <Card className={classes.card}>
        <CardHeader
        className={classes.cardnav}
        title="Resume"
 />
 
            <CardContent>
          <p>hai</p>

                </CardContent>
            </Card>
        </Grid>
        
      </Grid>
    </div>
  );
}

CandidateInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CandidateInfo);