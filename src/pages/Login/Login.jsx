import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, setUserLogIn } from "../../redux/actions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = ({ history, location, match }) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((s) => s.user.isLoggedIn);
  const user = useSelector((s) => s.user.userData);
  // console.log("USER SELECTOR", user); // empty strings

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
      const response = await fetch(
        process.env.REACT_APP_DEV_API_BE + "/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        const data = await response.json();
        //data: { id, token, role}
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        dispatch(setUserInfo(user));
        dispatch(setUserLogIn(loggedIn));
        if (data.role === "Client") {
          history.push("/profile");
        } else if (data.role === "Therapist") {
          history.push("/profileT");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        onSubmit={login}
        component="form"
        className="px-5"
        // sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}
      >
        <FormControl fullWidth variant="standard">
          <InputLabel>Email</InputLabel>
          <Input value={values.email} onChange={handleChange("email")} />
        </FormControl>
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
