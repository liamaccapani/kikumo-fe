import { useState, useEffect } from "react";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const Blank = ({ history, location, match }) => {
  const [myData, setMyData] = useState({});
  const [myAppointments, setMyAppointments] = useState([]);
  const [myTherapists, setMyTherapists] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([])

  const getMe = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        process.env.REACT_APP_DEV_API_BE + "/therapists/me",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMyData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMyAppointments = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        process.env.REACT_APP_DEV_API_BE + "/sessions",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        const appointments = await response.json();
        setMyAppointments(appointments);
        console.log(myAppointments)
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDateSelect = (selectInfo) => {
  //   let title = prompt('Please enter a new title for your event')
  //   // let calendarApi = selectInfo.view.calendar

  //   // calendarApi.unselect() // clear date selection

  //   // if (title) {
  //   //   calendarApi.addEvent({
  //   //     id: createEventId(),
  //   //     title,
  //   //     start: selectInfo.startStr,
  //   //     end: selectInfo.endStr,
  //   //     allDay: selectInfo.allDay
  //   //   })
  //   // }
  // }
  // const handleEventClick = (clickInfo) => {
  //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //     clickInfo.event.remove()
  //   }
  // }
  // const handleEvents = (events) => {
  //   setCurrentEvents(events)
  // }
  // const renderEventContent = (eventInfo) => {
  //   return (
  //     <>
  //       <b>{eventInfo.timeText}</b>
  //       <i>{eventInfo.event.title}</i>
  //     </>
  //   )
  // }
  
  useEffect(() => {
    getMe();
    getMyAppointments();
  }, []);


  return (
    <FullCalendar 
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      initialView="timeGridWeek"
      editable={true}
      selectable={true}
      businessHours={true}
      // select={()=>handleDateSelect()}
      // eventContent={renderEventContent()}
      // eventClick={handleEventClick()}
      // eventsSet={handleEvents()}
    />
    )
}

export default Blank;


