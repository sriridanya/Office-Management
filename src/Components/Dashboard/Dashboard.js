import React,{Component} from 'react';
 import DashboardCardCount from './DashboardCardCount';
//  import DashboardGraph from './DashboardGraph';
import Line from './Line';
import Pie from './Pie';
import Card from '@material-ui/core/Card'


class Dashboard extends Component{ 
   
    componentDidMount() {
        this.props.navhandler('Dashboard')

      }
      
      
    render(){

        
        return(
            <div style={{height:"100%"}}>
            <DashboardCardCount/><br/>
            <Card style={{backgroundColor:'#fff'}}>
            <Line/>
            </Card>
            <br/>
            <Card style={{backgroundColor:'#fff'}}>
            <Pie/>
            </Card>
            </div>
        );
    }
}
export default Dashboard;