import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Signup from '../signup/signup'

import { Icon } from 'react-icons-kit'

import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';

import HomeIcon from '@material-ui/icons/Home';
import EmployeeIcon from '@material-ui/icons/SupervisorAccount';
import ProjectIcon from '@material-ui/icons/BusinessCenter';
import RecruitmentIcon from '@material-ui/icons/AssignmentInd';
import { NavLink } from 'react-router-dom'
import {user_circle} from 'react-icons-kit/ikons/user_circle'
import {withRouter} from 'react-router-dom'
import {mail2} from 'react-icons-kit/icomoon/mail2'




import Cookies from 'js-cookie';


//////////////////////////////////////////////////////////////

import LogoutIcon from '@material-ui/icons/ExitToApp';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import { Route, Switch } from 'react-router-dom';
import Hrhomepage from '../HR/HR-homepage';
import Dashboard from '../Dashboard/Dashboard';
import EmployeeDetails from '../Employee/EmployeeDetails/EmployeeDetails';
import Project from '../Project/Project';
import Calenderevents from '../calenderevents/events';
import Recruitment from '../Recruitment/Recruitment'
import Employee from '../Employee/Employee';
//import Admin from '../admin/sample';
import Progress from '../progress'
import da from '../Recruitment/adminaccesscontroller'
import Employeehomepage from '../workers/employeehomepage'
import Notification from '../Recruitment/notification'
import {calendar} from 'react-icons-kit/ikons/calendar'
import {connect} from 'react-redux';
 import * as firbase from "firebase"



