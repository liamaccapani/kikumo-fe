import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector  } from "react-redux";
import { setUserInfo } from "../../redux/actions";

const Register = ({ history, location, match }) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const dispatch = useDispatch()

  const register = async (e) => {
    // const { name, surname, email, password } = newUser
    e.preventDefault()
    try {
      const response = await fetch(process.env.REACT_APP_DEV_API_BE + "/clients/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, email, password }),
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

  // const getUserInfo = async () => {
  //   try {
  //     console.log("here 0")
  //     const response = await fetch(process.env.REACT_APP_DEV_API_BE + "/clients/me")
  //     console.log("here 1")
  //     if(response.ok){
  //       const {data} = await response.json()
  //       console.log("here 2")
  //       if(data){
  //         dispatch(setUserInfo(data))
  //         history.push("/profile")
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
            onChange={(e)=> setName(e.target.value)}
            // onChange={(e) => handleInput(e, 'name')}
          />
          <Form.Label>Your Surname</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            placeholder=""
            value={surname}
            onChange={(e)=> setSurname(e.target.value)}
            // onChange={(e) => handleInput(e, 'surname')}
          />
          <Form.Label>Your email</Form.Label>
          <Form.Control
            size="sm"
            type="email"
            placeholder=""
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            // onChange={(e) => handleInput(e, 'email')}
          />
          <Form.Label>Choose Password</Form.Label>
          <Form.Control
            size="sm"
            type="password"
            placeholder=""
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            // onChange={(e) => handleInput(e, 'password')}
          />
          <Form.Label>Register as:</Form.Label>
          <Form.Check
            type="checkbox"
            label="Client"
            value="Client"
            name="role"
            // checked={role} // true or false
            // onChange={(e) => handleInput(e, 'role')}
            // onChange={(e)=>}     
          />
          <Form.Check
            type="checkbox"
            label="Therapist"
            value="Therapist"
            name="role"
            // onChange={(e) => handleInput(e, 'role')}
            // onChange={(e)=>}
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Register
        </Button>
      </Form>
    </>
  );
};

export default Register;
