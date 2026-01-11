import React from 'react';

const skills = {
  "Languages": ["Java", "Python", "C/C++", "JavaScript"],
  "Frontend": ["React", "Next.js", "Tailwind CSS", "HTML5"],
  "Backend": ["Node.js", "Firebase", "Azure"],
  "Tools": ["Git", "VS Code", "Linux", "CTF Tools"]
};

const Skills = () => {
  return (
    <section id="skills" style={{ padding: '80px 0' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '40px' }}>Technical Skills</h2>
      <div className="skills-grid">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="skill-category">
            <h3>{category}</h3>
            <div className="skill-list">
              {items.map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;