import logo from '../../ZyudlyLabs.png'
import { Connect } from 'indefinite-observable';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    background:"#fff"
  },
  noti:{
    //float: center;
    /* width: 200px; */
    color: 'red',
    /* background-color: yellow; */
    position: 'absolute',
    left: '1400px',
    bottom: '18px'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    height:"740px",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class MiniDrawer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        mobileOpen: false,
        navtitile: "Office Management ",
        email:'',
        password:'',
        HR_admin:da.HR_admin,
        Main_Admin:da.Main_Admin,
        HR:da.HR,
        zyudly_empolyee:da.Empolyee,
        progress:false,
        notification:false,
        status:[]
        ,length:''
          };
        this.handleAppBar = this.handleAppBar.bind(this)
        this.notification=this.notification.bind(this);
        this.notificationclose=this.notificationclose.bind(this);
        this.update=this.update.bind(this);
      }

      notification(){
      
        this.setState({ notification: !this.state.notification });
      
      
      
      }
      notificationclose(){
       // console.log('na aaaaaaaa')
        this.setState({ notification: !this.state.notification });
      }



      update(){
        var _this=this
        //var empList=[]

   // console.log("running")

   var db=firbase.firestore()

    var c=[];
    db.collection("hr").where("employeeid", "==", Cookies.get('token'))
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
         
         if(doc.data().notification===''){

            c.push({
              'status':doc.data().status,
              'id':doc.data().id
            })
          }           
             });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    })

    setTimeout(() => {
      _this.setState({
        status:c,
        length:c.length
      })
      console.log("here"+_this.state.status) 
   console.log("here"+_this.state.status.length) 
    },2000)
      }





      
      componentWillMount(){ 
        var _this=this
         var empList=[]

    // console.log("running")

    var db=firbase.firestore()

//  const settings = {/* your settings... */ timestampsInSnapshots: true};
//  db.settings(settings);

//alert(Cookies.get('token'))



  //   var c=[];
  //   db.collection("hr").where("employeeid", "==", Cookies.get('token'))
  //   .get()
  //   .then(function(querySnapshot) {
  //       querySnapshot.forEach(function(doc) {
  //        // alert(doc.data().status)

  //        if(doc.data().notification===''&& doc.data().status !==''){

         
  //           c.push({
  //             'status':doc.data().status,
  //             'id':doc.data().id
  //           })
  //         }           
  //            });
  //   })
  //   .catch(function(error) {
  //       console.log("Error getting documents: ", error);
  //   })

  //   setTimeout(() => {
  //     _this.setState({
  //       status:c,
  //       length:c.length
  //     })
  //     console.log("here"+_this.state.status) 
  //  console.log("here"+_this.state.status.length) 
  //   },2000)
    var docRef=db.collection("zyudlyemployee")


    //var docRef = db.collection("cities").doc("SF");
    docRef.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
       //    console.log(doc.data());
         // console.log('array data'+doc.data().id)
         
          empList.push(doc.data())
      });
     setTimeout(()=>{console.log('empList'),console.log(empList)},2000)  
    setTimeout(()=>{ _this.props.dispatch({
      type:'ZYUDLY_EMPLOYEE',
      empList});},1000)  
   




     })
       
        setTimeout(() => _this.setState({email:Cookies.get('email')}), 1000)
        setTimeout(() =>  _this.setState({password:Cookies.get('password')}), 1000)
        setTimeout(() =>  {console.log(this.state.email)
         // setTimeout(() =>  this.setState({progress:true}), 3000)
        console.log(_this.state.password)}, 3000)

    // var  HR_admin={
    //   email:'gopinathsiva49@gmail.com',
    //  // password:'9962141518'
    // }


   
    // const settings = {/* your settings... */ timestampsInSnapshots: true};
    // db.settings(settings);
  
   


    
      
    }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };


  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  handleAppBar = (title) => {
    this.setState({ navtitile: title })
  }

  render() {
    const { classes, theme } = this.props;
    

//console.log("ssss"+this.props.allowed);
var recruitment = <NavLink style={{textDecoration: 'none'}} to='/recruitment'>
<ListItem button>
  <ListItemIcon>
  <RecruitmentIcon />
  </ListItemIcon>
  <ListItemText primary="Recruitment" />
</ListItem>
</NavLink>
  var employee=<NavLink style={{textDecoration: 'none'}} to='/employee'>
  <ListItem button>
    <ListItemIcon>
    <EmployeeIcon />
    </ListItemIcon>
    <ListItemText primary="Employee" />
  </ListItem>
  </NavLink>
  var project=<NavLink style={{textDecoration: 'none'}} to='/project'>
  <ListItem button>
    <ListItemIcon>
    <ProjectIcon />
    </ListItemIcon>
    <ListItemText primary="Projects" />
  </ListItem>
  </NavLink>

var hrpage=<NavLink style={{textDecoration: 'none'}} to='/HR'>
<ListItem button>
<ListItemIcon>


   <Icon icon={calendar}  size={18} />

</ListItemIcon>
<ListItemText primary="hr" />
</ListItem>
</NavLink>
user_circle

var employeehomepage=<NavLink  style={{textDecoration: 'none'}} to='/workers'>
<ListItem button>
<ListItemIcon>
<Icon icon={user_circle}  size={18} />
</ListItemIcon>
<ListItemText primary="workers" />
</ListItem>
</NavLink>

//var Calenderevents=


if (this.state.Main_Admin===this.state.email) {

  var employee1=employee;
  var project1=project;
  var recruitment1=recruitment;
  var hrpage1=hrpage;
  var employeehomepage1=employeehomepage
//  var Calenderevents1=Calenderevents
}else if( this.state.email===this.state.HR){
  var employee1=employee;
  //var project1=project;
  var recruitment1=recruitment;
  var hrpage1=hrpage;
  var employeehomepage1=employeehomepage
}
else if(this.state.HR_admin===this.state.email){
  var employee1=employee;
  var recruitment1=recruitment;
  var employeehomepage1=employeehomepage
}else if(this.state.zyudly_empolyee===this.state.email){
  var recruitment1=recruitment;
  var employeehomepage1=employeehomepage

}
 else {
  var button = null
}





    
const drawer=(
   <Drawer
    variant="permanent"
    classes={{
    paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
    }}
    open={this.state.open}>
        
   <div className={classes.toolbar}>
   

   <img src={logo} alt="logo" height="70%" width="60%"  style={{  paddingTop:15,  paddingBottom: 15,marginLeft:20, marginRight:20}}/>

    <IconButton onClick={this.handleDrawerClose}>
    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </IconButton>
    </div>
    <Divider />
   
    <List>

  <NavLink  style={{textDecoration: 'none'}} to='/'>
    <ListItem button>
    <ListItemIcon>
    <HomeIcon />
    </ListItemIcon>
    <ListItemText primary="Dashboard" />
    </ListItem>
    </NavLink>

    

   
    {employee1}
    {project1}
    {recruitment1}
    {hrpage1}
    {employeehomepage1}

    {this.state.Main_Admin===this.state.email&&

<NavLink  style={{textDecoration: 'none'}} to='/calenderevents'>
  <ListItem button>
  <ListItemIcon>
  <Icon icon={mail2}  size={18} />
  </ListItemIcon>
  <ListItemText primary="Calenderevents" />
  </ListItem>
  </NavLink>
    }
     {/* {Calenderevents1}  */}


    </List>
  
    <Divider />   
    <List>
    <ListItem button onClick={this.props.onlogout}  >
    <ListItemIcon>
    <LogoutIcon />
    </ListItemIcon>
    <ListItemText  primary="Logout" />
    </ListItem>
    </List>
    </Drawer>
     )

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar disableGutters={!this.state.open}>
        
          <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={this.handleDrawerOpen}
          className={classNames(classes.menuButton, this.state.open && classes.hide)}>
          <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" noWrap>
        
          {this.state.navtitile}
        
          
          </Typography>
          <div className={classes.noti}>
          <Badge className={classes.margin} onClick={this.notification}    badgeContent={this.state.length} color="primary">
          <MailIcon />
        </Badge>
        </div>
          </Toolbar>
          </AppBar>
         
          {drawer}
          <main className={classes.content}>
          <div className={classes.toolbar} />
         
          <Switch>
            <Route exact path="/"    render={(props) => <Dashboard {...props}  navhandler={this.handleAppBar} />}/>
            <Route exact path="/employee"  render={(props) => <Employee {...props} navhandler={this.handleAppBar} />} />
            <Route exact path="/employeedetail/:id" render={(props) => <EmployeeDetails {...props} navhandler={this.handleAppBar} />} />
            <Route exact path="/project" render={(props)=><Project {...props} navhandler={this.handleAppBar}/>}/>
          <Route exact path='/recruitment' render= {(props)=><Recruitment {...props} navhandler={this.handleAppBar}/>}/> 
          <Route exact path='/HR' render= {(props)=><Hrhomepage {...props} navhandler={this.handleAppBar}/>}/> 
          <Route exact path='/workers' render= {(props)=><Employeehomepage {...props} navhandler={this.handleAppBar}/>}/> 
           <Route exact path='/signup' render= {(props)=><Signup {...props} navhandler={this.handleAppBar}/>}/> 
           <Route exact path="/calenderevents" render={(props)=><Calenderevents {...props} navhandler={this.handleAppBar}/>}/>
                  
                  </Switch> 
        </main>
        <div>
         
        </div>
        {this.state.notification ? <Notification    {...this.props} handleclose={this.notificationclose}   reasons={this.state.status} update={this.update}/> : null}
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withRouter(connect() (withStyles(styles, { withTheme: true })(MiniDrawer)))