import { Route, BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";

// ********** COMPONENTS ********** \\
import Home from "./components/Home/Home";
import Register from "./components/Register/Register"

function App() {
  return (
    <Container fluid>
      <Router>
        <Route path="/" exact render={(routerProps) => <Home {...routerProps} />} />
        <Route path="/register" exact render={(routerProps) => <Register {...routerProps} />} />
      </Router>
    </Container>
  );
}

export default App;
