import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CandidateEdit from './CandidateEdit';

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
      
      
      candidateEdit: false,
      
     
      p: {
        candidatename: '',
        postapplied: '',
        key: ''
      }
    };
    this.handleCandidateEdit = this.handleCandidateEdit.bind(this);
    this.handleCandidateEditcolse = this.handleCandidateEditcolse.bind(this);
}

    handleCandidateEdit() {
        console.log("basic edit function")
        console.log(this.state.candidateEdit)
        this.setState({
          candidateEdit: true,
      
        })
    
      }
    handleCandidateEditcolse() {

        console.log("handleBasicEditcolse")
    
        this.setState({
          candidateEdit: false,
        })
    
      }
      render(){
  const { classes } = this.props;
  return (
    <div>
 
      <Button  variant="extendedFab" aria-label="Add" style={{ backgroundColor:"#fefefe"}} onClick={this.handleCandidateEdit} className={classes.button}>
        <AddIcon className={classes.extendedIcon} />
       Add New Candidate
      </Button>
      {this.state.candidateEdit ?
              <CandidateEdit open={this.state.candidateEdit} handleClose={this.handleCandidateEditcolse} /> :
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