import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

const Login = ({ history, location, match }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        process.env.REACT_APP_DEV_API_BE + "/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        //data: { id, token } NO MORE, NOW -> { token }
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        history.push("/profile")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>LOGIN</h1>
      <Form onSubmit={login}>
        <Form.Group>
          <Form.Label>Your email</Form.Label>
          <Form.Control
            size="sm"
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // onChange={(e) => handleInput(e, 'email')}
          />
          <Form.Label>Your Password</Form.Label>
          <Form.Control
            size="sm"
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // onChange={(e) => handleInput(e, 'password')}
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Sign In
        </Button>
      </Form>
    </>
  );
};

export default Login;
