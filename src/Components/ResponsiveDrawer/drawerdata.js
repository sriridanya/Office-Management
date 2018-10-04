import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import EmployeeIcon from '@material-ui/icons/SupervisorAccount';
import ProjectIcon from '@material-ui/icons/BusinessCenter';
import PayrollIcon from '@material-ui/icons/AccountBalanceWallet';
import ForumIcon from '@material-ui/icons/Forum';
import SettingsIcon from '@material-ui/icons/Settings';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { NavLink } from 'react-router-dom'
export const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <NavLink exact to='/'><ListItemText primary="Dashboard" /></NavLink>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EmployeeIcon />
      </ListItemIcon>
      <NavLink to={
        {
          pathname: '/employee'
        }
      }  > <ListItemText primary="Employee" /></NavLink>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ProjectIcon />
      </ListItemIcon><NavLink to={
        {
          pathname: '/project'
        }
      }  >
      <ListItemText primary="Projects" /></NavLink>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PayrollIcon />
      </ListItemIcon>
      <ListItemText primary="Payroll" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ForumIcon />
      </ListItemIcon>
      <ListItemText primary="Forum" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);
