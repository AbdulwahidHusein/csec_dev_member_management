import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Event from './pages/events/Event';
import Team from './pages/team/Team';
import Profile from './pages/profile/Profile';
import Community from './pages/community/Community';
import Nopage
 from './pages/Nopage';
function App() {
  return (
   <div>
    <Router>
      <Routes>
        <Route index element={<Event />} />
        <Route path="/my-team" element={<Team />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/community" element={<Community />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </Router>
   </div>
  );
}

export default App;