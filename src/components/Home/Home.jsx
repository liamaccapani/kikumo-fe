import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <h1>SO IT BEGINS!</h1>
      <Link to="/register">
        <Button variant="success">Register</Button>
      </Link>
      <Link to="/login">
        <Button>Sign In</Button>
      </Link>
    </>
  );
};

export default Home;
