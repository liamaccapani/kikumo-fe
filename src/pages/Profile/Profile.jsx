import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// ------------- REDUX -------------
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/actions";
// ------------- DATE-FNS -------------
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
// ------------- ICONS -------------
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import HelpIcon from "@mui/icons-material/Help";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SearchIcon from "@mui/icons-material/Search";

import "./styles.css";

const Profile = ({ history, location, match }) => {
  const BASE_URL = process.env.REACT_APP_PROD_API_BE;
  const token = localStorage.getItem("accessToken");

  const dispatch = useDispatch();
  const user = useSelector((s) => s.user.userData);

  const [myAppointments, setMyAppointments] = useState([]);
  const [myData, setMyData] = useState({});
  const [myTherapists, setMyTherapists] = useState([]);

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
        let therapists = appointments
          .filter((a) => a.therapistId)
          .map((a) => a.therapistId);
        let uniqueTherapists = [];
        therapists.forEach((t) => {
          if (uniqueTherapists.findIndex((ut) => ut._id === t._id) === -1) {
            uniqueTherapists.push(t);
          }
        });
        console.log("unique", uniqueTherapists);
        setMyTherapists(uniqueTherapists);
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
        <Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="progress-tracker"
              id="progress-tracker"
            >
              <Typography>Progress Tracker</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="progress_tracker d-flex justify-content-start align-items-center" onClick={()=> console.log("lololol")}>
                <AddIcon className="text-muted"/>
                <span className="text-muted ml-2">Add a note</span>
              </div>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>

      {/* ------------- RIGHT COLUMN ------------- */}
      <Grid item xs={12} md={6} className="utilities-col">
        {/* Search Therapists */}
        <Card onClick={handleClickSearch}>
          <CardContent className="d-flex align-items-center justify-content-between">
            <Typography>Search Therapist</Typography>
            <SearchIcon />
          </CardContent>
        </Card>

        {/* Appointments */}
        <Accordion className="appointments">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="appointments"
            id="appointments"
          >
            <Typography>My Appointments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="appointments_container">
              <List sx={{ width: "90%", bgcolor: "background.paper" }}>
                {myAppointments.map((appointment) => {
                  return (
                    <>
                      <ListItem key={appointment._id} className="text-center">
                        <ListItemText
                          primary={format(
                            parseISO(appointment.start),
                            "EEEE dd MMM yyy h:mm a"
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
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Therapists */}
        <Accordion className="therapists">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="therapists"
            id="therapists"
          >
            <Typography>My Therapists</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {myTherapists && (
              <>
                {myTherapists.map((therapist) => {
                  return (
                    <Card
                      key={therapist._id}
                      className="therapist_card mb-2"
                      style={{ backgroundColor: "#bdb0d82d" }}
                    >
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
                          <Link to={"/therapists/" + therapist._id}>
                            Go To Profile
                          </Link>
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })}
              </>
            )}
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default Profile;
