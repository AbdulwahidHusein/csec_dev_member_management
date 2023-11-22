import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Event from './pages/events/Event';
import Team from './pages/team/Team';
import Profile from './pages/profile/Profile';
import Community from './pages/community/Community';
import Nopage from './pages/Nopage';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SignIn from './pages/auth/login';
import SignUp from './pages/auth/registration';
import { UserProvider } from './UserContext';
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from './UserContext';
function App() {
//   //const { setUserData } = useContext(UserContext);
//   const url = "http://127.0.0.1:8000/members/get_details/";
//   const  response = axios.get(url, {
//     "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNjE0NjM4LCJpYXQiOjE3MDA1OTY2MzgsImp0aSI6IjY5Yjc3ZDI3NjBhMTQ0YTE4ODEzNWU0NmU0ODlhNGY1IiwidXNlcl9pZCI6M30.mmun19-JZ1NN2nmQa_clIijnzYjHhzYvX2-2fSx2akM"
// })
  //console.log(response)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isLargeScreen = useMediaQuery('(min-width: 600px)');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router>
      <UserProvider>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CSEC DEV
          </Typography>
          {isLargeScreen ? (
            <>
              <Button color="inherit" component={Link} to="/">
                Event
              </Button>
              <Button color="inherit" component={Link} to="/my-team">
                My Team
              </Button>
              <Button color="inherit" component={Link} to="/my-profile">
                My Profile
              </Button>
              <Button color="inherit" component={Link} to="/community">
                Community
              </Button>
              <Button color="inherit" component={Link} to="/login">
                login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                SignUp
              </Button>
            </>
          ) : (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                  Event
                </MenuItem>
                <MenuItem component={Link} to="/my-team" onClick={handleMenuClose}>
                  My Team
                </MenuItem>
                <MenuItem component={Link} to="/my-profile" onClick={handleMenuClose}>
                  My Profile
                </MenuItem>
                <MenuItem component={Link} to="/community" onClick={handleMenuClose}>
                  Community
                </MenuItem>
                <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                  Login
                </MenuItem>
                <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
                  Register
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route index element={<Event />} />
        <Route path="/my-team" element={<Team />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/community" element={<Community />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;