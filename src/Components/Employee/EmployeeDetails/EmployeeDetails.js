import React,{ Component } from "react";
import employeedata from "../employeedata";
// import empdata from '../employeedata'
// import {Link}from "react-router-dom"; 
import BasicEdit from '../EmployeeEdits/BasicEdit'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import EditIcon from '@material-ui/icons/Create'
import EmployeeProject from './EmployeeProject'
import EmployeeDocument from './EmployeeDocument'
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
  
class EmployeeDetails extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      basicEdit:false,
    id:'',
      prjdetails:{
        prjname:'',
        prjdescription:'',
        key:''
      }
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    
    this.handleBasicEdit=this.handleBasicEdit.bind(this);
  }

  _onButtonClick(prj,index) {
    this.setState({
      showComponent: true,
      prjdetails:{prjname:prj.project_name,prjdescription:prj.Project_description,key:index}
     
    });

  }
 
  handleBasicEdit(Id){
    this.setState({
      basicEdit: true,
      id:Id});
  }
render(){
    const { classes } = this.props;
const Id=this.props.match.params.id;

    return(
     
        <div className={classes.root}>
        <div className={classes.wrapper}>
  <Paper className={classes.paper}>
      <Grid container alignItems= "center"wrap="nowrap" spacing={16}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="complex" src={employeedata[Id-1].img} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
            <Typography align='left'  style={{padding:2}} gutterBottom variant="headline">
                Basic Information
              </Typography>
              <Grid item xs  >
              <Typography align='left' style={{padding:2}} variant="title">{employeedata[Id-1].emp_name}</Typography>
              <Typography align='left'  style={{padding:2}}variant="subheading" >{employeedata[Id-1].email}</Typography>
              <Typography align='left'   style={{padding:2}}variant="subheading">{employeedata[Id-1].mobile}</Typography>
            </Grid>
            </Grid>
         
          </Grid>
          <Grid item>
           <EditIcon  onClick={() => this.handleBasicEdit(Id)}/>
          </Grid>
         
        </Grid>
        
      </Grid>
      {this.state.basicEdit ?
          <BasicEdit Id={this.state.id} />:
           null
        } 
    </Paper>
<Paper className={classes.paper}>
<Typography gutterBottom variant="headline" align="left"> Project Works 
           <EditIcon style={{float:"right"}}/></Typography>

         
<Grid item xs={12} sm container>
{employeedata[Id-1].project.map((prj,index)=>(
    <div key={index} className="col-6"style={{float:"left"}}>

        <Typography align='left' variant='subheading' onClick={()=>{this._onButtonClick(prj,index)}}>{prj.project_name}</Typography>
    </div>

)
)
}

</Grid>

        
      
</Paper>
<Paper className={classes.paper}>
<Typography gutterBottom variant="headline" align="left"> Documents
           <EditIcon style={{float:"right"}}/></Typography>
<EmployeeDocument empdoc={employeedata[Id-1].document}/>
         


        
      
</Paper>
<Paper className={classes.paper}>
<Typography gutterBottom variant="headline" align="left"> Address
           <EditIcon style={{float:"right"}}/></Typography>

         
         <Grid item xs  >
              <Typography align='left' style={{padding:2}} variant="subheading">{employeedata[Id-1].address.street_address}</Typography>
              <Typography align='left'  style={{padding:2}}variant="subheading" >{employeedata[Id-1].address.city}</Typography>
              <Typography align='left'   style={{padding:2}}variant="subheading">{employeedata[Id-1].address.state
              }</Typography>
            </Grid>
 
        
      
</Paper>
{this.state.showComponent ?
  <EmployeeProject prjname={this.state.prjdetails.prjname} key={this.state.prjdetails.key} prjdetail={this.state.prjdetails.prjdescription} />:
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
export default withStyles(styles) (EmployeeDetails);