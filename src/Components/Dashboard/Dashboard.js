import React,{Component} from 'react';
 import DashboardCardCount from './DashboardCardCount';


class Dashboard extends Component{ 
   
    componentDidMount() {
        this.props.navhandler('Dashboard')
      }
    render(){
        return(
            <div style={{height:"100vh"}}>
            <DashboardCardCount/>
            </div>
        );
    }
}
export default Dashboard;