import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { withRouter } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import "./styles.css";

class TherapistAvailability extends React.Component {
  state = {
    sessions: [
      {
        // i need start and end here to make the event show up in the calendar
        start: "",
        end: "",
        sessionId: "",
        clientId: "",
        // backgroundColor: "#c9e0ffde"
      },
    ],
    // I need these for post request otherwise error -> path required
    start: "",
    end: "",
    clientId: "",
    selected: false,
    sessionId: "",
    // isBooked: false,
    isError: false,
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
            // console.log("CLIENT ID", session.clientId);
          }
        });
        // console.log("GET", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  bookSession = async (eventClickInfo) => {
    this.setState({
      sessionId: eventClickInfo.event._def.extendedProps._id,
      selected: true,
    })
    // if (eventClickInfo.event._def.extendedProps.clientId === "") {
    //   this.setState({
    //     sessionId: eventClickInfo.event._def.extendedProps._id,
    //     selected: true,
    //   });
    // } else {
    //   this.setState({
    //     isError: true,
    //   });
    //   setTimeout(() => {
    //     this.setState({
    //       isError: false,
    //     });
    //   }, 2000);
    // }
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
          // isBooked: true,
        });
        // setTimeout(() => {
        //   this.setState({
        //     isBooked: false,
        //   });
        // }, 2000);
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
      <>
        {this.state.selected ? (
          <div>
            <Button onClick={this.setClient}>Book Appointment</Button>
          </div>
        ) : null}
        {this.state.isBooked ? (
          <Stack>
            <Alert severity="success">Appointment Booked! 🦄</Alert>
          </Stack>
        ) : null}
        {this.state.isError ? (
          <Stack>
            <Alert severity="error">Not Available</Alert>
          </Stack>
        ) : null}
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
          // selectAllow={this.selectAllow}
          dayMaxEvents={true}
          aspectRatio={6}
          height={600}
          eventClick={this.bookSession}
          events={this.state.sessions}
          eventContent={(eventInfo) => {
            return (
              <div
                className={
                  eventInfo.event._def.extendedProps.clientId ? "_booked" : ""
                }
              >
                <span
                  className={
                    eventInfo.event._def.extendedProps.clientId
                      ? "_bookedTime"
                      : ""
                  }
                >
                  {eventInfo.timeText}
                </span>
              </div>
            );
          }}
        />
      </>
    );
  }
}

export default withRouter(TherapistAvailability);
