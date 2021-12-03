import { useState, useEffect } from "react";
import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogIn } from "../../redux/actions";

const Register = ({ history, location, match }) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.isLoggedIn);

  const BASE_URL = process.env.REACT_APP_DEV_API_BE;

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Client");

  // const dispatch = useDispatch()

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        BASE_URL +
          `${role === "Client" ? "/clients/register" : "/therapists/register"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, surname, email, password }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        //data: { id, token }
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        dispatch(setUserLogIn(loggedIn));
        if (role === "Client") {
          history.push("/profile");
        } else if (role === "Therapist") {
          history.push("/profileT");
        }
        // return data
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1> REGISTER </h1>
      <Form onSubmit={register}>
        <Form.Group>
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            // onChange={(e) => handleInput(e, 'name')}
          />
          <Form.Label>Your Surname</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            placeholder=""
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            // onChange={(e) => handleInput(e, 'surname')}
          />
          <Form.Label>Your email</Form.Label>
          <Form.Control
            size="sm"
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // onChange={(e) => handleInput(e, 'email')}
          />
          <Form.Label>Choose Password</Form.Label>
          <Form.Control
            size="sm"
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // onChange={(e) => handleInput(e, 'password')}
          />
          <Form.Label>Register as:</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Client</option>
            <option>Therapist</option>
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="success">
          Register
        </Button>
      </Form>
    </>
  );
};

export default Register;
