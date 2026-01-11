export default function ProjectCard({ project }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-cyan-400/60 hover:-translate-y-1 transition-all">
      <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
      <p className="text-sm text-slate-300 mb-3">{project.description}</p>
      {project.highlight && (
        <p className="text-xs text-cyan-300 mb-3">{project.highlight}</p>
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[11px] px-2 py-1 rounded-full bg-slate-800 text-slate-200"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-3 text-sm">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:text-cyan-300"
          >
            View code
          </a>
        )}
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 hover:text-slate-100"
          >
            Live demo
          </a>
        )}
      </div>
    </div>
  );
}
