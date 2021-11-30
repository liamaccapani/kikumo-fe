import { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Profile = ({ history, location, match }) => {
  const [myData, setMyData] = useState({});
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
          <Col md={12} lg={6} className="profile-col" style={{ backgroundColor: "pink" }}>
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
            <Link to="/appointments">
              <Card body>Appointments</Card>
            </Link>
            <Card body>My Therapists</Card>
          </Col>
        </Row>
      </Container>
      {/*  */}
    </>
  );
};

export default Profile;
