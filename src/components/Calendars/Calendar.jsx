import React from "react";
// ------------- FULLCALENDAR -------------
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// ------------- MUI -------------
import { Alert, Box, Button, Stack } from "@mui/material";
// ------------- ICONS -------------
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import "./styles.css";

export default class Calendar extends React.Component {
  state = {
    sessions: [
      {
        // i need start and end here to make the event show up in the calendar
        start: "",
        end: "",
        sessionId: "",
        clientId: "",
        title: "",
      },
    ],
    // I need these for post request otherwise error -> path required
    start: "",
    end: "",
    clientId: "",
    filledIn: false,
    isConfirmed: false,
    sessionId: "",
  };

  componentDidMount() {
    this.getAllSessions();
  }

  getAllSessions = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        process.env.REACT_APP_PROD_API_BE + "/sessions",
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
    console.log("SELECT INFO", info);
  };

  createSession = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        process.env.REACT_APP_PROD_API_BE + "/sessions",
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
          isConfirmed: true,
        });
        this.getAllSessions();
        setTimeout(() => {
          this.setState({
            isConfirmed: false,
          });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  rejectConfirmation = () => {
    this.setState({
      filledIn: false,
    });
    this.getAllSessions();
  };

  render() {
    return (
      <>
        {this.state.filledIn ? (
          <Box className="confirm_box d-flex flex-row align-items-center">
            <HelpOutlineIcon className="mr-2" />
            Confirm?
            <Button onClick={this.createSession}>Yes</Button>
            <Button onClick={this.rejectConfirmation}>No</Button>
          </Box>
        ) : null}

        {this.state.isConfirmed ? (
          <Stack>
            <Alert severity="success">Time Slot Created!</Alert>
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
          editable={true}
          selectable={true}
          dayMaxEvents={true}
          aspectRatio={6}
          height={600}
          select={this.handleTimeSelection}
          events={this.state.sessions} // this renders the event objects in the calenda
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
                  {eventInfo.event._def.extendedProps.clientId !== undefined
                    ? eventInfo.event._def.extendedProps.clientId.name
                    : eventInfo.timeText}
                </span>
              </div>
            );
          }}
        />
      </>
    );
  }
}
