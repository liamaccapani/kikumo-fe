import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default class DemoApp extends React.Component {
  state = {
    sessions: [
      {
        start: "",
        end: "",
      },
    ],
    start: "",
    end: "",
    filledIn: false,
  };

  componentDidMount() {
    this.getAllSessions();
  }

  render() {
    return (
      <div className="demo-app">
        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next today",
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
            // eventsSet={this.handleEvents}
            eventAdd={this.createSession}
            events={this.state.sessions} // this renders the event objects in the calendar
          />
        </div>
        {this.state.filledIn === true ? (
          <div>
            Confirm?
            <button onClick={this.createSession}>Yes</button>
          </div>
        ) : null}
      </div>
    );
  }

  handleTimeSelection = (info) => {
    // this.setState({
    //   sessions: [
    //     {
    //       start: info.startStr,
    //       end: info.endStr,
    //     },
    //   ],
    //   filledIn: true
    // });

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

  toggleFilledIn = () => {
    this.setState({
      sessions: [
        {
          filledIn: false,
        },
      ],
    });
  };

  // handleEvents = (events) => {
  //   this.setState({
  //     sessions: events
  //   })
  // }

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
            start: this.state.start,
            end: this.state.end,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("POST", data);
        this.state.sessions.push(data);
        this.toggleFilledIn();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            sessions: [...data]
        })
        console.log("GET", data)
      }
    } catch (error) {
      console.log(error);
    }
  };
}
