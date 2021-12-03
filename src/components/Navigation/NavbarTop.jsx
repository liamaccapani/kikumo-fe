import { Container, Navbar } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";

// Change buttons into profile if user is logged in!
const NavbarTop = ({ history }) => {
  const loggedIn = useSelector((state) => state.user.isLoggedIn);
  // console.log(loggedIn)

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
      {
      !loggedIn ? 
      <div className="d-flex flex-row justify-content-end">
        <Button variant="text" color="secondary">
          <Link to="/login">Log In</Link>
        </Button>
        <Button variant="contained" color="secondary"> 
          <Link to="/register">Get Started</Link>
        </Button>
      </div>
      :
      <div>CULO</div>
      }
    </Navbar>
  );
};

export default withRouter(NavbarTop);
