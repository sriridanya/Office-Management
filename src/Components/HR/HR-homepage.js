
import React,{Component} from 'react';

import Candiate from './candiate'
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import Calendar from "react-big-calendar";
import Form from './form'
import moment from 'moment'

import Paper from '@material-ui/core/Paper';
import CaRD from './cards'



import 'react-big-calendar/lib/css/react-big-calendar.css'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

//const DraggableCalendar = withDragAndDrop(BigCalendar)


const DragAndDropCalendar = withDragAndDrop(Calendar)

const localizer = Calendar.momentLocalizer(moment) 



            
const views=['month','week', 'day', 'agenda']
class Recruitment extends Component{ 
    constructor(props) {
        super(props);
        this.state = { popoverOpen: false,
            title:'',
            description:'',
              form:false,
              start:'',
              end:'',
              ok:false,
              // color: 'yellow',   // an option!
              //textColor: 'black',
              leave:[]
            };
            this.removeevent=this.removeevent.bind(this)
            this.removeevent1=this.removeevent1.bind(this)
            this.handleAddressEditcolse=this.handleAddressEditcolse.bind(this)
            this.update=this.update.bind(this)
            this.newEvent=this.newEvent.bind(this)
            this.resizeEvent=this.resizeEvent.bind(this)
    }



    update(){
        this.componentDidMount()
      }



      removeevent(e){
      //  alert(e.start)
      //  alert(e.end)
// console.log(e)

var title=e.title
var start=e.start
var end=e.end
var id=e.id
var status=e.status
var employeeid=e.employeeid
var description=e.description
//alert(e.status)
//alert(e.style.backgroundColor)
   

        var array =this.props.posts1.zyudlyemployee
        array.filter((doc)=>{


          var candiate={
            title:title,
            start:start,
            end:end,
            id:id,
            ok:true,
            status:status,
            img:doc.img,
            mobile:doc.mobile,
            email:doc.email,
            employeeid:employeeid,
            description:description,
            // endmonthyear:e.endmonthyear,
            // startmonthyear:e.startmonthyear,
            // backgroundColor:e.style.backgroundColor,
          }
       
            if(doc.employee_id===employeeid)
            {

            
             
           //alert('success')  
            // alert(candiate.img)
               this.props.dispatch({
          type:'EMPLOYEE_ID',
          candiate});
          //this.setState({ok:true})
        
            }else{
             // alert('failure')  
            }


            return false;
          })
//alert()

       
        
          this.setState({
            popoverOpen: !this.state.popoverOpen,
            title:e.title,
            description:e.description
          });
      }

      removeevent1(e){
     //   alert('ssss')
      }


      componentWillMount(){



        // const db = firebase.firestore();
        // db.collection("hr").where("employeeid", "==", '4QEHIq2UTNRN6hwzaRf28RnmGJE3').where("monthyear", "==", " Dec 2018")
        // .get()
        // .then(function(querySnapshot) {
        //     querySnapshot.forEach(function(doc) {
        //       console.log(doc.data())
        //         // doc.data() is never undefined for query doc snapshots
             
        //        // console.log("555555555555555"+_this.state.WaitingList);
        //     });
        // })
        // .catch(function(error) {
        //     console.log("Error getting documents: ", error);
        // });

      }

componentDidMount(){
//var _this=this
const ss=[]
this.props.navhandler('HR')


const db = firebase.firestore();
//  const settings = {/* your settings... */ timestampsInSnapshots: true};
//         db.settings(settings);

db.collection("hr")
.get()
.then(function(querySnapshot) {

querySnapshot.forEach(function(doc) {
// console.log(doc.data())  
ss.push(doc.data())
//    console.log(ss)       

});

}).then(()=>{

  this.setState({
    leave:ss
    })
})
.catch(function(error) {
// console.log("Error getting documents: ", error);
});



}



handleSelect = ({ start, end }) => {

  // alert(start)
  // alert(end)

//alert(new Date().toString().substring(16,24))

// this.setState({
// form:true,
// start:start.toString().substring(0,15)+new Date().toString().substring(15,24),
// end:end.toString().substring(0,15)+new Date().toString().substring(15,24)
// })

this.setState({
  form:true,
  start:start,
  end:end
  })

//  alert(this.state.start);
//  alert(this.state.end);
}

handleAddressEditcolse(){
this.setState({
form:false
})
}




newEvent(event,start) {

  
}

resizeEvent(event){

const db = firebase.firestore();

var start=event.start.toString();
var end=event.end.toString();
var id=event.event.id;
//  const settings = {/* your settings... */ timestampsInSnapshots: true};
//  db.settings(settings);
 var basicRef = db.collection('hr').doc(id);
 var updateMany = basicRef.update({
   start:start,
   end:end
 })
 return updateMany.then(res => {
  this.update()

} )


}



   
    render(){
      
        const data={
            start:this.state.start,
            end:this.state.end
          }

          // const { classes } = this.props;
//alert(this.props.array)






      //  alert(this.props.posts.ok)
        return(
        <div>
          <div style={{width:'65%'}}> <CaRD array={this.props.array}/></div> 
          <br/>
         
            <div >
              
            <Paper >


                 <div style={{width:'65%',marginTop:"20px",float:'left'}}>
                 <div className="App">
                          <DragAndDropCalendar
                          selectable={true}
                          popupOffset={30}
                            localizer={localizer}
                            defaultDate={new Date()}
                            startAccessor="start"
                            defaultView="month"
                            events={this.state.leave}
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
                                     "#ad4ca4"
                                    
                            }
                        })}

                      
                          />
                            {this.state.form ? <Form  update={this.update}  open={this.state.form} handleClose={this.handleAddressEditcolse} datas={data} array={this.props.array} />:null}
                        
                        </div>
                 


           </div> 
           </Paper>
          
           <div style={{marginTop:"62px",float:'right'}} >


          { this.props.posts1.ok ?  <Candiate update={this.update}/> :null}
          {/* { this.props.posts1.ok ?  <Payslip update={this.update}/> :null} */}

           
           </div>
          {/* <br/>
          <br/>
          <br/>
          <div style={{float:'left'}}> <CaRD/></div>  */}
                   
            </div>
          
         
            </div>
        );
    }
}

const mapStateToPropss = (state) => {
    var c=[]
    state.zyudlyemployee.map((s)=>{
        //alert(s.emp_name)
        c.push({
           value:s.employee_id ,
            label:s.emp_name
        })

        return false;
      //  console.log(c)
    })
    // alert(state.zyudlyemployee)
    return {
    posts1: state,
    array:c
    }
    }
export default  connect(mapStateToPropss)(Recruitment)