import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";


const Register = ({ history, location, match }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    role: ['Client', 'Therapist']
  })
  // const [name, setName] = useState('')

  const handleInput = (e, propertyName) => {
    setNewUser({
      ...newUser,
      [propertyName]: e.target.value
    })
  }

  const register = async (e) => {
    e.preventDefault()
    // const newUser = { name, surname, email, password }
    try {
      const response = await fetch(process.env.REACT_APP_DEV_API_BE + "/users/register", {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      if(response.ok) {
        const data = await response.json()
        console.log(data)
        localStorage.setItem("accessToken", data.accessToken);
        history.push("/profile")
      }
    } catch (error) {
      console.log(error)
    }
  }

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
            value={newUser.name}
            onChange={(e) => handleInput(e, 'name')}
          />
          <Form.Label>Your Surname</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            placeholder=""
            value={newUser.surname}
            onChange={(e) => handleInput(e, 'surname')}
          />
          <Form.Label>Your email</Form.Label>
          <Form.Control
            size="sm"
            type="email"
            placeholder=""
            value={newUser.email}
            onChange={(e) => handleInput(e, 'email')}
          />
          <Form.Label>Choose Password</Form.Label>
          <Form.Control
            size="sm"
            type="password"
            placeholder=""
            value={newUser.password}
            onChange={(e) => handleInput(e, 'password')}
          />
          <Form.Label>Register as:</Form.Label>
          <Form.Check
            type="checkbox"
            label="Client"
            value="Client"
            name="role"
            // checked={newUser.role} // true or false
            onChange={(e) => handleInput(e, 'role')}      
          />
          <Form.Check
            type="checkbox"
            label="Therapist"
            value="Therapist"
            name="role"
            onChange={(e) => handleInput(e, 'role')}      
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Login
        </Button>
      </Form>
    </>
  );
};

export default Register;
