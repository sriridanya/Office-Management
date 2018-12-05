import React,{Component} from 'react';
import RecruitmentList from './Recuitmenttable'

class Recruitment extends Component{ 
   
    // componentDidMount() {
    //     this.props.navhandler('Recruitment')
    //   }
    render(){
        return(
            <div style={{display:"flex",flexDirection:"column"}}>
                 <div style={{marginTop:"20px"}}>
           <RecruitmentList/>
           </div> 
            </div>
        );
    }
}
export default Recruitment;