import { useEffect, useMemo, useRef, useState } from "react";
import { HashRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import { Reveal, useParallax, useSmoothScroll } from "./useSmoothScroll";
import { WandCursor } from "./WandCursor";

const NAV_ITEMS = [
  { to: "/", label: "Great Hall", icon: "🏰" },
  { to: "/about", label: "About", icon: "⚡" },
  { to: "/projects", label: "Spellbook", icon: "📖" },
  { to: "/contact", label: "Owl Post", icon: "🦉" },
];

const ROLES = [
  "Backend Engineer @ CyberXDelta",
  "Full-Stack Developer",
  "Python Potion Brewer",
  "Cybersecurity Defender",
  "AI/ML Apprentice",
  "Open Source Contributor",
];

const SKILLS = [
  { label: "React / Next.js", level: 90, color: "#61dafb" },
  { label: "Node.js / Express", level: 85, color: "#8cc84b" },
  { label: "Python / FastAPI", level: 88, color: "#ffd343" },
  { label: "PostgreSQL / MongoDB", level: 80, color: "#5a9df8" },
  { label: "Cybersecurity / CTF", level: 78, color: "#ff6b6b" },
  { label: "TensorFlow / ML", level: 72, color: "#ff9f1c" },
  { label: "AWS / GCP / Azure", level: 70, color: "#f59e0b" },
  { label: "ESP32 / Embedded", level: 65, color: "#c5a009" },
];

const ACHIEVEMENTS = [
  { icon: "🥇", title: "Ciphathon 2026", sub: "₹50K · MIT-WPU", color: "#ffd700" },
  { icon: "🥈", title: "CUK CS AIthon 2026", sub: "Runner-up · ₹5K + MATLAB", color: "#d1d5db" },
  { icon: "🌱", title: "ECC AdMesh Grant", sub: "₹10K Seed Funding", color: "#64ffda" },
  { icon: "🏴‍☠️", title: "Cyberon CTF", sub: "5th Place", color: "#ff6b6b" },
  { icon: "⚔️", title: "GRAFFITI 2026 CTF", sub: "11th Place", color: "#c5a009" },
  { icon: "🔬", title: "GSSoC 2026", sub: "Open Source Contributor", color: "#a78bfa" },
];

const PROJECTS = [
  {
    title: "SmartPark - AI Parking Platform",
    desc: "AI-powered parking reservations for dense tech hubs with slot search, live availability, and map-aware routing.",
    tech: ["Next.js", "React", "TypeScript", "Firebase", "Azure"],
    badge: "Imagine Cup 2026 MVP",
    badgeColor: "#ffd700",
    icon: "🅿️",
    github: "https://github.com/yugrajmangate-dev",
  },
  {
    title: "MPCB STP Audit System",
    desc: "Government contract product for STP audit workflows, report generation, and multi-user review across a four-person team.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "PDF Gen"],
    badge: "Govt. Contract · YECPL",
    badgeColor: "#64ffda",
    icon: "🏛️",
    github: "https://github.com/yugrajmangate-dev",
  },
  {
    title: "LookIn - AI Attendance",
    desc: "Cloud-based face-recognition attendance with FastAPI, Supabase, and a responsive admin workflow.",
    tech: ["FastAPI", "Next.js", "OpenCV", "Supabase"],
    badge: "Academic Project",
    badgeColor: "#a78bfa",
    icon: "👁️",
    github: "https://github.com/yugrajmangate-dev",
  },
  {
    title: "Baymax Voice Assistant",
    desc: "A Jarvis-style assistant for voice-triggered automation, local actions, and third-party API workflows.",
    tech: ["Python", "Speech Recognition", "APIs"],
    badge: "Personal Build",
    badgeColor: "#ff6b6b",
    icon: "🤖",
    github: "https://github.com/yugrajmangate-dev",
  },
  {
    title: "AdMesh SDK",
    desc: "A non-intrusive ad integration SDK for publishers, built as a seed-funded startup experiment.",
    tech: ["JavaScript", "Node.js", "SDK Design"],
    badge: "Startup · ₹10K Seed",
    badgeColor: "#ffd700",
    icon: "🚀",
    github: "https://github.com/AdMesh-sdk",
  },
  {
    title: "ESP32 Biometric Access",
    desc: "A hardware prototype using fingerprint sensors and a real-time display for secure access control.",
    tech: ["ESP32", "C/C++", "R307", "ST7789"],
    badge: "Hardware Prototype",
    badgeColor: "#8cc84b",
    icon: "🔐",
    github: "https://github.com/yugrajmangate-dev",
  },
];

const PROJECT_FILTERS = ["All", "Next.js", "Python", "C/C++", "AI/ML", "Cybersecurity"];

const PORTFOLIO_REPO_URL = "https://github.com/yugrajmangate-dev/portfolio";

const SOCIALS = [
  { icon: "💼", label: "LinkedIn", href: "https://linkedin.com/in/yugrajmangate", color: "#0077b5" },
  { icon: "🐙", label: "GitHub", href: PORTFOLIO_REPO_URL, color: "#6e5494" },
  { icon: "🌐", label: "Portfolio", href: "https://yugraj.in", color: "#c5a009" },
];

const HOME_SECTIONS = [
  {
    step: "01",
    eyebrow: "Current Arc",
    title: "Building systems that feel sharp, useful, and hard to ignore.",
    body:
      "I work across backend engineering, AI-assisted products, and security-minded full-stack builds. The focus is not decoration first. It is clarity, speed, and reliable product behavior.",
    tags: ["Backend", "AI/ML", "Security", "React"],
  },
  {
    step: "02",
    eyebrow: "What I Build",
    title: "From prototypes to production-shaped products.",
    body:
      "Parking platforms, audit systems, attendance tools, voice assistants, and startup SDK experiments. I like products with real users, messy constraints, and strong technical ownership.",
    tags: ["Next.js", "FastAPI", "Postgres", "Systems Thinking"],
  },
  {
    step: "03",
    eyebrow: "Operating Style",
    title: "Calm interfaces in front. Serious engineering underneath.",
    body:
      "The visual direction can be cinematic, but the code should stay disciplined. I care about maintainability, performance, and flow, especially when a portfolio is supposed to feel alive while scrolling.",
    tags: ["Performance", "DX", "Animation", "Clean Architecture"],
  },
];

const BASE_URL = import.meta.env.BASE_URL;

function HogwartsBackground() {
  return (
    <div className="hogwarts-bg" aria-hidden="true">
      <video
        className="hogwarts-video"
        autoPlay
        muted
        loop
        playsInline
        src={`${BASE_URL}hogwarts.mp4`}
        poster={`${BASE_URL}hogwarts-poster.jpg`}
      />
      <div className="hogwarts-overlay" />
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}${open ? " nav-open" : ""}`}>
      <div className="navbar-inner">
        <Link to="/" className="nav-logo">
          <span className="logo-rune">ᚱ</span>
          <span className="logo-text">Yugraj.Wiz</span>
          <span className="logo-rune">ᚢ</span>
        </Link>

        <button type="button" className={`hamburger${open ? " open" : ""}`} onClick={() => setOpen((current) => !current)} aria-label="Toggle navigation">
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links${open ? " active" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `nav-link${isActive ? " nav-active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {open ? <button type="button" className="nav-overlay" onClick={() => setOpen(false)} aria-label="Close menu" /> : null}
      </div>
    </nav>
  );
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="section-header">
      <span className="section-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <div className="header-rule" />
      {subtitle ? <p className="section-sub">{subtitle}</p> : null}
    </div>
  );
}

