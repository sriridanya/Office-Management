import React, { Component } from 'react';
// import empdata from '../employeedata'
// import classNames from 'classnames';
import ReactDOM from 'react-dom';
import logo from '../../unnamed.png'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';



import classNames from 'classnames';

import SaveIcon from '@material-ui/icons/Save';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import compose from 'recompose/compose'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
//import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import * as firebase from 'firebase';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
//import Table from './table'
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    // maxWidth: '100%'
  },

  dia:{
width:'100%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  textField1: {
    //marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    //width: 200,
  },
  dense: {
    marginTop: 19,
  },
  smalltextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }

});






var value1=0;
var value2=0;
var value3=0;
var leave;
var identys;
// let Lopsss=0;


function ccyFormat(start,end,startmonthyear,endmonthyear,identy) {
  // alert(start)
  identys=identy
// var date1 = new Date(start);
// var date2 = new Date(end)

 var ends=new Date(identy).toLocaleDateString().substring(3, 5)
 


if(startmonthyear===endmonthyear)
{
 
var case1=Math.abs(start.substring(8, 10)-end.substring(8, 10))
value1=value1+case1

return case1
}else if(endmonthyear!==identy && startmonthyear===identy){

var month= new Date(start.substring(11, 15), ends, 0).getDate();
var s=Math.abs(start.substring(8, 10)-1)
//alert(s)
var case2= Math.abs(month-s)
//alert(case2)
value2=value2+case2
return case2
  
}else if(startmonthyear!==identy && endmonthyear===identy){
var  starts=0
 
 var case3= Math.abs(Math.abs(starts-end.substring(8, 10))-1)

 value3=value3+case3
  return case3
}

}







function add(){
 
 leave=value3+value2+value1
  return value3+value2+value1
}

function handle(){
  leave=0
   value1=0;
 value2=0;
 value3=0;
}

function LOP(){
  if(leave>2){
    return  Math.abs(leave-2)
  }
}

function final(amount){

  var year=new Date(identys).toLocaleDateString().substring(6, 10)
 
  var month=new Date(identys).toLocaleDateString().substring(3, 5)
 
   var days= new Date(year, month, 0).getDate();
  
   if(leave<=2){
     return Math.floor(amount).toFixed(2)
   }else if(leave>2){
   var sub= Math.abs(leave-2)
  
  //  Lop=Lop+sub;
 
   var onedaysalary=amount/days
 var p=sub*onedaysalary

return Math.floor(amount-p).toFixed(2)
   }
   else{
    // alert('hello')
   }


}


class BasicEdit extends Component {
  constructor(props) {
    super(props)
   // alert(props.id)
    this.state = {
      emp_name:'',
      address:'',
      email:'',
      img:'',
      mobile:'',
      array:[],
      open:true,
      Basic:'',
      Transport_Allowance:'',
      Hostel_EXP_Allowance:'',
      Special_Allowance:'',
      TDS:'',
      Professional_Tax_Deduction:'',
      monthyear:props.monthyear
    
    };
  
  }


