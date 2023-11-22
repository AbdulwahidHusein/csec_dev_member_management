import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Header(props) {
  const isLargeScreen = useMediaQuery('(min-width: 600px)');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CSEC DEV
        </Typography>

        {isLargeScreen ? (
          <>
            {props.isAuthenticated ? (
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
                <Button color="inherit" component={Link} to="/logout">
                  Logout
                </Button>
                {/* Add Avatar for user profile */}
                <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  SignUp
                </Button>
              </>
            )}
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
              {props.isAuthenticated ? (
                <>
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
                  <MenuItem component={Link} to="/logout" onClick={handleMenuClose}>
                    Logout
                  </MenuItem>
                  {/* Add Avatar for user profile */}
                  <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
                </>
              ) : (
                <>
                  <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                    Login
                  </MenuItem>
                  <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
                    Register
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