function CardCorners() {
  return (
    <>
      <div className="card-corner tl" />
      <div className="card-corner tr" />
      <div className="card-corner bl" />
      <div className="card-corner br" />
    </>
  );
}

function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      if (barRef.current) {
        barRef.current.style.width = `${progress * 100}%`;
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div ref={barRef} className="scroll-progress" />;
}

function StorySection({ entry, index }) {
  const { ref, style } = useParallax(0.08);

  return (
    <section className="story-section">
      <Reveal className={`story-panel${index % 2 === 1 ? " align-right" : ""}`} delay={60}>
        <span ref={ref} style={style} className="story-step parallax-layer">
          {entry.step}
        </span>
        <div className="story-copy">
          <span className="story-eyebrow">{entry.eyebrow}</span>
          <h2 className="story-title">{entry.title}</h2>
          <p className="story-body">{entry.body}</p>
          <div className="story-tags">
            {entry.tags.map((tag) => (
              <span key={`${entry.step}-${tag}`} className="story-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function HomePage() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIndex];
    let timer = 0;

    if (deleting) {
      if (displayed.length > 0) {
        timer = window.setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        timer = window.setTimeout(() => {
          setDeleting(false);
          setRoleIndex((current) => (current + 1) % ROLES.length);
        }, 0);
      }
    } else if (displayed.length < target.length) {
      timer = window.setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else {
      timer = window.setTimeout(() => setDeleting(true), 2200);
    }

    return () => window.clearTimeout(timer);
  }, [deleting, displayed, roleIndex]);

  return (
    <section className="page home-page">
      <div className="hero-content">
        <Reveal className="hero-eyebrow" delay={0}>
          <span className="eyebrow-line" />
          <span className="eyebrow-text">Portfolio of a Digital Wizard</span>
          <span className="eyebrow-line" />
        </Reveal>

        <Reveal as="h1" className="hero-name" delay={100}>
          <span className="name-yugraj">Yugraj Mangate</span>
        </Reveal>

        <Reveal className="hero-role-line" delay={180}>
          <span className="role-prefix">✦</span>
          <span className="role-text">{displayed}</span>
          <span className="role-cursor">|</span>
        </Reveal>

        <Reveal as="p" className="hero-desc" delay={260}>
          2nd-year CSE at <strong>I²IT Pune</strong> · CGPA <strong>9.43</strong> · Interning at <strong>CyberXDelta</strong> · Co-founder of <strong>AdMesh</strong> · Ciphathon 2026 Champion <span className="gold">₹50K</span>
        </Reveal>

        <Reveal className="hero-badges" delay={340}>
          {["IEEE Member", "GSSoC 2026", "CTF Competitor", "Seed Funded"].map((badge) => (
            <span key={badge} className="badge">
              {badge}
            </span>
          ))}
        </Reveal>

        <Reveal className="hero-cta" delay={420}>
          <Link to="/projects" className="btn-primary-magic">
            <span className="btn-glyph">⚡</span>
            Open Spellbook
          </Link>
          <Link to="/contact" className="btn-outline-magic">
            <span className="btn-glyph">🦉</span>
            Send Owl
          </Link>
          <a href={PORTFOLIO_REPO_URL} target="_blank" rel="noreferrer" className="btn-ghost-magic">
            <span className="btn-glyph">📜</span>
            GitHub
          </a>
        </Reveal>
      </div>

      <div className="home-story">
        {HOME_SECTIONS.map((section, index) => (
          <StorySection key={section.step} entry={section} index={index} />
        ))}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="page about-page">
      <Reveal delay={0}>
        <SectionHeader eyebrow="The Wizard's Chronicle" title="About Me" />
      </Reveal>

      <div className="about-grid">
        <Reveal as="article" className="about-text magic-card" delay={80}>
          <CardCorners />
          <h3>🧙 Origin Story</h3>
          <p>
            A 2nd-year Computer Science student at <strong>I²IT Pune</strong> with a CGPA of <strong>9.43</strong>. Currently interning as a <strong>Backend & AI/ML Engineer at CyberXDelta</strong>.
          </p>
          <p>
            I am also leading full-stack development for the <strong>MPCB STP Audit Management System</strong>, a government contract delivery across a four-person team.
          </p>
          <p>
            Alongside that, I co-founded <strong>AdMesh</strong>, contribute through GSSoC, and stay active in IEEE and cybersecurity communities.
          </p>
        </Reveal>

        <Reveal as="article" className="about-skills magic-card" delay={160}>
          <CardCorners />
          <h3>⚗️ Spell Proficiency</h3>
          {SKILLS.map((skill) => (
            <div key={skill.label} className="skill-row">
              <div className="skill-label">
                <span>{skill.label}</span>
                <span className="skill-pct">{skill.level}%</span>
              </div>
              <div className="skill-track">
                <div className="skill-fill" style={{ "--w": `${skill.level}%`, "--c": skill.color }} />
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal delay={0}>
        <SectionHeader eyebrow="Trophies & Honours" title="Achievements" />
      </Reveal>

      <div className="achievements-grid">
        {ACHIEVEMENTS.map((achievement, index) => (
          <Reveal key={achievement.title} as="article" className="achievement-card magic-card" delay={index * 70}>
            <CardCorners />
            <span className="ach-icon" style={{ "--c": achievement.color }}>
              {achievement.icon}
            </span>
            <h4 className="ach-title" style={{ color: achievement.color }}>
              {achievement.title}
            </h4>
            <p className="ach-sub">{achievement.sub}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (filter === "All") {
      return PROJECTS;
    }

    return PROJECTS.filter(
      (project) =>
        project.tech.some((tech) => tech.includes(filter)) ||
        project.badge.includes(filter) ||
        project.desc.includes(filter)
    );
  }, [filter]);

  return (
    <section className="page projects-page">
      <Reveal delay={0}>
        <SectionHeader eyebrow="Ancient Artifacts & Enchantments" title="My Spellbook" subtitle="Enchantments forged in the digital realm." />
      </Reveal>

      <Reveal className="filter-row" delay={60}>
        {PROJECT_FILTERS.map((projectFilter) => (
          <button
            key={projectFilter}
            type="button"
            className={`filter-btn${filter === projectFilter ? " active" : ""}`}
            onClick={() => setFilter(projectFilter)}
          >
            {projectFilter}
          </button>
        ))}
      </Reveal>

      <div className="spells-grid">
        {filteredProjects.map((project, index) => (
          <Reveal key={project.title} as="article" className="spell-card magic-card" delay={index * 70}>
            <CardCorners />
            <div className="spell-header">
              <span className="spell-icon">{project.icon}</span>
              <span className="spell-badge" style={{ borderColor: project.badgeColor, color: project.badgeColor }}>
                {project.badge}
              </span>
            </div>
            <h3 className="spell-title">{project.title}</h3>
            <p className="spell-desc">{project.desc}</p>
            <div className="spell-tech">
              {project.tech.map((tech) => (
                <span key={`${project.title}-${tech}`} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
            <div className="spell-actions">
              <a href={project.github} target="_blank" rel="noreferrer" className="spell-btn">
                📜 Incantation
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ContactPage() {
  const email = "mangateyugraj@gmail.com";
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const mailHref = isMobile ? `mailto:${email}` : `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

  return (
    <section className="page contact-page">
      <Reveal delay={0}>
        <SectionHeader eyebrow="Floo Network · Owl Post" title="Get In Touch" subtitle='"Send a message via the floo network."' />
      </Reveal>

      <div className="contact-grid">
        <Reveal as="article" className="contact-card magic-card" delay={60}>
          <CardCorners />
          <div className="contact-icon-wrap">
            <span className="contact-big-icon">✉️</span>
          </div>
          <h3>Howler (Email)</h3>
          <p className="contact-detail">{email}</p>
          <a href={mailHref} target="_blank" rel="noreferrer" className="btn-primary-magic">
            ✉ Compose Mail
          </a>
        </Reveal>

        <Reveal as="article" className="contact-card magic-card" delay={120}>
          <CardCorners />
          <div className="contact-icon-wrap">
            <span className="contact-big-icon">📞</span>
          </div>
          <h3>Floo Call</h3>
          <p className="contact-detail">+91 72638 17870</p>
          <a href="tel:+917263817870" className="btn-outline-magic">
            📞 Call Me
          </a>
        </Reveal>

        <Reveal as="article" className="contact-card magic-card" delay={180}>
          <CardCorners />
          <div className="contact-icon-wrap">
            <span className="contact-big-icon">📍</span>
          </div>
          <h3>Location</h3>
          <p className="contact-detail">
            Pimpri-Chinchwad, Pune
            <br />
            <span className="contact-muted">Maharashtra Sector 9¾</span>
          </p>
        </Reveal>
      </div>

      <Reveal className="socials-row" delay={220}>
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="social-link"
            style={{ "--sc": social.color }}
          >
            <span className="social-icon">{social.icon}</span>
            <span>{social.label}</span>
          </a>
        ))}
      </Reveal>
    </section>
  );
}

export default function App() {
  useSmoothScroll();

  return (
    <HashRouter>
      <WandCursor />
      <ScrollProgress />
      <HogwartsBackground />
      <div className="app-shell">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <footer className="site-footer">
          ⚡ Yugraj Mangate · 2026 · Forged with React & Dark Magic ⚡ <a href={PORTFOLIO_REPO_URL} target="_blank" rel="noreferrer">Source on GitHub</a>
        </footer>
      </div>
    </HashRouter>
  );
}
