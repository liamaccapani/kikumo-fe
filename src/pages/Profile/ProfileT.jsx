// ------------- COMPONENTS -------------
import DemoApp from "../../pages/Demo";
import Calendar from "../../components/Calendar"
// ------------- PACKAGES -------------
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

// ------------- REDUX -------------
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, setUserLogIn } from "../../redux/actions";

// ------------- MUI -------------
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
// ------------- ICONS -------------
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
// import WorkIcon from '@mui/icons-material/Work';

const ProfileT = ({ history, location, match }) => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("accessToken");
  const BASE_URL = process.env.REACT_APP_DEV_API_BE

  const [myData, setMyData] = useState({});
  const [myAppointments, setMyAppointments] = useState([]);
  const [myClients, setMyClients] = useState([]);

  const getMe = async () => {
    try {
      const response = await fetch(
        BASE_URL + "/therapists/me",
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
        dispatch(setUserInfo(data))
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMyAppointments = async () => {
    try {
      const response = await fetch(
        BASE_URL + "/sessions",
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
        let clients = appointments
          .filter((a) => a.clientId)
          .map((a) => a.clientId);
        // console.log(clients)
        let uniqueClients = [];
        clients.forEach((c) => {
          if (uniqueClients.findIndex((uc) => uc._id === c._id) === -1) {
            uniqueClients.push(c);
          }
        });
        // console.log('unique', uniqueClients)
        setMyClients(uniqueClients);
        // console.log(myClients)
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

        {/* Experiences */}
        {myData.experiences && (
          <Card>
            <CardHeader
              title="Working Experiences:"
              action={
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              }
            />
            {myData.experiences.map((experience) => {
              // console.log(experience);
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
            <CardHeader
              title="Specializations:"
              action={
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              }
            />
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
            <Typography>Availability</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Calendar />
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
            <Card>
              {myClients.map((client) => {
                return (
                  <Card key={client._id}>
                    <CardHeader avatar={<Avatar>{client.avatar}</Avatar>} />
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {client.name} {client.surname}
                      </Typography>
                      <Typography variant="h6" component="div"></Typography>
                      {/* <Typography variant="body2">
                        
                      </Typography> */}
                    </CardContent>
                  </Card>
                );
              })}
            </Card>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default ProfileT;
// export default withRouter(ProfileT);
