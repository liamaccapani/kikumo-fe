import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SearchTherapist = ({ history, location, match }) => {
  const token = localStorage.getItem("accessToken");
  const BASE_URL = process.env.REACT_APP_DEV_API_BE;
  const [therapists, setTherapists] = useState([]);
  const [therapist, setTherapist] = useState();
  const [query, setQuery] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const getAllTherapists = async () => {
    try {
      const response = await fetch(BASE_URL + "/therapists", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();

      setTherapists(data);
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getTherapist = async (therapistId) => {
    try {
      const response = await fetch(BASE_URL + "/therapists/" + therapistId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();

      setTherapist(data);
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllTherapists();
  }, []);

  return (
    <Grid container>
      {/* ------------- LEFT COLUMN ------------- */}
      <Grid item xs={12} md={6}>
        <div className="search">
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search for therapist"
              className="mr-sm-2 mb-4"
              value={query}
              onChange={handleChange}
            />
          </Form>
        </div>
        <Card>
          {therapists
            .filter((t) => t.name.toLowerCase().includes(query))
            .map((therapist) => (
              <div
                key={therapist._id}
                onClick={() => getTherapist(therapist._id)}
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
                />
              </div>
            ))}
        </Card>
      </Grid>

      {/* ------------- RIGHT COLUMN ------------- */}
      <Grid item xs={12} md={6} className="utilities-col">
        {therapist && (
          <>
            <div className="name_avatar">
              <div className="avatar_container">
                <img alt="avatar" src={therapist.avatar} />
              </div>
              <p className="d-inline-block mb-0">
                {therapist.name} {therapist.surname}
              </p>
              <span className="d-inline-block mb-5 email">
                {therapist.email}
              </span>
              <Button size="small">
                <Link to={"/therapists/" + therapist._id}>Go To Profile</Link>
              </Button>
            </div>
            <Card>
              <Accordion className="working-experiences">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Working Experiences:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {therapist.experiences && (
                    <Card>
                      {therapist.experiences.map((experience) => {
                        // console.log(experience);
                        return (
                          <>
                            <CardContent key={experience._id}>
                              <Typography>{experience.role}</Typography>
                              <Typography>{experience.description}</Typography>
                              <Typography>{experience.area}</Typography>
                            </CardContent>
                          </>
                        );
                      })}
                    </Card>
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion className="specializations">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Specializations</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {therapist.specializations && (
                    <Card>
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
                </AccordionDetails>
              </Accordion>
            </Card>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default SearchTherapist;
