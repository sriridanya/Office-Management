import React from 'react';
import Stepper from 'react-stepper-horizontal';
import Rejected from './rejected';
import { FaBeer } from 'react-icons/fa';



class HorizontalLinearStepper extends React.Component {
  constructor(props) {
    super(props)

    console.log("skilllllll"+props.status)
    this.state = {

      status:props.status,
     
     no:'',
     rejected:false,

     Selected:'Selected',
     engineer:'Engineer-Review',
     hr:'HR-Review'
     
    
    };


  
   
  }



   componentWillMount() {
     
    switch (this.state.status) {
      case "Waiting for Verfication":
      this.setState({no:0})
      break;

      case "HR-Review":
      this.setState({no:1})
      break;

      case "HR-Rejected":
      this.setState({no:1,hr:this.state.status})
      break;
  
      case "Engineer-Review":
      this.setState({no:2})
      break;

      case "Engineer-Rejected":
      this.setState({no:2,engineer:this.state.status})
      break;

      
      case "Interview Schedule":
      this.setState({no:3})
      break;
      
      case "Selected":
      this.setState({no:4,Selected:this.state.status})
      break;

      case "Rejected":
      this.setState({no:4,Selected:this.state.status,rejected:true})
      break;
      
      default:
      this.setState({no:3,
      rejected:true
      });
    }

    console.log('noss'+this.state.no);

   
  }
  
  render() {
    console.log('no'+this.state.no)
    
      return (
        <div>
        
          <Stepper activeColor='#1aa32a' completeColor ='#1aa32a' steps={ [{title: 'Waiting for Verfication'}, {title:this.state.hr}, {title: this.state.engineer}, {title: 'Interview Schedule'},{title:this.state.Selected}] } activeStep={ this.state.no } />
          {this.state.rejected ? <Rejected/>:null}
        </div>
      );
    
  }
}


export default HorizontalLinearStepper;



