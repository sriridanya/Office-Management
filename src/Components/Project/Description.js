
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import projetdata from './ProjectData';
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

function CenteredGrid(props) {
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
        title="Project Description"
 />
      <CardContent>
        <Typography className={classes.title} gutterBottom variant="subheading" >
       {projetdata[id].prj_description}
        
        </Typography>
      </CardContent>
      </Card>
      
        </Grid>
        <Grid item xs={6}>
        <Card className={classes.card}>
        <CardHeader
        className={classes.cardnav}
        title="Project Information"
 />
            <CardContent>
            <Typography className={classes.title}  gutterBottom variant="headline">
{bull} Project Id : {projetdata[id].prj_id}
</Typography>
<Typography  className={classes.title}  gutterBottom variant="headline">
{bull} Project Duration : {projetdata[id].duration}
</Typography>
<Typography className={classes.title}  gutterBottom variant="headline">
{bull} Start Date : {projetdata[id].start_date}
</Typography>
<Typography className={classes.title}  gutterBottom variant="headline">
{bull} Status : {projetdata[id].status}
</Typography>

                </CardContent>
            </Card>
        </Grid>
       
        <Grid item xs={6}>
        <Card className={classes.card}>
        <CardHeader
        className={classes.cardnav}
        title="Project Manager"
 />
            <CardContent>
            <Typography className={classes.title}  gutterBottom variant="headline">
 {projetdata[id].prj_manager}
</Typography>


                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12}>
        <Card className={classes.card}>
        <CardHeader
        className={classes.cardnav}
        title="Team Members"
 />
 
            <CardContent>
            {projetdata[id].prj_team.map((tile,index) => 
            
            
            <Typography key ={index}className={classes.title}  gutterBottom variant="headline"> {bull}
 {tile.emp_name} : {tile.role}
</Typography>
)}


                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={6}>
        <Card className={classes.card}>
        <CardHeader
        className={classes.cardnav}
        title="Technology Stack"
 />
            <CardContent>
            <Typography className={classes.title}  gutterBottom variant="headline">
 {projetdata[id].technology}
</Typography>


                </CardContent>
            </Card>
        </Grid>
      </Grid>
    </div>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);