import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";

const SearchTherapist = ({ history, location, match }) => {
  const [therapists, setTherapists] = useState([]);
  const [query, setQuery] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("accessToken");
    const url = process.env.REACT_APP_DEV_API_BE + "/therapists";
    try {
      const response = await fetch(url, {
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
  useEffect(() => {
    fetchData();
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
              <CardContent key={therapist._id}>
                <Avatar>{therapist.avatar}</Avatar>
                <Typography>
                  {therapist.name} {therapist.surname}
                </Typography>
              </CardContent>
            ))}
        </Card>
      </Grid>

      {/* ------------- RIGHT COLUMN ------------- */}
      <Grid item xs={12} md={6} className="utilities-col">
        
      </Grid>
    </Grid>
  );
};

export default SearchTherapist;
