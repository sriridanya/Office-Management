import React from 'react';


import Grid from '@material-ui/core/Grid';
import DocumentFullView from './DocumentFullView';
class EmployeeDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      key: {},

      docimg: {},
    }


    this._onButtonClick = this._onButtonClick.bind(this);
    this._onButtonClose = this._onButtonClose.bind(this)

  }


  _onButtonClick(doc, index) {
    this.setState({
      showComponent: true,
      docimg: doc.img,
      key: index

    });

  }


  _onButtonClose() {
    this.setState({
      showComponent: false,

    });

  }
  render() {


    return (
      <div>
        <Grid item xs={12} sm container>
          {this.props.empdoc.map((doc, index) => (
            <div key={index} className="col-4" style={{ float: "left" }}>

              <img src={doc.img} alt="document" width="158" height="158" onClick={() => { this._onButtonClick(doc, index) }} />

            </div>

          )
          )
          }

          {this.state.showComponent ?
            <DocumentFullView open={this.state.showComponent} handleClose={this._onButtonClose} img={this.state.docimg} key={this.state.key} /> :
            null
          }



        </Grid>
      </div>
    );
  }
}


export default EmployeeDocument;
