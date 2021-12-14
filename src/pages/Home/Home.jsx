import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Grid, Paper} from "@mui/material";

import "./styles.css";

const Home = () => {
  return (
    <>
      <Grid container spacing={2} className="hero-login-box">
        <Grid item 
         xs={12} sm={6}
         className="d-flex flex-column justify-content-center align-items-center"
        >
          <Box className="buttons_box">
            <Button>
              <Link to="/register">
                Get Started
              </Link>
            </Button>
            <hr />
            <Button>
              <Link to="/login">Log In</Link>
            </Button>
          </Box>
        </Grid>
        <Grid item
         xs={12} sm={6}
        >
        <img className="hero-img" src="./canva.png" />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
