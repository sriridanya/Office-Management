import React,{Component} from 'react';
import RecruitmentList from './RecruitmentList'
import AddCandidate from './AddCandidate'
class Recruitment extends Component{ 
   
    componentDidMount() {
        this.props.navhandler('Recruitment')
      }
    render(){
        return(
            <div>
           <AddCandidate/>
           <RecruitmentList/>
            </div>
        );
    }
}
export default Recruitment;