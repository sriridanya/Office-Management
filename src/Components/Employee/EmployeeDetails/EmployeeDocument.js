import React from 'react';


import Grid from '@material-ui/core/Grid';
import DocumentFullView from './DocumentFullView';
class EmployeeDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showComponent: false,
        key:{},
        
            docimg:{},
          }
          
    
        this._onButtonClick = this._onButtonClick.bind(this);
    
      }

   
      _onButtonClick(doc,index) {
        this.setState({
          showComponent: true,
          docimg:doc.img,
          key:index
         
        });
    
      }
  

  render() {
    
 
    return (
      <div>
          <Grid item xs={12} sm container>
{this.props.empdoc.map((doc,index)=>(
    <div key={index} className="col-4"style={{float:"left"}}>

        <img src={doc.img} width="158" height="158"  onClick={()=>{this._onButtonClick(doc,index)}}/>
       
    </div>

)
)
}

     {this.state.showComponent ?
          <DocumentFullView img={this.state.docimg}key={this.state.key}  />:
           null
        } 
        
       
      
        </Grid>
      </div>
    );
  }
}


export default EmployeeDocument;
