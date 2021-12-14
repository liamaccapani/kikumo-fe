import { Container, Navbar } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, setUserLogIn, setUserLogOut } from "../../redux/actions";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Logout } from "@mui/icons-material";
import "./styles.css";

const NavbarTop = ({ history }) => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.userData);

  const logout = () => {
    alert("Logging out")
    localStorage.clear()
    dispatch(setUserLogOut(isLogged));
    history.push("/")
  }

  return (
    <Navbar className="navbar-top px-4">
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
      {
      !isLogged ? 
      <div className="d-flex flex-row justify-content-end">
        <Button variant="text" color="secondary">
          <Link to="/login">Log In</Link>
        </Button>
        <Button variant="contained" color="primary"> 
          <Link to="/register" className="text-white">Get Started</Link>
        </Button>
      </div>
      :
      <div>
        <span className="mr-2">{user.name} {user.surname}</span>
        <img alt="avatar" src={user.avatar} height="30" width="30"/>
        <KeyboardArrowDownIcon onClick={()=> logout()}/>
      </div>
      }
    </Navbar>
  );
};

export default withRouter(NavbarTop);
