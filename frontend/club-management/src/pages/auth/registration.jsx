import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Select, MenuItem } from '@mui/material';
import axios from 'axios';
const theme = createTheme();

export default function SignUp() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = Object.fromEntries(data.entries());
        const email = formData["email"];
        const password = formData["password"];
        formData.user = {
            "email":email,"password":password
        }
        console.log(formData);
    
        try {
          const response = await axios.post('http://127.0.0.1:8000/members/register/', formData);
    
          // Handle the response data
          console.log('Registration successful');
          console.log(response.data);
          const { access } = response.data;
          const { refresh } = response.data;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        } catch (error) {
          // Handle the error
          console.error('Registration failed:', error);
        }
      };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="full_name"
              autoComplete="fullName"
              autoFocus
            />
            
            <Select
              margin="normal"
              required
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
              autoComplete="gender"
              autoFocus
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phone_number"
              autoComplete="phoneNumber"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="department"
              label="Department"
              name="departement"
              autoComplete="department"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              id="year"
              label="Year (Bach)"
              name="studyYear"
              autoComplete="studyYear"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="githubLink"
              label="Github Link"
              name="githubLink"
              autoComplete="githubLink"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="portfolioLink"
              label="Portfolio Link"
              name="portfolioLink"
              autoComplete="portfolioLink"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Re-type Password"
              type="password"
              id="password2"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}