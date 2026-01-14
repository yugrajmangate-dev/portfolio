import React from 'react';

const projects = [
  {
    title: "SmartPark System",
    desc: "An intelligent parking charm that detects empty slots using IoT sensors.",
    tech: ["IoT", "Azure", "C++"],
    link: "https://github.com/YOUR_REAL_USERNAME_HERE/smart-park" // <--- PASTE REAL LINK HERE
  },
  {
    title: "Baymax Assistant",
    desc: "A voice-activated homunculus that automates daily tasks and web searches.",
    tech: ["Python", "AI", "Automation"],
    link: "https://github.com/YOUR_REAL_USERNAME_HERE/baymax" // <--- PASTE REAL LINK HERE
  },
  {
    title: "Dark Arts Defense (CTF)",
    desc: "Security tools and scripts written for Capture The Flag competitions.",
    tech: ["Linux", "Bash", "Security"],
    link: "https://github.com/YOUR_REAL_USERNAME_HERE/ctf-tools" // <--- PASTE REAL LINK HERE
  }
];

const Projects = () => {
  return (
    <div className="page" style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px', fontSize: 'clamp(2rem, 6vw, 3rem)' }}>My Spellbook</h1>
      <p style={{ textAlign: 'center', marginBottom: '50px', color: '#aaa', fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>Recent magical artifacts I have created.</p>
      
      <div className="project-grid">
        {projects.map((p, index) => (
          <div key={index} className="magic-card">
            <h3 style={{ fontSize: 'clamp(1rem, 4vw, 1.3rem)' }}>{p.title}</h3>
            <p style={{ margin: '15px 0', color: '#ddd', fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>{p.desc}</p>
            <div style={{ marginBottom: '20px', fontFamily: 'monospace', color: '#ffd700', fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)' }}>
              {p.tech.join(" • ")}
            </div>
            <a href={p.link} target="_blank" className="btn-magic">View Code</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;