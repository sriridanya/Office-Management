// import React,{Component} from 'react';
// import Calenderevents from './calenderevents'

// class Events extends Component{ 
   
//     // componentDidMount() {
//     //     this.props.navhandler('Recruitment')
//     //   }
//     render(){
//         return(
//             <div style={{display:"flex",flexDirection:"column"}}>
//                  <div style={{marginTop:"20px"}}>
//            <Calenderevents/>
//            </div> 
//             </div>
//         );
//     }
// }
// export default Events;




import React from 'react';
import Calenderevents from './calenderevents'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SimpleCard(props) {
  const { classes } = props;
 

  return (
    <Card className={classes.card}>
      <CardContent>
      <Calenderevents/>
      </CardContent>
     
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);