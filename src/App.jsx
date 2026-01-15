import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import MagicParticles from './components/MagicParticles';
import WandTrail from './components/WandTrail';
import FlyingOwl from './components/FlyingOwl';
import FlyingBroom from './components/FlyingBroom';
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
        
        {/* Flying Magical Creatures */}
        <FlyingOwl delay={0} direction="left-to-right" duration={18} />
        <FlyingOwl delay={3} direction="right-to-left" duration={20} />
        <FlyingBroom delay={1} duration={22} />
        <FlyingBroom delay={5} duration={25} />
        
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