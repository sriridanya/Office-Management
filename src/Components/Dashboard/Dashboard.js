import React,{Component} from 'react';
 import DashboardCardCount from './DashboardCardCount';
//  import DashboardGraph from './DashboardGraph';
import Line from './Line';
import Pie from './Pie';


class Dashboard extends Component{ 
   
    componentDidMount() {
        this.props.navhandler('Dashboard')
      }
    render(){
        return(
            <div style={{height:"100vh"}}>
            <DashboardCardCount/><br/>
            
            <Line/>
            <Pie/>
            </div>
        );
    }
}
export default Dashboard;