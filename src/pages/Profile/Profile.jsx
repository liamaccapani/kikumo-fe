import { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import MyAppointments from "../../components/MyAppointments";
import MyTherapist from "../../components/MyTherapist";

const Profile = ({ history, location, match }) => {
  const [showAppointments, setShowAppointments] = useState(false);
  const [showTherapist, setShowTherapist] = useState(false);
  const [myData, setMyData] = useState({});

  // // Fx to pass down to the cards
  // const showDetails = () => {
  //   if(id === "appointments"){
  //     setShowAppointments(!showAppointments)
  //   } else {
  //     showTherapist(!setShowTherapist)
  //   }
  // }

  const showAppointmentsDetails = () => {
    setShowAppointments(!showAppointments);
  };

  const showTherapistDetails = () => {
    setShowTherapist(!showTherapist);
  };

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
  useEffect(getMe, []);
  return (
    <>
      <h1>PROFILE</h1>
      <Container>
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
                <img src={myData.avatar} height="80" width="80" />
              </div>
            </Container>
          </Col>
          <Col className="utilities-col" style={{ backgroundColor: "orange" }}>
            <Card body>Search Therapist</Card>

            {!showAppointments && (
              <Card
                body
                id="appointments"
                onClick={() => showAppointmentsDetails()}
              >
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
      </Container>
      {/*  */}
    </>
  );
};

export default Profile;

// profile -> card search ->
// profile -> card appointments -> modal setShow passed down to modal component
// profile -> card my therapists ->
