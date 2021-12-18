import { useState, useEffect, useRef } from "react";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import AddSessionModal from "../components/Modal";

const Blank = ({ history, location, match }) => {
  const token = localStorage.getItem("accessToken");
  const [myData, setMyData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [filledIn, setFilledIn] = useState(false)
  const [sessions, setSessions] = useState([])

  const calendarRef = useRef();

  const getMe = async () => {
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


  // const handleSessionAdd = async (data) => {
  //   try {
  //     const response = await fetch(
  //       process.env.REACT_APP_DEV_API_BE + "/test/addEvent",
  //       {
  //         method: 'POST',
  //         headers: {
  //           Authorization: "Bearer " + token,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data.event),
  //       }
  //     );
  //     if (response.ok) {
  //       console.log('SUCCESS')
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onEventAdded = (event) => {
    const api = calendarRef.current.getApi();
    api.addEvent(event);
  };

  const handleTimeSelection = (info) => {
    // setStart(info.startStr)
    // setSeconds(info.endStr)
    setFilledIn(true)
    console.log(info)
  }

  useEffect(() => {
    getMe();
    // getMyAppointments();
  }, []);

  return (
    <>
      <button onClick={() => setModalOpen(true)}>ADD EVENT</button>
      <div style={{position: "relative", zIndex: 0}}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
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
          events={sessions}
          select={()=>handleTimeSelection()}
          // businessHours={true}
        />
      </div>
      {/* <AddSessionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      /> */}
    </>
  );
};

export default Blank;
