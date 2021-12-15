import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/actions";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
// ------------- MUI -------------
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
// ------------- ICONS -------------
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import "./styles.css";

const Profile = ({ history, location, match }) => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user.userData);

  const token = localStorage.getItem("accessToken");
  const BASE_URL = process.env.REACT_APP_DEV_API_BE;

  const [myData, setMyData] = useState({});
  const [myAppointments, setMyAppointments] = useState([]);
  const [myTherapists, setMyTherapists] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [open, setOpen] = useState(false);

  const getMe = async () => {
    try {
      const response = await fetch(BASE_URL + "/clients/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMyData(data);
        dispatch(setUserInfo(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMyAppointments = async () => {
    try {
      const response = await fetch(BASE_URL + "/sessions/clients", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        const appointments = await response.json();
        setMyAppointments(appointments);
        // console.log("APPOINTMENTS", appointments);
        let therapists = appointments
          .filter((a) => a.therapistId)
          .map((a) => a.therapistId);
        // console.log(therapists);
        let uniqueTherapists = [];
        therapists.forEach((t) => {
          if (uniqueTherapists.findIndex((ut) => ut._id === t._id) === -1) {
            uniqueTherapists.push(t);
          }
        });
        console.log("unique", uniqueTherapists);
        setMyTherapists(uniqueTherapists);
        // console.log(myTherapists);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTherapistSessions = async (therapistId) => {
    try {
      const response = await fetch(BASE_URL + "/sessions/" + therapistId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        const therapistSessions = await response.json();
        console.log(therapistSessions);
        setSessions(therapistSessions);
        console.log(sessions);
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
          <EditIcon className="pencilIcon mb-3 mt-2 mr-2" />
          <div className="avatar_container">
            <img alt="avatar" src={myData.avatar} />
          </div>
          <p className="d-inline-block mb-0">
            {myData.name} {myData.surname}
          </p>
          <span className="d-inline-block mb-5 email">{myData.email}</span>
        </div>
        {/* Progress Tracker */}
        <Card>
          <CardHeader title="Progress Tracker" />
          <Card>
            <CardContent
              title="Diary"
              action={
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              }
            />
          </Card>

          <Card>
            <CardContent title="Quick Helpers" />
          </Card>
        </Card>
      </Grid>

      {/* ------------- RIGHT COLUMN ------------- */}
      <Grid item xs={12} md={6} className="utilities-col">
        {/* Search Therapists */}
        <Card>
          <CardContent>
            <Link to="/search">
              <Typography>Search Therapist</Typography>
            </Link>
          </CardContent>
        </Card>

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
              {console.log("!11", myAppointments)}
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
                        parseISO(appointment.start),
                        "EEEE dd MMM yyy h:m a"
                      )}
                    </Typography>
                    <Typography variant="body2">
                      {appointment.therapistId.name}{" "}
                      {appointment.therapistId.surname}
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
                    <Card key={therapist._id} className="therapist_card">
                      <CardHeader
                        avatar={
                          <Avatar
                            alt="therapist avatar"
                            src={therapist.avatar}
                            sx={{ width: 56, height: 56 }}
                          />
                        }
                        title={`${therapist.name} ${therapist.surname}`}
                        subheader={therapist.email}
                      />

                      <CardActions>
                        <Button size="small">Go To Profile</Button>
                      </CardActions>
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
