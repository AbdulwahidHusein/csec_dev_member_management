import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { useContext } from 'react';
import { UserContext } from './UserContext';
import "./App.css";

import './App.css'
import SidebarWithHeader from "./components/Sidebar";

import { ChakraProvider } from "@chakra-ui/react"
import LoginPage from './pages/auth/login';
import SignUP from './pages/auth/registration';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setUserData } = useContext(UserContext);

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
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <div className="centered-container">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <ChakraProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUP />} />
          <Route
            path="/"
            element={
              isAuthenticated ? <SidebarWithHeader /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </ChakraProvider>
    </Router>
  )
}

export default App;

/**
 * 
 *  
      <div style={{ paddingTop: '64px' }}>

        <Routes>
          <Route path="/" element={isAuthenticated ? <Event /> : <Navigate to="/login" />} />
          <Route path="/my-team" element={isAuthenticated ? <Team /> : <Navigate to="/login" />} />
          <Route path="/my-profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/community" element={isAuthenticated ? <Community /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isAuthenticated ? <SignIn /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />} />
        </Routes>
      </div>
 * 
 */