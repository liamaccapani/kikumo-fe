import { Container, Navbar } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Button from "@mui/material/Button";
import "./styles.css";

// Change buttons into profile if user is logged in!
const NavbarTop = ({ history }) => {
  return (
    <Navbar className="navbar-top">
      <Navbar.Brand>
        <Link to="/">
          <img
            alt=""
            src="logo.png"
            width="50"
            height="50"
            className="d-inline-block align-top mr-2"
          />
        </Link>
        <p className="d-inline">NAME</p>
      </Navbar.Brand>
      <div className="d-flex flex-row justify-content-end">
        <Button variant="text">
          <Link to="/login">Log In</Link>
        </Button>
        <Button> 
          {/* variant="contained" */}
          <Link to="/register">Get Started</Link>
        </Button>
      </div>
    </Navbar>
  );
};

export default withRouter(NavbarTop);
