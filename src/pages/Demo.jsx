import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default class DemoApp extends React.Component {
  state = {
    sessions: [
      {
        // i need start and end here to make the event show up in the calendar
        start: "",
        end: "",
        sessionId: "",
        clientId: "",
      },
    ],
    // I need these for post request otherwise error -> path required
    start: "",
    end: "",
    clientId: "",
    filledIn: false,
    selected: false,
    sessionId: "",
  };

  componentDidMount() {
    this.getAllSessions();
  }

  getAllSessions = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        process.env.REACT_APP_DEV_API_BE + "/test/getEvent",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        this.setState({
          sessions: [...data],
        });
        this.state.sessions.map((session) => {
          if(session.clientId !== undefined){
           console.log("CLIENT ID", session.clientId)
          }
        });
        console.log("GET", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleTimeSelection = (info) => {
    this.setState({
      sessions: [
        {
          start: info.startStr,
          end: info.endStr,
        },
      ],
      start: info.startStr,
      end: info.endStr,
      filledIn: true,
    });
    console.log(info);
  };

  createSession = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        process.env.REACT_APP_DEV_API_BE + "/test/addEvent",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // this throws an error of path required
            // start: this.state.sessions.start,
            // end: this.state.sessions.end,
            start: this.state.start,
            end: this.state.end,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("POST", data);
        this.state.sessions.push(data);
        this.setState({
          filledIn: false,
        });
        this.getAllSessions();
      }
    } catch (error) {
      console.log(error);
    }
  };

  bookSession = async (eventClickInfo) => {
    this.setState({
      sessionId: eventClickInfo.event._def.extendedProps._id,
      selected: true,
    });
    console.log(eventClickInfo);
    console.log("ID", this.state.sessionId);
  };

  setClient = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        process.env.REACT_APP_DEV_API_BE + "/test/book/" + this.state.sessionId,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            // what should i stringify? i'm not supposed to stringify any user id
            body: JSON.stringify(),
          },
        }
      );
      if (response.ok) {
        this.setState({
          // BAHH
          //   sessions: [
          //     clientId:
          //   ],
          selected: false,
          // display: 'background'
        });
        const data = await response.json();
        console.log("PUT", data);
        this.getAllSessions();
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="demo-app">
        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            headerToolbar={{
              left: "prev,next,today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            weekends={false}
            editable={true}
            selectable={true}
            dayMaxEvents={true}
            aspectRatio={6}
            height={600}
            select={this.handleTimeSelection}
            eventClick={this.bookSession}
            events={this.state.sessions} // this renders the event objects in the calendar
          />
        </div>
        {this.state.filledIn === true ? (
          <div>
            Confirm?
            <button onClick={this.createSession}>Yes</button>
            <button onClick={this.getAllSessions}>No</button>
          </div>
        ) : null}
        {this.state.selected === true ? (
          <div>
            <button onClick={this.setClient}>Book Appointment</button>
          </div>
        ) : null}
      </div>
    );
  }
}
