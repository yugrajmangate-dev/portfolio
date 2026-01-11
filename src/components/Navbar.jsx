import React from 'react';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>Yugraj.dev</h1>
      <ul style={styles.links}>
        <li><a href="#home" style={styles.link}>Home</a></li>
        <li><a href="#projects" style={styles.link}>Projects</a></li>
        <li><a href="#contact" style={styles.link}>Contact</a></li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1.5rem',
    backgroundColor: '#1e293b',
    color: 'white',
  },
  logo: { margin: 0 },
  links: { display: 'flex', listStyle: 'none', gap: '20px' },
  link: { color: '#94a3b8', textDecoration: 'none', fontSize: '1.1rem' }
};

export default Navbar;