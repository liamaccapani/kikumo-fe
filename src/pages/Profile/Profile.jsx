import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

import "./styles.css";

const Profile = ({ history, location, match }) => {
  const [myData, setMyData] = useState({});
  const [myAppointments, setMyAppointments] = useState([]);
  const [myTherapists, setMyTherapists] = useState([]);

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
        console.log("APPOINTMENTS", appointments);
        let therapists = appointments
          .filter((a) => a.therapistId)
          .map((a) => a.therapistId);
        console.log(therapists);
        let uniqueTherapists = [];
        therapists.forEach((t) => {
          if (uniqueTherapists.findIndex((ut) => ut._id === t._id) === -1) {
            uniqueTherapists.push(t);
          }
        });
        console.log("unique", uniqueTherapists);
        setMyTherapists(uniqueTherapists);
        console.log(myTherapists);
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
      </Grid>

      {/* ------------- RIGHT COLUMN ------------- */}
      <Grid item xs={12} md={6} className="utilities-col">
        {/* Search Therapists */}
        <Card>Search Therapist</Card>

        {/* Appointments */}
        <Accordion className="appointments">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>My Appointments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
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
            </Card>
          </AccordionDetails>
        </Accordion>

        {/* Therapists */}
        <Accordion className="therapists">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>My Therapists</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {myTherapists && (
              <Card>
                {myTherapists.map((therapist) => {
                  return (
                    <Card key={therapist._id}>
                      <CardHeader
                        avatar={<Avatar>{therapist.avatar}</Avatar>}
                      />
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {therapist.name} {therapist.surname}
                        </Typography>
                        <Typography variant="h6" component="div"></Typography>
                        {/* <Typography variant="body2">
                        
                      </Typography> */}
                      </CardContent>
                    </Card>
                  );
                })}
              </Card>
            )}
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default Profile;

// profile -> card search ->
// profile -> card appointments -> modal setShow passed down to modal component
// profile -> card my therapists ->

/*
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
*/
/*
  // const showAppointmentsDetails = () => {
  //   setShowAppointments(!showAppointments);
  // };
  // const showTherapistDetails = () => {
  //   setShowTherapist(!showTherapist);
  // };
*/

/* {myAppointments.map((appointment) => {
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
              })} */
