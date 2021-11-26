import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import {create, defaults} from "axios"

const Register = ({ history, location, match }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const API = create({baseURL: "http://localhost:3001"})
  const register = async () => {
    const { data } = await API.post(
      "/users/register",
      { name, surname, email, password },
      { method: "POST" }
    );
    console.log("data post req", data);
    localStorage.setItem("accessToken", data.accessToken);
    history.push("/profile")
  };


  return (
    <>
      <h1> REGISTER </h1>
      <Form.Group>
        <Form.Label>Your Name</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          placeholder=""
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Label>Your Surname</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          placeholder=""
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <Form.Label>Your email</Form.Label>
        <Form.Control
          size="sm"
          type="email"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Label>Choose Password</Form.Label>
        <Form.Control
          size="sm"
          type="password"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </Form.Group>
      <button className="registerButton" onClick={register}>
        Login
      </button>
    </>
  );
};

export default Register;
