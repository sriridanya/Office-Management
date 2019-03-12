
import React,{Component} from 'react';
import RecruitmentList from './employeecalender'
class Recruitment extends Component{ 
   
    componentDidMount() {
        this.props.navhandler('EMPLOYEE')
      }
    render(){
        return(
            <div style={{display:"flex",flexDirection:"column",width:"100%",height:"100%"}}>
                 <div style={{marginTop:"20px"}}>
           <RecruitmentList/>
           </div> 
            </div>
        );
    }
}
export default Recruitment;