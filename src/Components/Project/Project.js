import React,{Component} from 'react';
import ProjectList from './ProjectList';
import AddProject from './AddProject';

class Project extends Component{ 
   
    componentDidMount() {
        this.props.navhandler('Project List')
      }
    render(){
        
        return(
            <div>
            <AddProject/>
            <ProjectList/>
           
            </div>
        );
    }
}
export default Project;