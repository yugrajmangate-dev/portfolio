import React from 'react';
import { projects } from '../data/projects';

const Projects = () => {
  return (
    <section id="projects" className="page" style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#FFD700', fontSize: 'clamp(2rem, 6vw, 2.5rem)', marginBottom: '15px', fontFamily: 'var(--wizard-font)', textShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}>
        📜 My Spellbook 📜
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '40px', color: '#aaa', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', fontStyle: 'italic' }}>
        Ancient artifacts and enchantments I have forged in the digital realm.
      </p>
      
      <div className="spells-grid">
        {projects.map((project, index) => (
          <div key={index} className="spell-card">
            <h3 className="spell-title">{project.title}</h3>
            <p className="spell-desc">{project.description}</p>
            
            {project.highlight && (
              <p className="spell-highlight">✨ {project.highlight}</p>
            )}
            
            <p className="spell-ingredients">
              🧪 Ingredients: {project.tech.join(' • ')}
            </p>
            
            <div className="spell-links">
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="cast-btn">
                  ⚡ Cast Spell
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="incantation-btn">
                  📖 View Incantation
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;