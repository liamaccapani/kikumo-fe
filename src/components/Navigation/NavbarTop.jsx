import { Navbar } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
// ------------- REDUX -------------
import { useDispatch, useSelector } from "react-redux";
import { setUserLogOut } from "../../redux/actions";
// ------------- MUI -------------
import { Avatar, Button, Container, Typography } from "@mui/material";
// ------------- ICONS -------------
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Logout } from "@mui/icons-material";

import "./styles.css";

const NavbarTop = ({ history }) => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.userData);

  const logout = () => {
    alert("Logging out");
    dispatch(setUserLogOut(isLogged));
    localStorage.clear();
    localStorage.removeItem("persist:root");
    history.push("/");
  };

  return (
    <Container className="px-0">
      <Navbar className="navbar-top px-0">
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
          <div className="d-inline-block mt-2">KiKumo</div>
        </Navbar.Brand>
        {!isLogged ? (
          <div className="d-flex flex-row justify-content-end">
            <Button variant="text" color="secondary">
              <Link to="/login">Log In</Link>
            </Button>
            <Button variant="contained" color="primary">
              <Link to="/register" className="text-white">
                Get Started
              </Link>
            </Button>
          </div>
        ) : (
          <div className="d-flex flex-row align-items-end justify-content-center">
            <Avatar alt="avatar" src={user.avatar} />
            <Typography className="mx-2 mb-2">
              <Link
                to={user.role === "Client" ? "/profile" : "/profiles/therapist"}
              >
                {user.name} {user.surname}
              </Link>
            </Typography>
            <KeyboardArrowDownIcon className="arrow_down" onClick={() => logout()} />
          </div>
        )}
      </Navbar>
    </Container>
  );
};

export default withRouter(NavbarTop);
