import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ProjectEdit from '../Employee/EmployeeEdits/ProjectEdit.js';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class  FloatingActionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      
      projectEdit: false,
      
     
      prjdetails: {
        prjname: '',
        prjdescription: '',
        key: ''
      }
    };
    this.handleProjectEdit = this.handleProjectEdit.bind(this);
    this.handleProjectEditcolse = this.handleProjectEditcolse.bind(this);
}

    handleProjectEdit() {
        console.log("basic edit function")
        console.log(this.state.projectEdit)
        this.setState({
          projectEdit: true,
      
        })
    
      }
    handleProjectEditcolse() {

        console.log("handleBasicEditcolse")
    
        this.setState({
          projectEdit: false,
        })
    
      }
      render(){
  const { classes } = this.props;
  return (
    <div>
 
      <Button variant="extendedFab" aria-label="Add"  onClick={this.handleProjectEdit} className={classes.button}>
        <AddIcon className={classes.extendedIcon} />
       Add New Project
      </Button>
      {this.state.projectEdit ?
              <ProjectEdit open={this.state.projectEdit} handleClose={this.handleProjectEditcolse} /> :
              null
            }
    </div>
  );
}
}
FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);