import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/actions";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
// ------------- MUI -------------
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

// import Modal from "@mui/material/Modal";
// import Tab from "@mui/material/Tab";
// import Tabs from "@mui/material/Tabs";
// ------------- ICONS -------------
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import HelpIcon from "@mui/icons-material/Help";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";

import "./styles.css";

const Profile = ({ history, location, match }) => {
  const BASE_URL = process.env.REACT_APP_DEV_API_BE;
  const token = localStorage.getItem("accessToken");

  const dispatch = useDispatch();
  const user = useSelector((s) => s.user.userData);

  const [myAppointments, setMyAppointments] = useState([]);
  const [myData, setMyData] = useState({});
  const [myTherapists, setMyTherapists] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const handleClickSearch = () => {
    history.push("/search");
  };

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

  useEffect(() => {
    getMe();
    getMyAppointments();
  }, []);

  return (
    <Grid container spacing={0.5} className="whole_profile my-3">
      {/* ------------- LEFT COLUMN ------------- */}
      <Grid item xs={12} md={6}>
        {/* Name, Surname, Avatar */}
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
          <CardHeader
            title="Progress Tracker"
            action={
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
            }
          />
          <Card>
            <CardContent title="Diary" />
          </Card>

          <Card>
            <CardContent title="Quick Helpers" />
          </Card>
        </Card>
      </Grid>

      {/* ------------- RIGHT COLUMN ------------- */}
      <Grid item xs={12} md={6} className="utilities-col">
        {/* Search Therapists */}
        <Card onClick={handleClickSearch}>
          <CardContent>
            <Typography>Search Therapist</Typography>
            <SearchIcon />
          </CardContent>
        </Card>

        {/* Appointments */}
        <Accordion
          className="appointments"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>My Appointments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {myAppointments.map((appointment) => {
                return (
                  <>
                    <ListItem key={appointment._id} className="ml-5">
                      <ListItemText
                        primary={format(
                          parseISO(appointment.start),
                          "EEEE dd MMM yyy h:m a"
                        )}
                        secondary={`${appointment.therapistId.name}
                        ${appointment.therapistId.surname}`}
                      />
                    </ListItem>
                    <hr />
                  </>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Therapists */}
        <Accordion
          className="therapists"
        >
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
                        <Button size="small">
                         <Link to={"/therapists/" + therapist._id}> Go To Profile</Link>
                        </Button>
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

// const getTherapistSessions = async (therapistId) => {
//   try {
//     const response = await fetch(BASE_URL + "/sessions/" + therapistId, {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     });
//     if (response.ok) {
//       const therapistSessions = await response.json();
//       console.log(therapistSessions);
//       setSessions(therapistSessions);
//       console.log(sessions);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

{
  /* <Box sx={{ width: "100%" }}>
  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
    <Tabs
      value={tabValue}
      onChange={handleChange}
      aria-label="basic tabs example"
      // indicatorColor="secondary"
    >
      <Tab icon={<StarIcon />} iconPosition="start" label="Diary" />
      <Tab icon={<HelpIcon />} iconPosition="start" label="Quick Helpers" />
    </Tabs>
  </Box>
  <TabPanel value={tabValue} index={0}>
    Item One
  </TabPanel>
  <TabPanel value={tabValue} index={1}>
    Item Two
  </TabPanel>
  <TabPanel value={tabValue} index={2}>
    Item Three
  </TabPanel>
</Box>; */
}

{/* <Card>
  {console.log("!11", myAppointments)}
  {myAppointments.map((appointment) => {
    return (
      <CardContent key={appointment._id}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {appointment.duration}
        </Typography>
        <Typography variant="h6" component="div">
          {format(parseISO(appointment.start), "EEEE dd MMM yyy h:m a")}
        </Typography>
        <Typography variant="body2">
          {appointment.therapistId.name} {appointment.therapistId.surname}
        </Typography>
      </CardContent>
    );
  })}
</Card>; */}
// const [sessions, setSessions] = useState([]);
// const [open, setOpen] = useState(false);
