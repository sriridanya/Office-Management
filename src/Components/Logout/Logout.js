import React,{Component} from 'react';

class Logout extends Component{ 
   

    render(){
        return(
            <div onLoad={()=>{this.props.loghandler()}}>
            
           
            </div>
        );
    }
}
export default Logout;