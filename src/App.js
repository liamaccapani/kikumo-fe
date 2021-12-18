import { Route, BrowserRouter as Router } from "react-router-dom";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@material-ui/core";
// ------------- PAGES -------------
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import ProfileT from "./pages/Profile/ProfileT";
import Register from "./pages/Register/Register";
import SearchTherapist from "./pages/Search/SearchTherapist";
import Therapist from "./pages/Profile/Therapist";
// ------------- COMPONENTS -------------
import NavbarTop from "./components/Navigation/NavbarTop";

const customTheme = createTheme({
  palette: {
    primary: {
      light: "#c9e0ff",
      main: "#a4c6ff",
      dark: "#77a0ff",
    },
    secondary: {
      light: "#dba2ef",
      main: "#d485ef",
      dark: "#a859d1",
    },
  },
  typography: {
    fontFamily: "Inter"
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <NavbarTop />
        <Container className="main px-0">
          <Route
            path="/"
            exact
            render={(routerProps) => <Home {...routerProps} />}
          />
          <Route
            path="/register"
            exact
            render={(routerProps) => <Register {...routerProps} />}
          />
          <Route
            path="/login"
            exact
            render={(routerProps) => <Login {...routerProps} />}
          />
          <Route
            path="/profile"
            exact
            render={(routerProps) => <Profile {...routerProps} />}
          />
          <Route
            path="/profiles/therapist"
            exact
            render={(routerProps) => <ProfileT {...routerProps} />}
          />
          <Route path="/therapists/:therapistId" component={Therapist} />
          <Route
            path="/search"
            exact
            render={(routerProps) => <SearchTherapist {...routerProps} />}
          />
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;