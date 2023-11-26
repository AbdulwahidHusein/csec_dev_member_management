import React, { useEffect, useState , useContext} from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import "./App.css";

import './App.css'
import SidebarWithHeader from "./components/Sidebar";
import { UserContext } from './UserContext';
import { ChakraProvider } from "@chakra-ui/react"
import LoginPage from './pages/auth/login';

function App() {
const [isAuthenticated, setIsAuthnticated] = useState(false);
const {userData} = useContext(UserContext);
useEffect(
  ()=>{
    userData ? setIsAuthnticated(true): setIsAuthnticated(false)
  }, []
)

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