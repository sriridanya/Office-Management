import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Employeeimage from './EmployeeDetails/Employeeimage';
// import EmployeeDetails from'./EmployeeDetails/EmployeeDetails';
import {Link} from 'react-router-dom'
// import Dialog from '@material-ui/core/Dialog';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
import tileData from'./employeedata';
// import withMobileDialog from '@material-ui/core/withMobileDialog';
const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
};

class Employee extends Component {
  // static contextTypes = { 
  //   router: React.PropTypes.object 
  //      }
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      showFullDetail:false,
      empdetails:{
        empname:'',
        key:'',
        empimg:{},
      }
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick(tile) {
    this.setState({
      showComponent: true,
      empdetails:{empname:tile.emp_name,empimg:tile.img,key:tile.key}
    });

  }
  // _onViewClick(tile) {

  // //   this.context.router.push({
  // //     pathname: '/employeedetail',
  // //     state: {
  // //         id: this.state.empdetails.key,
  // //         name: this.state.empdetails.empname,
  // //         avatar:this.state.empdetails.empimg
  // //     }
  // // });
   
  // }
  render(){
  const { classes } = this.props;
 
  return (
    <div className="row">
   
       {tileData.map(tile => (
          <div key={tile.key} className="col-xs-12 col-sm-6 col-md-4"style={{padding:'10px'}}>
      <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          onClick={()=>{this._onButtonClick(tile)}}
          component="img"
          className={classes.media}
          height="200"
          image="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
          title=  {tile.emp_name}
        
        />
           
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
          {tile.emp_name}
          </Typography>
    
        </CardContent>
      </CardActionArea>
      <CardActions style={{justifyContent: 'center'}}>
       <Link to={ `/employeedetail/${tile.key}`}><Button size="small" color="primary"
        //  onClick={()=>{
        //    this._onViewClick();
        //  }}
         >
          View Details
        </Button>
        </Link> 
      </CardActions>
    </Card>

    </div>
       ))}
      
      {this.state.showComponent ?
          <Employeeimage name={this.state.empdetails.empname} key={this.state.empdetails.key} image={this.state.empdetails.empimg} />:
           null
        } 
        
      
        {/* {this.state.showFullDetail ?
          <EmployeeDetails />:
           null
        }  */}
    </div>
  );
}
}

Employee.propTypes = {
  classes: PropTypes.object.isRequired,

};

export default  withStyles(styles) (Employee);
