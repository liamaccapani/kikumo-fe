import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import "./Home.css"

const Home = () => {
  return (
    <>
      <div className="hero-login-box">
       <div className="d-flex flex-column justify-content-center align-items-center">
          <Link to="/register">
            <Button>Register</Button>
          </Link>
          <hr />
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
       </div>
        <img src="./images.jpg" />
      </div>
    </>
  );
};

export default Home;
