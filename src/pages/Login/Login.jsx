import { useState } from "react";
// ------------- REDUX -------------
import { useDispatch, useSelector } from "react-redux";
import { setUserLogIn } from "../../redux/actions";
// ------------- MUI -------------
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
} from "@mui/material";
// ------------- ICONS -------------
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = ({ history, location, match }) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.isLoggedIn);

  const BASE_URL = process.env.REACT_APP_PROD_API_BE;

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const showPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const login = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    try {
      const response = await fetch(BASE_URL + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        if (data.role === "Client") {
          history.push("/profile");
        } else if (data.role === "Therapist") {
          history.push("/profiles/therapist");
        }
        dispatch(setUserLogIn(loggedIn));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box onSubmit={login} component="form" className="px-5 mt-5">
        {/* EMAIL */}
        <FormControl fullWidth variant="standard">
          <InputLabel>Email</InputLabel>
          <Input value={values.email} onChange={handleChange("email")} />
        </FormControl>
        {/* PASSWORD */}
        <FormControl fullWidth variant="standard">
          <InputLabel>Password</InputLabel>
          <Input
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={showPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button type="submit" className="my-3 px-0">
          Sign In
        </Button>
      </Box>
    </>
  );
};

export default Login;
