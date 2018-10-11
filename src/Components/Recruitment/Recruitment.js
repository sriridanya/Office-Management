import React,{Component} from 'react';
import RecruitmentList from './RecruitmentList'
import AddCandidate from './AddCandidate'
class Recruitment extends Component{ 
   
    componentDidMount() {
        this.props.navhandler('Recruitment')
      }
    render(){
        return(
            <div style={{display:"flex",flexDirection:"column"}}>
                <div className=" adding" style={{float:"right"}}>
                <AddCandidate/>
                </div>
           <div style={{marginTop:"20px"}}>
           <RecruitmentList/>
           </div> 
            </div>
        );
    }
}
export default Recruitment;