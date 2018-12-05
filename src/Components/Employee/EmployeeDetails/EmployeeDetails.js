import React, { Component } from "react";
// import employeedata from "../employeedata";
// import empdata from '../employeedata'
// import {Link}from "react-router-dom"; 
import BasicEdit from '../EmployeeEdits/BasicEdit'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import EditIcon from '@material-ui/icons/Create';
import EmployeeProject from './EmployeeProject';
import EmployeeDocument from './EmployeeDocument';
import AddIcon from '@material-ui/icons/AddCircle';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import ProjectEdit from '../EmployeeEdits/ProjectEdit';
import DocumentEdit from '../EmployeeEdits/DocumentEdit';
import AddressEdit from '../EmployeeEdits/AddressEdit';
// import {connect} from 'react-redux';
import * as firbase from "firebase"

const styles = theme => ({
  root: {
    overflow: 'hidden',

    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  paper: {

    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,

  },
  wrapper: {
    maxWidth: 800,
  },
  image: {
    width: 158,
    height: 158,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

class EmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      basicEdit: false,
      projectEdit: false,
      documentEdit: false,
      addressEdit: false,
      employeedetail:{},
      Id:1,
      empdoc:[],
      id: '',
      prjdetails: {
        prjname: '',
        prjdescription: '',
        key: ''
      }
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    this._onButtonClose = this._onButtonClose.bind(this);
    this.handleBasicEdit = this.handleBasicEdit.bind(this);
    this.handleBasicEditcolse = this.handleBasicEditcolse.bind(this);
    this.handleProjectEdit = this.handleProjectEdit.bind(this);
    this.handleProjectEditcolse = this.handleProjectEditcolse.bind(this);
    this.handleDocumentEdit = this.handleDocumentEdit.bind(this);
    this.handleDocumentEditcolse = this.handleDocumentEditcolse.bind(this);
    this.handleAddressEdit = this.handleAddressEdit.bind(this);
    this.handleAddressEditcolse = this.handleAddressEditcolse.bind(this);
  }

  _onButtonClick(prj, index) {
    this.setState({
      showComponent: true,
      prjdetails: { prjname: prj.project_name, prjdescription: prj.Project_description, key: index }

    });

  }
  _onButtonClose() {
    this.setState({
      showComponent: false,

    });

  }
  handleBasicEdit() {
    console.log("basic edit function")
    console.log(this.state.basicEdit)
    this.setState({
      basicEdit: true,
   
    })
    // setInterval(this.handleBasicEditcolse,1000)
    // console.log(this.state.basicEdit)
    //this.handleBasicEdit()
  }
  handleProjectEdit(Id) {
    console.log("basic edit function")
    console.log(this.state.projectEdit)
    this.setState({
      projectEdit: true,
      id: Id
    })

  }
  handleBasicEditcolse() {

    console.log("handleBasicEditcolse")

    this.setState({
      basicEdit: false,
    })

  }
  handleProjectEditcolse() {

    console.log("handleBasicEditcolse")

    this.setState({
      projectEdit: false,
    })

  }
  handleDocumentEdit() {
    console.log("basic edit function")
    console.log(this.state.projectEdit)
    this.setState({
      documentEdit: true,

    })

  }
  handleDocumentEditcolse() {

    console.log("handleBasicEditcolse")

    this.setState({
      documentEdit: false,
    })

  }
  handleAddressEdit() {
    console.log("basic edit function")
    console.log(this.state.addressEdit)
    this.setState({
      addressEdit: true,
     
    })
  }
  handleAddressEditcolse() {

    console.log("handleBasicEditcolse")

    this.setState({
      addressEdit: false,
    })

  }
  componentDidMount(){
    this.props.navhandler('Employee Information')
  }
  componentWillMount() {
  
      var _this=this;
      var empList={};
      var docList=[];
      console.log("running")
      var db=firbase.firestore()
      var empRef = db.collection('zyudlyemployee').doc(this.props.match.params.id);
      empRef.get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
            } 
            else {
              console.log('Document data:', doc.data());
              empList=doc.data();

              console.log("new data",_this.state.employeedetail)
            
            }
            console.log("test data",empList)
            _this.setState({employeedetail:empList})
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
      
       var docRef=empRef.collection('Documents')
          // console.log("new data",_this.state.employeedetail)
          docRef.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                docList.push(doc.data())
                _this.setState({empdoc:docList})
            });
           
        });
    
  }
        
  render() {
    const { classes } = this.props;
    // const Id = this.props.match.params.id;

    return (

      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Paper className={classes.paper}>
            <Grid container alignItems="center" wrap="nowrap" spacing={16}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={this.state.employeedetail.img} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography align='left' style={{ padding: 2 }} gutterBottom variant="headline">
                      Basic Information
              </Typography>
                    <Grid item xs  >
                      <Typography align='left' style={{ padding: 2 }} variant="title">{this.state.employeedetail.emp_name}</Typography>
                      <Typography align='left' style={{ padding: 2 }} variant="subheading" >{this.state.employeedetail.email}</Typography>
                      <Typography align='left' style={{ padding: 2 }} variant="subheading">{this.state.employeedetail.mobile}</Typography>
                    </Grid>
                  </Grid>

                </Grid>
                <Grid item>
                  <EditIcon variant='fab' onClick={() => this.handleBasicEdit()} />
                </Grid>

              </Grid>

            </Grid>
            {this.state.basicEdit ?
              <BasicEdit Id={this.state.employeedetail} open={this.state.basicEdit} handleClose={this.handleBasicEditcolse} /> :
              null
            }

          </Paper>
          <Paper className={classes.paper}>
            <Typography gutterBottom variant="headline" align="left"> Project Works
           <AddIcon onClick={this.handleProjectEdit} style={{ float: "right" }} /></Typography>


            <Grid item xs={12} sm container>
            
                <div className="col-6" style={{ float: "left" }}>

                  <Typography align='left' variant='subheading' >project list</Typography>
                </div>

        
            </Grid>
            {this.state.projectEdit ?
              <ProjectEdit Id={this.state.id} open={this.state.projectEdit} handleClose={this.handleProjectEditcolse} /> :
              null
            }


          </Paper>
          <Paper className={classes.paper}>
            <Typography gutterBottom variant="headline" align="left"> Documents
           <AddPhotoIcon onClick={this.handleDocumentEdit} style={{ float: "right" }} /></Typography>
     <EmployeeDocument empdoc={this.state.empdoc} /> 


            {this.state.documentEdit ?
              <DocumentEdit open={this.state.documentEdit} handleClose={this.handleDocumentEditcolse} /> :
              null
            }

          </Paper>
          <Paper className={classes.paper}>
            <Typography gutterBottom variant="headline" align="left"> Address
           <EditIcon onClick={() => this.handleAddressEdit(this.props.match.params.id)} style={{ float: "right" }} /></Typography>


            <Grid item xs  >
              <Typography align='left' style={{ padding: 2 }} variant="subheading">{this.state.employeedetail.address}</Typography>
              {/* <Typography align='left' style={{ padding: 2 }} variant="subheading" >{employeedata[Id - 1].address.city}</Typography>
              <Typography align='left' style={{ padding: 2 }} variant="subheading">{employeedata[Id - 1].address.state
              }</Typography> */}
            </Grid>
            {this.state.addressEdit ?
              <AddressEdit Id={this.state.employeedetail} open={this.state.addressEdit} handleClose={this.handleAddressEditcolse} /> :
              null
            }



          </Paper>
          {this.state.showComponent ?
            <EmployeeProject open={this.state.showComponent} handleClose={this._onButtonClose} prjname={this.state.prjdetails.prjname} key={this.state.prjdetails.key} prjdetail={this.state.prjdetails.prjdescription} /> :
            null
          }
        </div>
      </div>

    );
  }
}
EmployeeDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EmployeeDetails)