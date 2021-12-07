import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

import "./Home.css";

const Home = () => {
  return (
    <>
      <Grid container spacing={2} className="hero-login-box">
        <Grid item 
         xs={12} sm={6}
         className="d-flex flex-column justify-content-center align-items-center"
        >
          <Button>
            <Link to="/register">
              Get Started
            </Link>
          </Button>
          <hr />
          <Button>
            <Link to="/login">Log In</Link>
          </Button>
        </Grid>
        <Grid item
         xs={12} sm={6}
        >
          <img src="./images.jpg" />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
