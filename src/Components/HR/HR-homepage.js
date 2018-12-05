
import React,{Component} from 'react';
import RecruitmentList from './calender'
import Candiate from './candiate'
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import Calendar from "react-big-calendar";
import Form from './form'
import moment from 'moment'
import Payslip from './payslip'
import CaRD from './cards'





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
        
console.log(e)


  //    alert(e.employee)
   

        var array =this.props.posts1.zyudlyemployee
        array.filter((doc)=>{


          var candiate={
            title:e.title,
            start:e.start,
            end:e.end,
            id:e.id,
            ok:true,
            status:e.status,
            img:doc.img,
            mobile:doc.mobile,
            email:doc.email,
            employeeid:e.employeeid,
            description:e.description
          }
       
            if(doc.employee_id===e.employeeid)
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
          })
//alert()

       
        
          this.setState({
            popoverOpen: !this.state.popoverOpen,
            title:e.title,
            description:e.description
          });
      }

      removeevent1(e){
        alert('ssss')
      }


      componentWillMount(){
        const db = firebase.firestore();
        db.collection("hr").where("employeeid", "==", '4QEHIq2UTNRN6hwzaRf28RnmGJE3').where("monthyear", "==", " Dec 2018")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              console.log(doc.data())
                // doc.data() is never undefined for query doc snapshots
             
               // console.log("555555555555555"+_this.state.WaitingList);
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

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

})
.catch(function(error) {
console.log("Error getting documents: ", error);
});



setTimeout(() =>{

let today = new Date()
//console.log(today)

//console.log(ss)
//  var sss=ss
this.setState({
leave:ss
})
//  console.log(_this.state.lead
},1000)


//   setTimeout(() =>{ 
//  console.log(ss)
//     _
//   console.log(this.state.leave)d
//  },2000)

}



handleSelect = ({ start, end }) => {
//    const title = window.prompt('New Event name')


// const title = window.prompt('New Event name')
// if (title)
// this.setState({
//   leave: [
//     ...this.state.leave,
//     {
//       start,
//       end,
//       title
//     },
//   ],
// })

this.setState({
form:true,
start:start,
end,end
})

// alert(this.state.start);
// alert(this.state.end);
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
//alert(this.props.array)






      //  alert(this.props.posts.ok)
        return(<div>
          {/* <div style={{width:'60%',marginLeft: '20%'}}> <CaRD array={this.props.array}/></div> 
          <br/> */}
         
            <div >


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
                                     "#78aad6"
                                    
                            }
                        })}

                      
                          />
                            {this.state.form ? <Form  update={this.update}  open={this.state.form} handleClose={this.handleAddressEditcolse} datas={data} array={this.props.array} />:null}
                        
                        </div>
                 


           </div> 
          
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
      //  console.log(c)
    })
    // alert(state.zyudlyemployee)
    return {
    posts1: state,
    array:c
    }
    }
export default  connect(mapStateToPropss)(Recruitment)