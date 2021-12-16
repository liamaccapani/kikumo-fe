import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { withRouter } from "react-router-dom";

class TherapistAvailability extends React.Component {
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
        process.env.REACT_APP_DEV_API_BE +
          "/sessions/" +
          this.props.therapistId,
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
          if (session.clientId !== undefined) {
            console.log("CLIENT ID", session.clientId);
          }
        });
        console.log("GET", data);
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
        process.env.REACT_APP_DEV_API_BE +
          "/sessions/book/" +
          this.state.sessionId,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            body: JSON.stringify(),
          },
        }
      );
      if (response.ok) {
        this.setState({
          selected: false,
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
            selectable={true}
            dayMaxEvents={true}
            aspectRatio={6}
            height={600}
            // eventBackgroundColor={'#388DFC'}
            eventClick={this.bookSession}
            events={this.state.sessions} // this renders the event objects in the calendar
            eventContent={(eventInfo) => {
              console.log(eventInfo);
              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    cursor: eventInfo.event._def.extendedProps.clientId
                      ? "not-allowed"
                      : "pointer",
                    // backgroundColor: eventInfo.event._def.extendedProps.clientId
                    //   ? "#ffffffa6"
                    //   : "",
                  }}
                >
                  <span>{eventInfo.timeText}</span>
                  {/* <i>{eventInfo.event.title}</i> */}
                </div>
              );
            }}
          />
        </div>
        {this.state.selected === true ? (
          <div>
            <button onClick={this.setClient}>Book Appointment</button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(TherapistAvailability);
