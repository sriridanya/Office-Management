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
import EmployeeAdd from './EmployeeAdd'
// import EmployeeDetails from'./EmployeeDetails/EmployeeDetails';
import { Link } from 'react-router-dom'
// import Dialog from '@material-ui/core/Dialog';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add'
// import tileData from './employeedata';
// import withMobileDialog from '@material-ui/core/withMobileDialog';
//firbase import
import * as firbase from "firebase"
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
      employeedetail:[],
      showComponent: false,
      showFullDetail: false,
      employeeEdit:false,
      empdetails: {
        empname: '',
        key: '',
        empimg: {},
      }
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  
  this.handleEmployeeEdit = this.handleEmployeeEdit.bind(this);
  this.handleEmployeeEditcolse = this.handleEmployeeEditcolse.bind(this);
}

  handleEmployeeEdit() {
      console.log("basic edit function")
      console.log(this.state.employeeEdit)
      this.setState({
        employeeEdit: true,
    
      })
  
    }
  handleEmployeeEditcolse() {

      console.log("handleBasicEditcolse")
  
      this.setState({
        employeeEdit: false,
      })
  
    }
  _onButtonClick(tile) {
    this.setState({
      showComponent: true,
      empdetails: { empname: tile.emp_name, empimg: tile.img, key: tile.key }
    });

  }
  componentWillMount(){
    var _this=this;
    var empList=[]
    console.log("running")
    var db=firbase.firestore()
    var docRef=db.collection("employeelist")
    //var docRef = db.collection("cities").doc("SF");
    docRef.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          empList.push(doc.data())
      });
      _this.setState({employeedetail:empList})
      console.log("new data",_this.state.employeedetail)
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
  componentDidMount() {
    this.props.navhandler('Employee List')
  }
  render() {
    const { classes } = this.props;

    return (
      <div className="row">
    
        
        {this.state.employeedetail.map((tile,index) => (
          <div key={tile.key} className="col-xs-12 col-sm-6 col-md-3" style={{ padding: '10px' }}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  onClick={() => { this._onButtonClick(tile) }}
                  component="img"
                  className={classes.media}
                  height="180"
                  image={tile.img}
                  title={tile.emp_name}
                  style={{padding:0}}
                />

                <CardContent style={{padding:0}}>
                  <Typography gutterBottom variant="headline" component="h2">
                    {tile.emp_name}
                  </Typography>

                </CardContent>
              </CardActionArea>
              <CardActions style={{ justifyContent: 'center',padding:0 }}>
                <Link to={`/employeedetail/${tile.uid}`}><Button size="small" color="primary"
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
  <div className="col-xs-12 col-sm-6 col-md-3" style={{ padding: '10px'} }>
      <Card className={classes.card} style={{height:253}}>
         
      <CardActions style={{ justifyContent: 'center',padding:46,backgroundColor:'#d8d8f1' }}>
      <Button aria-label="Add" style={{ backgroundColor:"#d8d8f1"}} onClick={this.handleEmployeeEdit}  >
<AddIcon variant='fab' style={{fontSize:75}} />

</Button>
{this.state.employeeEdit ?
              <EmployeeAdd open={this.state.employeeEdit} handleClose={this.handleEmployeeEditcolse} /> :
              null
            }
   <br/>

      </CardActions>
      <CardContent>

<Typography gutterBottom variant="headline" component="h2">
                   Add Employee
                  </Typography>
      </CardContent>
    </Card>
   </div>
        {this.state.showComponent ?
          <Employeeimage name={this.state.empdetails.empname} key={this.state.empdetails.key} image={this.state.empdetails.empimg} /> :
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

export default withStyles(styles)(Employee);