  componentWillMount(){
  

var cc
    const db = firebase.firestore();
   // const settings = {/* your settings... */ timestampsInSnapshots: true};
     db.collection("zyudlyemployee").where("employee_id", "==", this.props.id)
    .get()
    .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

      if(doc.data().payslip){
      // console.log(doc.data())
      cc=doc.data()
      }else{
  
      }
    })}).then(()=> {

      var _this=this
      _this.setState({
        uid:cc.uid,
        emp_name:cc.emp_name,
        address:cc.address,
        email:cc.email,
        img:cc.img,
        mobile:cc.mobile,
          array:this.props.arrays,
          Basic:cc.payslip.Basic,
          Transport_Allowance:cc.payslip.Transport_Allowance,
          Hostel_EXP_Allowance:cc.payslip.Hostel_EXP_Allowance,
          Special_Allowance:cc.payslip.Special_Allowance,
          TDS:cc.payslip.TDS,
          Professional_Tax_Deduction:cc.payslip.Professional_Tax_Deduction, 
          })

    }
    
  )




      
  }

  render() {


    this.state.array.map((row,index) => {
      return ccyFormat(row.start.substring(0, 15),row.end.substring(0, 15),row.startmonthyear,row.endmonthyear,row.identy)
     })

    //var dot=<div style={{float:"left"}}><Typography variant="body2" gutterBottom>:</Typography></div>
     // alert(this.state.emp_name)
  
    const { classes } = this.props;
 

    // const lops=Lop

    
     add()
   // alert(identys)
    const noofdays=new Date(this.state.monthyear.substring(0,4), this.state.monthyear.substring(5,7), 0).getDate()
  //alert(this.state.monthyear.substring(0,4))
  //alert(this.state.monthyear.substring(5,7))
    const Salary=parseInt(this.state.Basic,10)+parseInt(this.state.Transport_Allowance,10)+parseInt(this.state.Special_Allowance,10)+parseInt(this.state.TDS,10)+parseInt(this.state.Professional_Tax_Deduction,10)
    return (


<Dialog
open={this.props.open}
maxWidth='100%'
//TransitionComponent={Transition}
keepMounted
onClose={ (event)=>{ this.props.handleClose(); handle()}}
//style={{width:'100%'}}

 aria-labelledby="alert-dialog-slide-title"
 aria-describedby="alert-dialog-slide-description"
>


<DialogContent>
<div>
                <div className="example-config">
                <Button variant="contained" size="small" className={classes.button} onClick={this.exportPDFWithComponent}>
        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
        Pdf
      </Button>
                    {/* <button className="k-button" onClick={this.exportPDFWithComponent}>Export with component</button> */}
                    {/* &nbsp;
                    <button className="k-button" onClick={this.exportPDFWithMethod}>Export with method</button> */}
                </div>

  <PDFExport ref={(component) => this.pdfExportComponent = component} paperSize="A4">
                   
               
<Paper className={classes.root}>
{/* <Paper className={classes.root}> */}

<div>
<DialogTitle align='center' variant='h3' >
<img src={logo} alt="logo" height="100%" width="100%"/>
 </DialogTitle>

  

<DialogTitle align='center' variant='h3' >
Salary Slip for the month {new Date(this.state.monthyear).toUTCString().substring(7,16)}
 </DialogTitle>

<div style={{float:"left",marginLeft:'8%'}}>

        <Typography variant="body2" gutterBottom>
        Employee Name -{this.state.emp_name}
        </Typography>
        <Typography variant="body2" gutterBottom>
        Designation	-
        </Typography>
        <Typography variant="body2" gutterBottom>
        Days in Month-{noofdays}
        </Typography>
        </div>

<div style={{float:"right",marginRight:'30%'}}>

        <Typography variant="body2" gutterBottom>
        Employee No-
        </Typography>
        <Typography variant="body2" gutterBottom>
        Date of Joining-
        </Typography>
        <Typography variant="body2" gutterBottom>
        LOP	-{LOP()}
        </Typography>
        </div>

        {/* </Paper> */}
        <br/>
        <br/>
        <br/>
        <br/>
        </div>
        
 <Paper className={classes.root}>

 
      <Table className={classes.table}>
        <TableHead>


          <TableRow>
            <TableCell style={{textAlign: 'center'}}>S.NO</TableCell>
            <TableCell numeric style={{textAlign: 'center'}}>Earnings / Deduction</TableCell>
          
            <TableCell numeric style={{textAlign: 'center'}}>Amount in Rupees</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {this.state.array.map((row,index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell >{row.start.substring(0, 15)}</TableCell>
                <TableCell >{row.end.substring(0, 15)}</TableCell>
                <TableCell >{ccyFormat(row.start.substring(0, 15),row.end.substring(0, 15),row.startmonthyear,row.endmonthyear,row.identy)}</TableCell>
              </TableRow>
            );
          })}  */}
           <TableRow>
            <TableCell  />   
            <TableCell style={{textAlign: 'center'}} >Total Leave</TableCell>
            <TableCell style={{textAlign: 'center'}} >{add()}</TableCell>
           </TableRow>
          <TableRow>
            <TableCell  />
            <TableCell  style={{textAlign: 'center'}}>Basic</TableCell>
           
            <TableCell style={{textAlign: 'center'}} >{this.state.Basic}</TableCell>
            {/* <TableCell numeric>{"ccyFormat(invoiceSubtotal)"}</TableCell>  */}
          </TableRow>
          <TableRow>
            <TableCell  />
            <TableCell  style={{textAlign: 'center'}}>HR Allowance</TableCell>
           
            <TableCell  style={{textAlign: 'center'}}>{this.state.Transport_Allowance}</TableCell>
            {/* <TableCell numeric>{"ccyFormat(invoiceSubtotal)"}</TableCell>  */}
          </TableRow>
          {/* <TableRow>
            <TableCell  />
            <TableCell >Hostel EXP Allowance</TableCell>
            <TableCell>-</TableCell> 
            <TableCell >{this.state.Hostel_EXP_Allowance}</TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell  />
            <TableCell style={{textAlign: 'center'}} >Special Allowance</TableCell>
           
            <TableCell style={{textAlign: 'center'}}>{this.state.Special_Allowance}</TableCell>
            {/* <TableCell numeric>{"ccyFormat(invoiceSubtotal)"}</TableCell>  */}
          </TableRow>
          <TableRow>
            <TableCell  />
            <TableCell style={{textAlign: 'center'}}>TDS</TableCell>
           
            <TableCell style={{textAlign: 'center'}}>{this.state.TDS}</TableCell>
            {/* <TableCell numeric>{"ccyFormat(invoiceSubtotal)"}</TableCell>  */}
          </TableRow>
          <TableRow>
            <TableCell  />
            <TableCell style={{textAlign: 'center'}} >Professional Tax Deduction</TableCell>
          
            <TableCell style={{textAlign: 'center'}}>{this.state.Professional_Tax_Deduction}</TableCell>
            {/* <TableCell numeric>{"ccyFormat(invoiceSubtotal)"}</TableCell>  */}
          </TableRow>
          <TableRow>
            <TableCell  /> 
            
            <TableCell style={{textAlign: 'center'}}>Salary</TableCell>
            <TableCell style={{textAlign: 'center'}}>{Salary}</TableCell>
            {/* <TableCell numeric>{"ccyFormat(invoiceSubtotal)"}</TableCell>  */}
          </TableRow>
          <TableRow>
            <TableCell  /> 
      
            <TableCell style={{textAlign: 'center'}}>Final Salary</TableCell>
            <TableCell style={{textAlign: 'center'}}>{final(Salary)}</TableCell>
            
          </TableRow>
          
        </TableBody>
      </Table>
    </Paper>
    </Paper>
    </PDFExport>
            </div>
</DialogContent>

</Dialog>
    );
  }
  exportPDFWithMethod = () => {
    savePDF(ReactDOM.findDOMNode(this.grid), { paperSize: 'A4' });
}
exportPDFWithComponent = () => {
    this.pdfExportComponent.save();
}

}




const mapStateToPropss = (state) => {

    return {
    posts1: state,
   
    }
    }

BasicEdit.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};





export default  compose(
    connect(mapStateToPropss),  withStyles(styles),
  withMobileDialog(),
)(BasicEdit);


//https://www.telerik.com/kendo-react-ui/components/pdfprocessing/