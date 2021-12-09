import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";


const ProfileT = ({ history, location, match }) => {
  // const [showAppointments, setShowAppointments] = useState(false);
  // const [showTherapist, setShowTherapist] = useState(false);
  const [myData, setMyData] = useState({});
  const [myAppointments, setMyAppointments] = useState([]);
  const [myClients, setMyClients] = useState([{}])

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
        console.log("APPOINTMENTS", appointments);
        appointments.forEach(appointment => {
          const newMyClients = [...myClients]
          newMyClients.push(appointment.clientId)
          setMyClients(newMyClients)
          console.log("CLIENTS", myClients)
        })
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
    <Grid container className="whole_profile my-3">
      {/* ------------- LEFT COLUMN ------------- */}
      <Grid item xs={12} md={6}>
        <div className="name_avatar">
          <img alt="avatar" src={myData.avatar} />
          <span>
            {myData.name} {myData.surname}
          </span>
        </div>

        {/* Experiences */}
        {myData.experiences && (
          <Card>
            <CardHeader title="Working Experiences:" />
            {myData.experiences.map((experience) => {
              console.log(experience);
              return (
                <>
                  <CardContent key={experience._id}>
                    <Typography>{experience.role}</Typography>
                    <Typography>
                      {format(parseISO(experience.startDate), "MMM yyy")} -{" "}
                      {experience.endDate
                        ? format(parseISO(experience.endDate), "MMM yyy")
                        : ""}
                    </Typography>
                    <Typography>{experience.description}</Typography>
                    <Typography>{experience.area}</Typography>
                  </CardContent>
                </>
              );
            })}
          </Card>
        )}
      </Grid>

      {/* ------------- RIGHT COLUMN ------------- */}
      <Grid item xs={12} md={6} className="utilities-col">
        {/* Specializations */}
        {myData.specializations && (
          <Card>
            <CardHeader title="Specializations:" />
            {myData.specializations.map((specialization) => {
              return (
                <>
                  <CardContent key={specialization._id}>
                    <Typography>{specialization.category}</Typography>
                  </CardContent>
                </>
              );
            })}
          </Card>
        )}

        {/* Availability */}
        <Accordion className="availability">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>My Availability</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <Card>
              {myAppointments.map((appointment) => {
                return (
                  <CardContent key={appointment._id}>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {appointment.duration}
                    </Typography>
                    <Typography variant="h6" component="div">
                      {format(
                        parseISO(appointment.startDate),
                        "EEEE dd MMM yyy h:m a"
                      )}
                    </Typography>
                    <Typography variant="body2">
                      {appointment.description}
                    </Typography>
                  </CardContent>
                );
              })}
            </Card> */}
          </AccordionDetails>
        </Accordion>

        {/* Clients */}
        <Accordion className="clients">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>My Clients</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <Card>
              {myAppointments.map((appointment) => {
                return (
                  <CardContent key={appointment._id}>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {appointment.duration}
                    </Typography>
                    <Typography variant="h6" component="div">
                     
                    </Typography>
                    <Typography variant="body2">
                      {appointment.description}
                    </Typography>
                  </CardContent>
                );
              })}
            </Card> */}
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default ProfileT;

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
