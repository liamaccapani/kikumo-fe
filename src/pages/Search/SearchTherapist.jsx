import { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
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
  Grid,
  Typography,
} from "@mui/material";
// ------------- ICONS -------------
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./styles.css"

const SearchTherapist = ({ history, location, match }) => {
  const token = localStorage.getItem("accessToken");
  const BASE_URL = process.env.REACT_APP_DEV_API_BE;
  const [therapists, setTherapists] = useState([]);
  const [therapist, setTherapist] = useState();
  // const [specializations, setSpecializations] = useState([]);
  const [query, setQuery] = useState("");
  const [isSelected, setIsSelected] = useState(false);

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
      // let allSpecs = data.map(d=> d.specializations.map(s => s.category))
      // console.log("SPECS", allSpecs)
      // const uniqueSpecs = []
      // allSpecs
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
      console.log(data)
      // setSpecializations(data.specializations.map(s => s.category))
      // console.log("SPECS", specializations)
      setIsSelected(true);
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllTherapists();
  }, []);

  return (
    <Grid container spacing={2} className="my-3">
      {/* ------------- LEFT COLUMN ------------- */}
      <Grid item xs={12} md={6}>
        <div className="search">
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search for therapist"
              className="mr-sm-2 mb-2"
              value={query}
              onChange={handleChange}
            />
          </Form>
        </div>
        <Box id="therapists">
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
        </Box>
      </Grid>

      {/* ------------- RIGHT COLUMN ------------- */}
      <Grid item xs={12} md={6} className="utilities-col">
        {isSelected === false ? (
          <div className="_placeholder">
            <Typography variant="h5" className="text-muted">
              Please select a therapist
            </Typography>
            <img src="./canva_search.png" />
          </div>
        ) : (
          [
            therapist && (
              <>
                <div className="name_avatar">
                  <div className="avatar_container mt-4">
                    <img alt="avatar" src={therapist.avatar} />
                  </div>
                  <p className="d-inline-block mb-0">
                    {therapist.name} {therapist.surname}
                  </p>
                  <span className="d-inline-block mb-2 email">
                    {therapist.email}
                  </span>
                  <Button size="small" className="mb-4">
                    <Link to={"/therapists/" + therapist._id}>
                      Go To Profile
                    </Link>
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
                                  <Typography>
                                    {experience.description}
                                  </Typography>
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
                                  <Typography>
                                    {specialization.category}
                                  </Typography>
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
            ),
          ]
        )}
      </Grid>
    </Grid>
  );
};

export default SearchTherapist;