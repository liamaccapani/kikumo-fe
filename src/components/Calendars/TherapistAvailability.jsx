import React from "react";
import { withRouter } from "react-router-dom";
// ------------- FULLCALENDAR -------------
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// ------------- MUI -------------
import { Alert, Box, Button, Stack } from "@mui/material";

import "./styles.css";

class TherapistAvailability extends React.Component {
  state = {
    sessions: [
      // {
      //   // i need start and end here to make the event show up in the calendar
      //   start: "",
      //   end: ""
      // },
    ],
    session: {
      clientId: "",
      isSelected: false,
      sessionId: "",
      isSuccess: false,
      isError: false,
    },
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
        // this.state.sessions.map((session) => {
        //   if (session.clientId !== undefined) {
        //     // console.log("CLIENT ID", session.clientId);
        //   }
        // });
        // console.log("GET", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  selectSession = async (eventClickInfo) => {
    const session = { ...this.state.session };
    session.sessionId = eventClickInfo.event._def.extendedProps._id;
    session.clientId = eventClickInfo.event._def.extendedProps.clientId;
    if (session.clientId === undefined) {
      session.isSelected = true;
      session.isError = false;
    } else {
      session.isSelected = false;
      session.isError = true;
    }
    this.setState({ session });
    console.log(eventClickInfo.event._def.extendedProps);
  };

  bookSession = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        process.env.REACT_APP_DEV_API_BE +
          "/sessions/book/" +
          this.state.session.sessionId,
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
        const data = await response.json();
        const session = { ...this.state.session };
        session.isSelected = false;
        session.isSuccess = true;
        this.setState({ session });
        setTimeout(() => {
          session.isSuccess = false;
          this.setState({ session });
        }, 2000);
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
        {this.state.session.isSelected ? (
          <Box className="confirm_box">
            <Button onClick={this.bookSession}>Book Appointment</Button>
          </Box>
        ) : null}
        {this.state.session.isSuccess ? (
          <Stack>
            <Alert severity="success">Appointment Booked! 🦄</Alert>
          </Stack>
        ) : null}
        {this.state.session.isError ? (
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
          eventClick={this.selectSession}
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

// this.setState({
//   sessionId: eventClickInfo.event._def.extendedProps._id,
// });
// if(eventClickInfo.event._def.extendedProps.clientId !== ""){
//   this.setState({
//     selected: false
//   })
// } else {
//   this.setState({
//     selected: true
//   })
// }
// console.log(eventClickInfo.event._def.extendedProps)

// // I need these for post request otherwise error -> path required
// start: "",
// end: "",
