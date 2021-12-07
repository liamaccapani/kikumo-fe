import { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

import MyAppointments from "../../components/MyAppointments";
import MyTherapist from "../../components/MyTherapist";

import "./styles.css";

const Profile = ({ history, location, match }) => {
  const [showAppointments, setShowAppointments] = useState(false);
  const [showTherapist, setShowTherapist] = useState(false);
  const [myData, setMyData] = useState({});
  const [myAppointments, setMyAppointments] = useState([]);
  const [therapistId, setTherapistId] = useState("")

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
        setMyAppointments(appointments)
        setTherapistId(appointments[0].therapistId._id)
        console.log(therapistId) // not working
        console.log(appointments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getMyTherapists = async () => {
  //   try {
      
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(()=> {
    getMe();
    getMyAppointments()
  }, []);
  return (
    <>
      <Row className="whole_profile">
        <Col
          md={12}
          lg={6}
          // style={{ backgroundColor: "pink" }}
        >
          <div className="name_avatar">
            {/* <div> */}
            <img alt="avatar" src={myData.avatar} />
            {/* </div> */}
            <span>
              {myData.name} {myData.surname}
            </span>
          </div>
        </Col>
        <Col className="utilities-col">
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
              appointments={myAppointments}
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
              therapist={myAppointments.therapistId._id}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default Profile;

// profile -> card search ->
// profile -> card appointments -> modal setShow passed down to modal component
// profile -> card my therapists ->
