import { Container, Navbar } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./styles.css";
import { Logout } from "@mui/icons-material";

// Change buttons into profile if user is logged in!
const NavbarTop = ({ history }) => {
  const loggedIn = useSelector((state) => state.user.isLoggedIn);
  // console.log(loggedIn)
  const [myData, setMyData] = useState({})


  // TAKE VALUES FROM REDUX STORE NOT WITH A FECTH!!!
  // const getMe = async () => {
  //   const token = localStorage.getItem("accessToken");
  //   try {
  //     const response = await fetch(
  //       process.env.REACT_APP_DEV_API_BE + "/clients/me",
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       setMyData(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(getMe, []);

  const logout = () => {
    alert("Logging out")
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
        <span>NAME</span>
      </Navbar.Brand>
      {
      !loggedIn ? 
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
        {/* <span className="mr-2">{myData.name} {myData.surname}</span>
        <img alt="avatar" src={myData.avatar} height="30" width="30"/> */}
        LOGGED IN
        <KeyboardArrowDownIcon onClick={()=> logout()}/>
      </div>
      }
    </Navbar>
  );
};

export default withRouter(NavbarTop);
