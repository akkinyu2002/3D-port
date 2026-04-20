export default function ProjectDetail({ project, onClose }) {
  return (
    <div
      className="panel-overlay project-detail-overlay panel-visible"
      onClick={onClose}
    >
      <div className="project-detail-card" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="panel-close"
          onClick={onClose}
          aria-label={`Close ${project.title} details`}
        >
          {"\u2715"}
        </button>

        <div
          className="project-detail-header"
          style={{ borderColor: project.color }}
        >
          <div className="project-number" style={{ color: project.color }}>
            PROJECT 0{project.id}
          </div>
          <h2 className="project-detail-title">{project.title}</h2>
          <div
            className="project-accent-bar"
            style={{ background: project.color }}
          />
        </div>

        <div className="project-detail-body">
          <p className="project-detail-desc">{project.description}</p>

          <div className="project-tags">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="project-tag"
                style={{
                  borderColor: project.color,
                  color: project.color,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="project-detail-footer">
          <div className="project-status">
            <span className="status-dot" style={{ background: project.color }} />
            Completed
          </div>
        </div>
      </div>
    </div>
  );
}
