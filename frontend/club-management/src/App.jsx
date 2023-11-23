import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes,  Navigate } from 'react-router-dom';
import axios from 'axios';
import Event from './pages/events/Event';
import Team from './pages/team/Team';
import Profile from './pages/profile/Profile';
import Community from './pages/community/Community';
import Nopage from './pages/Nopage';
import SignIn from './pages/auth/login';
import SignUp from './pages/auth/registration';
import { UserProvider } from './UserContext';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import "./App.css";
import Header from './components/Header';
import { CircularProgress } from '@material-ui/core';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);
  const {setUserData} = useContext(UserContext);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          const response = await axios.get('http://127.0.0.1:8000/members/get_details/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUserData(response.data);
          //console.log(response.data)
          setIsAuthenticated(true);
        } else {
          // If there is no access token, redirect to the login page
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error)
        setIsAuthenticated(true);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    <div className="centered-container">
    <CircularProgress disableShrink />
  </div>
  }

  return (
    <Router>
      <div style={{ paddingTop: '64px' }}>
        <Sidebar />
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Event /> : <Navigate to="/login" />} />
          <Route path="/my-team" element={isAuthenticated ? <Team /> : <Navigate to="/login" />} />
          <Route path="/my-profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/community" element={isAuthenticated ? <Community /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isAuthenticated ? <SignIn /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />} />
          <Route path="*" element={<Nopage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;