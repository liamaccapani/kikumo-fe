import { Route, BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";

// ********** COMPONENTS ********** \\
import Home from "./components/Home/Home";
import Register from "./components/Register/Register"
import Profile from "./components/Profile/Profile"

function App() {
  return (
    <Container fluid>
      <Router>
        <Route path="/" exact render={(routerProps) => <Home {...routerProps} />} />
        <Route path="/register" exact render={(routerProps) => <Register {...routerProps} />} />
        <Route path="/profile" exact render={(routerProps) => <Profile {...routerProps} />} />
      </Router>
    </Container>
  );
}

export default App;
