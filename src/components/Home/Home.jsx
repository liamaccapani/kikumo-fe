import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <h1>SO IT BEGINS!</h1>
      <Link to="/register">
        <Button>Register</Button>
      </Link>
    </>
  );
};

export default Home;
