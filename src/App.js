import { Route, BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";

// ********** COMPONENTS ********** \\
import Register from "./components/Register/Register.jsx"

function App() {
  return (
    <Container fluid>
      <Router>
        <h1>SO IT BEGINS!</h1>
        <Route path="/register" exact render={(routerProps) =>
          <Register {...routerProps} />}>
        </Route>
      </Router>
    </Container>
  );
}

export default App;
