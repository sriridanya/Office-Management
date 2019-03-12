import React, { Component } from 'react';
//import Calendar from 'react-calendar';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import moment from "moment";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

import { DatePicker } from 'material-ui-pickers';

import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import "react-datepicker/dist/react-datepicker.css";
import Typography from '@material-ui/core/Typography';

import Cookies from 'js-cookie';
//import { DatePicker } from 'material-ui-pickers';
import * as firebase from 'firebase';
//import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import Calendar from "react-big-calendar";
import Holidays from '../HR/holiday'
import Holidayremove from '../HR/holidays_remove'
import da from '../Recruitment/adminaccesscontroller'
//const DraggableCalendar = withDragAndDrop(BigCalendar)

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = Calendar.momentLocalizer(moment) 

const views=['month','week', 'day', 'agenda']
//const event=[];

// const empolyeename=[
// {
  
//         value: 'hr-admin',
//         label: 'hr-admin',
//       },
//       {
//         value: 'arun',
//         label: 'arun',
//       },

// ]
const styles =  {
  root:{
    // height:'100%',
    // paddingBottom:"50%"
  },
  card:{
    width:'35%',
    height:"80%",
    position:'fixed',
    left:'30%',
 
  },

  container: {
    width:'500px',
    color:'red',
  }
  ,fromdate:{
    width:'100%'

  },
  type:{
    color:"red",
    float:'left'
  },
  type1:{
    color:"red",
    float:'center',
    marginLeft:'10px'
  }
}


 
class MyApp extends Component {
  constructor(props) {
    super(props)
  this.state = {
    title:'',
    Reason:'',
    start:'',
    end:'',
    holiday:false,
    startDate: moment(),
    enddate:moment(),
    events:[],
    removing:false,
    id:''
    
  }
  //this.onChange=this.onChange.bind(this)
  this.onChange1=this.onChange1.bind(this)
  this.handleAddressEditcolse=this.handleAddressEditcolse.bind(this)
  this.onChange2=this.onChange2.bind(this)
  this.procced=this.procced.bind(this)
  this.handleChange = this.handleChange.bind(this);
  this.handleChange1 = this.handleChange1.bind(this);
  this.update=this.update.bind(this)
  this.removeevent=this.removeevent.bind(this)
  this.handleremove=this.handleremove.bind(this)
  this.resizeEvent=this.resizeEvent.bind(this)
}


removeevent(e){
  //alert(e.id)
  this.setState({ removing:true,id:e.id})
}



onChange1(e){
  this.setState({ title:e.target.value })
}


resizeEvent(event){

  const db = firebase.firestore();
  
  var start=event.start.toString();
  var end=event.end.toString();
  var id=event.event.id;
  //  const settings = {/* your settings... */ timestampsInSnapshots: true};
  //  db.settings(settings);
   var basicRef = db.collection('holidays').doc(id);
   var updateMany = basicRef.update({
     start:start,
     end:end
   })
   return updateMany.then(res => {
    this.update()
  
  } )
  
  
  }


handleremove(){
  this.setState({removing:false})
}



componentDidMount(){
  //var _this=this
  const ss=[]
 // this.props.navhandler('HR')
  
  
  const db = firebase.firestore();
  //  const settings = {/* your settings... */ timestampsInSnapshots: true};
  //         db.settings(settings);
  
  db.collection("holidays")
  .get()
  .then(function(querySnapshot) {
  
  querySnapshot.forEach(function(doc) {
  
  ss.push(doc.data())
  
  });
  
  }).then(()=>{

  this.setState({
    events:ss
    })
  })
  .catch(function(error) {
  // console.log("Error getting documents: ", error);
  });  
  }
  
  


componentWillMount(){

 
 
 
  var db=firebase.firestore()



 // alert( Cookies.get('token'))
  
  
  
      var c;
      db.collection("zyudlyemployee").where("employee_id", "==", Cookies.get('token'))
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            //alert(doc.data().emp_name)
              c=doc.data().emp_name
                      
               });
      }).then(()=>{
        this.setState({
          title:c
        })
      })
      .catch(function(error) {
          // console.log("Error getting documents: ", error);
      })
  
}

handleAddressEditcolse(){
  this.setState({
  holiday:false
  })
  }


onChange2(e){
  this.setState({ Reason:e.target.value })
}


handleChange(date) {

  this.setState({
    startDate: date
  });

}


handleChange1(date) {
 
  this.setState({
    enddate: date
  });

 
}




update(){
  this.componentDidMount()
}



