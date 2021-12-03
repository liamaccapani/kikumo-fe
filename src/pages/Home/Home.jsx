import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Home = () => {
  return (
    <Box sx={{ bgcolor: "#c9e0ff", height: "100vh" }}>
      <div className="d-flex flex-row justify-content-center align-items-center">
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
    </Box>
  );
};

export default Home;
