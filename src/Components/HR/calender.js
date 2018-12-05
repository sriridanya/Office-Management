
import React,{Component} from 'react';
import PropTypes from 'prop-types';

//import BigCalendar from 'react-big-calendar'
import Calendar from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import swal from 'sweetalert';
import * as firebase from 'firebase';
import {connect} from 'react-redux';
import Form from './form'
import candiate from './candiate';
//import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

//const DraggableCalendar = withDragAndDrop(BigCalendar)


const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = Calendar.momentLocalizer(moment) 
const views=['month','week', 'day', 'agenda']

const event=[
 
    // {
    // //  // id: 0,
    // //   title: 'All Day Event very long title',
    // //   allDay: true,
    // //   start:'16-Nov-2018',
    // //   end: '17-Nov-2018',
    // },
   
    
  
                ]	
              
 
                class App extends Component {
                    constructor(props) {
                           super(props);
                           this.state = {
                            events: event,
                          }
                      
                          this.moveEvent = this.moveEvent.bind(this)
                          this.newEvent = this.newEvent.bind(this)
                        }
                      
                        moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
                          const { events } = this.state
                      
                          const idx = events.indexOf(event)
                          let allDay = event.allDay
                      
                          if (!event.allDay && droppedOnAllDaySlot) {
                            allDay = true
                          } else if (event.allDay && !droppedOnAllDaySlot) {
                            allDay = false
                          }
                      
                          const updatedEvent = { ...event, start, end, allDay }
                      
                          const nextEvents = [...events]
                          nextEvents.splice(idx, 1, updatedEvent)
                      
                          this.setState({
                            events: nextEvents,
                          })
                      
                          // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
                        }
                      
                        resizeEvent = ({ event, start, end }) => {
                          const { events } = this.state
                      
                          const nextEvents = events.map(existingEvent => {
                            return existingEvent.id == event.id
                              ? { ...existingEvent, start, end }
                              : existingEvent
                          })
                      
                          this.setState({
                            events: nextEvents,
                          })
                      
                          //alert(`${event.title} was resized to ${start}-${end}`)
                        }
                      
                        newEvent(event) {
                          let idList = this.state.events.map(a => a.id)
                          let newId = Math.max(...idList) + 1
                          let hour = {
                            id: newId,
                            title: 'New Event',
                            allDay: event.slots.length == 1,
                            start: event.start,
                            end: event.end,
                          }
                          this.setState({
                            events: this.state.events.concat([hour]),
                          })
                        }
                  
                    render() {

                      const data={
                        start:this.state.start,
                        end:this.state.end
                      }
                    //  alert(data.start)
                      return (
                        <div className="App">
                          <DragAndDropCalendar
                          selectable={true}
                          popupOffset={30}
                            localizer={localizer}
                            defaultDate={new Date()}
                            startAccessor="start"
                            defaultView="month"
                            events={this.state.events}
                            onEventDrop={this.moveEvent}
                            draggableAccessor={event => true}
                            onEventResize={this.resizeEvent}

                          
                            resizable
                           onSelectSlot={this.newEvent}
                            views={views}
                            onDoubleClickEvent = {this.removeevent}
                            style={{ height: "80vh",width:'100%' }}
                            step={30}
                         
                          eventPropGetter={event => ({
                            style: {
                                backgroundColor: 
                                     "#ad4ca4"
                                    
                            }
                        })}

                      
                          />
                            {this.state.form ? <Form  update={this.update}  open={this.state.form} handleClose={this.handleAddressEditcolse} datas={data} array={this.props.array} />:null}
                        
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
                        console.log(c)
                    })
                    // alert(state.zyudlyemployee)
                    return {
                    posts1: state,
                    array:c
                    }
                    }

export default  connect(mapStateToPropss) (App)

