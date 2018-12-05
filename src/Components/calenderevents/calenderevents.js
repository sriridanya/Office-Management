import React, { Component } from "react";
import moment from "moment";
import welcomeImage from "./welcome.svg";
import spinner from './spinner.svg';
import axios from 'axios';
import { GOOGLE_API_KEY, CALENDAR_ID } from "./client_id.json";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("dd, Do MMMM, h:mm A"),
      events: [],
      isBusy: false,
     
      isLoading: true
    };
  }

  componentDidMount = () => {
    this.getEvents();
    setInterval(() => {
      this.tick();
    }, 1000);
    setInterval(() => {
      this.getEvents();
    }, 60000);
  };

  getEvents() {
   var that=this

            axios.post('http://localhost:3003/calenderevents')
            .then((result) => {
            //  alert(result)
              console.log(result.data)
          
            let events = result.data;
            let sortedEvents = events.sort(function(a, b) {
              return (
                moment(b.start.dateTime).format("YYYYMMDD") -
                moment(a.start.dateTime).format("YYYYMMDD")
              );
            });
            if (events.length > 0) {
              that.setState(
                {
                  events: sortedEvents,
                  isLoading: false,
                 
                },
                () => {
                  that.setStatus();
                }
              );
            } else {
              that.setState({
                isBusy: false,
             
                isLoading: false
              });
            }
          })
        
  }

  tick = () => {
    let time = moment().format("dddd, Do MMMM, h:mm A");
    this.setState({
      time: time
    });
  };

  setStatus = () => {
    let now = moment();
    let events = this.state.events;
    for (var e = 0; e < events.length; e++) {
      var eventItem = events[e];
      if (
        moment(now).isBetween(
          moment(eventItem.start.dateTime),
          moment(eventItem.end.dateTime)
        )
      ) {
        this.setState({
          isBusy: true
        });
        return false;
      } else {
        this.setState({
          isBusy: false
        });
      }
    }
  };

  render() {
    const { time, events } = this.state;

    let eventsList = events.map(function(event) {
      return (
          
        <a
          className="list-group-item"
          href={event.htmlLink}
          target="_blank"
          key={event.id}
        >
          {event.summary}{" "}
          <span className="badge">
            {moment(event.start.dateTime).format("h:mm a")},{" "}
            {moment(event.end.dateTime).diff(
              moment(event.start.dateTime),
              "minutes"
            )}{" "}
            minutes, {moment(event.start.dateTime).format("MMMM Do")}{" "}
          </span>
        </a>
      );
    });

    

    let loadingState = (
      <h5>
          No meetings are scheduled for the day. Create one by clicking the
          button below.
        </h5>
    );

    return (
      <div style={{height:'100%'}}>      
      <div style={{display: 'flex',
        minHeight: '100px'
    }}>
        <div
          className={
             "current-status open"
          }
        >
          <h1 style={{ fontSize: '80px',
  lineHeight: '120px'}}>ZYUDLY LABS</h1>
        </div>
        <div style={{ padding: '64px'}}>
          <div style={{
             margin: '32px 0 64px 0',
             color: '#999',
             fontSize: '30px'
          }}>{time}, 2018</div>
          <h1>Upcoming Meetings</h1>
          <div className="list-group">
            {this.state.isLoading && loadingState}
            {events.length > 0 && eventsList}
           
          </div>
          <a
            className="primary-cta"
            href="https://calendar.google.com/calendar?cid=c3FtMnVkaTFhZGY2ZHM3Z2o5aDgxdHVldDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
            target="_blank"
          >
            +
          </a>
        </div>
      </div>
      </div>

  
    );
  }
}
