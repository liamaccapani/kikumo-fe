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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = ({ history, location, match }) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((s) => s.user.isLoggedIn);
  const user = useSelector((s) => s.user.userData);

  const BASE_URL = process.env.REACT_APP_DEV_API_BE;
  const [values, setValues] = useState(
    {
      name: "",
      surname: "",
      email: "",
      password: "",
      role: "Client",
    },
    { showPassword: false }
  );

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

  const register = async (e) => {
    e.preventDefault();
    const { name, surname, email, password } = values;
    const role = values.role;
    try {
      const response = await fetch(
        BASE_URL +
          `${role === "Client" ? "/clients/register" : "/therapists/register"}`,
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
        //data: { id, token }
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        dispatch(setUserInfo(user));
        dispatch(setUserLogIn(loggedIn));
        if (role === "Client") {
          history.push("/profile");
        } else if (role === "Therapist") {
          history.push("/therapists/" + data._id);
          // history.push("/profileT");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box onSubmit={register} component="form" className="px-5 mt-5">
        {/* NAME */}
        <FormControl fullWidth variant="standard">
          <InputLabel>Name</InputLabel>
          <Input value={values.name} onChange={handleChange("name")} />
        </FormControl>

        {/* SURNAME */}
        <FormControl fullWidth variant="standard">
          <InputLabel>Surname</InputLabel>
          <Input value={values.surname} onChange={handleChange("surname")} />
        </FormControl>

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

        {/* ROLE */}
        <FormControl fullWidth variant="standard" className="pt-2">
          <InputLabel className="pt-2" id="role-select-label">
            Register as:
          </InputLabel>
          <Select
            labelId="role-select-label"
            id="demo-simple-select-standard"
            value={values.role}
            onChange={handleChange("role")}
            label="Role"
          >
            <MenuItem value={"Client"}>Client</MenuItem>
            <MenuItem value={"Therapist"}>Therapist</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" className="my-3 px-0 d-block">
          Register
        </Button>
      </Box>
    </>
  );
};

export default Register;