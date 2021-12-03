import { Route, BrowserRouter as Router } from "react-router-dom";
import Container from '@mui/material/Container';

// ********** PAGES ********** \\
// import BookAppointment from "./pages/Appointments/BookAppointment"
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login"
import Profile from "./pages/Profile/Profile"
import ProfileT from "./pages/Profile/ProfileT"
import Register from "./pages/Register/Register"
// ********** COMPONENTS ********** \\
import NavbarTop from "./components/Navigation/NavbarTop"

function App() {
  return (
    <Router>
      <NavbarTop/>
      <Container>
        <Route path="/" exact render={(routerProps) => <Home {...routerProps} />} />
        <Route path="/register" exact render={(routerProps) => <Register {...routerProps} />} />
        <Route path="/login" exact render={(routerProps) => <Login {...routerProps} />} />
        <Route path="/profile" exact render={(routerProps) => <Profile {...routerProps} />} />
        <Route path="/profileT" exact render={(routerProps) => <ProfileT {...routerProps} />} />
        {/* <Route path="/bookAppointment" exact render={(routerProps) => <BookAppointment {...routerProps} />} /> */}
      </Container>
    </Router>
  );
}

export default App;
