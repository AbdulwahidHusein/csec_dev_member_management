import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import "./App.css";

import './App.css'
import SidebarWithHeader from "./components/Sidebar";

import { ChakraProvider } from "@chakra-ui/react"


function App() {
 

  return (
    <Router>
      <ChakraProvider>
          <SidebarWithHeader />
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