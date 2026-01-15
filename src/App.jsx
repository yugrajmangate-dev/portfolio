import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import MagicParticles from './components/MagicParticles';
import WandTrail from './components/WandTrail';
import './App.css';

const NavBar = () => {
  return (
    <nav>
      <div className="logo">Yugraj.Wiz</div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/projects" className="nav-link">Spells (Projects)</Link>
        <Link to="/contact" className="nav-link">Owl Me (Contact)</Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Magical Background Elements */}
        <MagicParticles />
        <WandTrail />
        
        {/* Navigation Bar */}
        <NavBar />
        
        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;