handleSelect = ({ start, end }) => {

  

this.setState({
  holiday:true,
  start:start,
  end:end
  })

}


procced()
{



 
var date = new Date(this.state.enddate)

  var d=date.setDate(date.getDate()+1)

 var ending= new Date(d)

 
// // Add a day
// alert(date.setDate(date.getDate() + 1))



  const db = firebase.firestore();
  // const settings = {/* your settings... */ timestampsInSnapshots: true};
  //        db.settings(settings);
  var addDoc = db.collection('hr').doc();


 addDoc.set({
  title: this.state.title,
 start:this.state.startDate.toString().substring(0, 15),
 end:ending.toString().substring(0, 15),
 allDay:true,
 description:this.state.Reason,
 id:addDoc.id,
 employeeid:Cookies.get('token'),
 status:'',
 style: {
  backgroundColor: 
       "#75002b"
      
},
notification:''
 
  
 });

 

}
  render() 
 
  {


if(Cookies.get('email')===da.HR || Cookies.get('email')===da.Main_Admin)
{
  var calender;
  calender= <DragAndDropCalendar
    selectable={true}
    popupOffset={30}
      localizer={localizer}
      defaultDate={new Date()}
      startAccessor="start"
      defaultView="month"
      events={this.state.events}
      resizable
       onEventResize={this.resizeEvent}
       draggableAccessor={event =>true}
      views={views}
      onDoubleClickEvent = {this.removeevent}
      style={{ height: "80vh",width:'100%' }}
      step={30}
    onSelectSlot={this.handleSelect}
  //  onSelectSlot={this.newEvent}
    eventPropGetter={event => ({
      style: {
          backgroundColor: 
               "#78aad6"
              
      }
  })}


    />
}else{


   calender= <DragAndDropCalendar
  selectable={true}
  popupOffset={30}
    localizer={localizer}
    defaultDate={new Date()}
    startAccessor="start"
    defaultView="month"
    events={this.state.events}
   // resizable
    // onEventResize={this.resizeEvent}
     //draggableAccessor={event =>true}
    views={views}
    //onDoubleClickEvent = {this.removeevent}
    style={{ height: "80vh",width:'100%' }}
    step={30}
  //onSelectSlot={this.handleSelect}
//  onSelectSlot={this.newEvent}
  eventPropGetter={event => ({
    style: {
        backgroundColor: 
             "#78aad6"
            
    }
})}


  />

}



    const { classes } =this.props;
    const data={
      start:this.state.start,
      end:this.state.end
    }




    

    
    return (
      <div className={classes.root}>
       

     <div style={{width:'40%',marginTop:"20px",float:'left'}}>
        <Card >
      <CardContent>
      <Typography variant="title" align="center" color="primary"
      
      >
          leave form
        </Typography>
          <div className={classes.type1}>
      
        </div>
        <br/>
        <div className={classes.fromdate}>
        <div className={classes.type}>
        <Typography className={classes.pos}  variant="title" color="textSecondary">
          fromdate
        </Typography>
        </div>
        <div className={classes.type1}>


        
        
       <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker value={this.state.startDate}    onChange={this.handleChange} />

      </MuiPickersUtilsProvider>
           
       </div>
      </div>
      <br/>
      <br/>
      <br/>
      <div className={classes.fromdate}>
      <div className={classes.type}>
        <Typography className={classes.pos}  variant="title" color="textSecondary">
          todate
        </Typography>
        </div>
        <div className={classes.type1}>
      
     
     <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker value={this.state.enddate}   onChange={this.handleChange1} />

      </MuiPickersUtilsProvider>
        </div>
        </div>
        <br/>
        <br/>

         <TextField
          id="outlined-multiline-static"
          label="Reason"
          multiline
          rows="4"
          value={this.state.Reason}
          onChange={this.onChange2}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
            
            <br/>
        <br/>
        <Button variant="contained" color="secondary" onClick={this.procced} className={classes.button}>
        Apply
      </Button>
      
      </CardContent>
    </Card>
    </div>
    <div style={{float:'right',width:'58%'}} >


    {calender}

    {this.state.holiday ? <Holidays  open={this.state.holiday} handleClose={this.handleAddressEditcolse} update={this.update} datas={data} />:null}
                        
    {this.state.removing ? <Holidayremove  open={this.state.removing} handleClose={this.handleremove} update={this.update} ids={this.state.id} />:null}
                        
    
    
    </div>

    </div>
        
     
    );
  }
}



MyApp.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default  withStyles(styles)(MyApp)