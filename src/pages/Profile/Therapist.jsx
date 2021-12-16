import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
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

import TherapistAvailability from "../../components/Calendars/TherapistAvailability";

const Therapist = ({ history, location, match }) => {
  const token = localStorage.getItem("accessToken");
  const BASE_URL = process.env.REACT_APP_DEV_API_BE;
  const [therapist, setTherapist] = useState();

  const getTherapistData = async () => {
    try {
      const response = await fetch(
        BASE_URL + "/therapists/" + match.params.therapistId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();
      setTherapist(data);
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getTherapistData();
  }, []);

  return (
    <Grid container spacing={0.5} className="whole_profile my-3">
      {therapist && (
        <>
          <Grid item xs={12} md={6}>
            <div className="name_avatar">
              <div className="avatar_container mt-5">
                <img alt="avatar" src={therapist.avatar} />
              </div>
              <p className="d-inline-block mb-0">
                {therapist.name} {therapist.surname}
              </p>
              <span className="d-inline-block mb-5 email">{therapist.email}</span>
            </div>

            {therapist.experiences && (
              <Card>
                <CardHeader title="Working Experiences:" />
                {therapist.experiences.map((experience) => {
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

          <Grid item xs={12} md={6} className="utilities-col">
            {therapist.specializations && (
              <Card>
                <CardHeader title="Specializations:" />
                {therapist.specializations.map((specialization) => {
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

            <Accordion className="availability">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Availability</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TherapistAvailability therapistId={therapist._id} />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default withRouter(Therapist);
