import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default class DemoApp extends React.Component {
  state = {
    sessions: [],
    start: "",
    end: "",
    filledIn: false,
  };

  componentDidMount() {
      this.getAllSessions()
  }

  render() {
    return (
      <div className="demo-app">
        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            select={this.handleTimeSelection}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            editable={true}
            selectable={true}
            dayMaxEvents={true}
            aspectRatio={6}
            height={600}
            events={this.state.sessions}
            eventContent={this.renderEventContent}
          />
        </div>
        {this.state.filledIn === true ?
         <div>
             Confirm? 
             <button onClick={this.createSession}>Yes</button>
         </div> :
          null
        }
      </div>
    );
  }

  renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  handleTimeSelection = (info) => {
    this.setState({
      start: info.startStr,
      end: info.endStr,
      filledIn: true,
    });
    console.log(info);
  };
  
  toggleFilledIn = () => {
      this.setState({
          filledIn: false
      })
  }

  createSession = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      fetch(
        process.env.REACT_APP_DEV_API_BE + "/test/addEvent",
        {
          method: 'POST',
          headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              start: this.state.start,
              end: this.state.end
          })
        }
      );
      this.toggleFilledIn()
    } catch (error) {
      console.log(error);
    }
  };

  getAllSessions = () => {
    const token = localStorage.getItem("accessToken");
    try {
      fetch(
        process.env.REACT_APP_DEV_API_BE + "/test/getEvent",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
