import { useState, useEffect } from "react";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO"

const Blank = ({ history, location, match }) => {
  const [myData, setMyData] = useState({});
  const [myAppointments, setMyAppointments] = useState([]);
  const [myTherapists, setMyTherapists] = useState([])
  
  const getMe = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        process.env.REACT_APP_DEV_API_BE + "/clients/me",
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
        process.env.REACT_APP_DEV_API_BE + "/sessions/clients",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        const appointments = await response.json();
        setMyAppointments(appointments);
        appointments.map(appointment => {
          console.log(appointment)
          console.log(myTherapists)
          // const index = myTherapists.findIndex((therapist) => (therapist._id !== appointment.therapistId) === -1 )
          // if(index === -1) {
          //   let newMyTherapists = [...myTherapists]
          //   newMyTherapists.push(therapist)
          //   setMyTherapists(newMyTherapists)
          // }
        });
        // console.log("APPOINTMENTS", appointments);
        // console.log("THERAPISTS", myTherapists)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
    getMyAppointments();
  }, []);
  return (
    <div>
      {myAppointments.map((appointment) => {
        return (
          <>
            <div>{format(new Date(2021, 7, 12), "yyyy-MM-dd")}</div>
            {/* {console.log(myTherapists)} */}
            <div>{format(parseISO(appointment.startDate), "yyyy-MM-dd")}</div>
          </>
        );
      })}
    </div>
  );
};

export default Blank;


{
  /* <Container>
  <Row>
    <Col
      md={12}
      lg={6}
      className="profile-col"
      style={{ backgroundColor: "pink" }}
    >
      <Container>
        <div>{myData.name}</div>
        <div>{myData.surname}</div>
        <div>
          <img alt="avatar" src={myData.avatar} height="80" width="80" />
        </div>
      </Container>
    </Col>
    <Col className="utilities-col" style={{ backgroundColor: "orange" }}>
      <Card body>Search Therapist</Card>

      {!showAppointments && (
        <Card body id="appointments" onClick={() => showAppointmentsDetails()}>
          Appointments
        </Card>
      )}
      {showAppointments && (
        <MyAppointments
          onClick={() => showAppointmentsDetails()}
          showAppointmentsDetails={showAppointmentsDetails}
          appointments={myData.appointments}
        />
      )}

      {!showTherapist && (
        <Card body onClick={() => showTherapistDetails()}>
          My Therapist
        </Card>
      )}
      {showTherapist && (
        <MyTherapist
          onClick={() => showTherapistDetails()}
          showTherapistDetails={showTherapistDetails}
          therapist={myData.therapist}
        />
      )}
    </Col>
  </Row>
</Container>; */
}
// // Fx to pass down to the cards
// const showDetails = () => {
//   if(id === "appointments"){
//     setShowAppointments(!showAppointments)
//   } else {
//     showTherapist(!setShowTherapist)
//   }
// }

// const showAppointmentsDetails = () => {
//   setShowAppointments(!showAppointments);
// };

// const showTherapistDetails = () => {
//   setShowTherapist(!showTherapist);
// };