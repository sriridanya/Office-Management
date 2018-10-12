import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Employee from '../Employee/Employee';
import { mailFolderListItems, otherMailFolderListItems } from './drawerdata';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import EmployeeDetails from '../Employee/EmployeeDetails/EmployeeDetails';
import Project from '../Project/Project';
import Recruitment from '../Recruitment/Recruitment'
import logo from '../../ZyudlyLabs.png'
// 
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;
// const log= this.props.onLogout
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',

  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class ResponsiveDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
      navtitile: "Office Management ",
      
    };
    this.handleAppBar = this.handleAppBar.bind(this)
  
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  handleAppBar = (title) => {
    this.setState({ navtitile: title })
  }

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <img src={logo} alt="logo" height="100px" width="150px" style={{    paddingBottom: 15,
    marginLeft:20, marginRight:20}}/>
        <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List >{otherMailFolderListItems}</List>
        <Divider/>
        <List>
        <ListItem button onClick={this.props.onLogout}  >
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
   
      <ListItemText  primary="Logout" />
     
    </ListItem>
    </List>
      </div>
    );

    return (
      <div className={classes.root} >
        <AppBar className={classes.appBar}>
          <Toolbar>

            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              {this.state.navtitile}
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>

          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>

        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content} style={{backgroundColor:"#efeff1"}}>

          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" render={(props) => <Dashboard {...props} navhandler={this.handleAppBar} />}/>
            <Route exact path="/employee" render={(props) => <Employee {...props} navhandler={this.handleAppBar} />} />
            <Route exact path="/employeedetail/:id" render={(props) => <EmployeeDetails {...props} navhandler={this.handleAppBar} />} />
            <Route exact path="/project" render={(props)=><Project {...props} navhandler={this.handleAppBar}/>}/>
          <Route exact path='/recruitment' render= {(props)=><Recruitment {...props} navhandler={this.handleAppBar}/>}/>
          </Switch>

        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);