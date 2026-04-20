import { portfolioData } from "../data/portfolioData";

export default function AboutPanel({ onClose }) {
  const { about, name, title, resumeUrl, socialLinks } = portfolioData;

  return (
    <div className="panel-overlay about-panel panel-visible">
      <div className="glass-panel about-glass">
        <button
          type="button"
          className="panel-close"
          onClick={onClose}
          aria-label="Close about panel"
        >
          {"\u2715"}
        </button>

        <div className="panel-header">
          <div className="panel-tag">IDENTITY</div>
          <h2 className="panel-title">{name}</h2>
          <p className="panel-subtitle">{title}</p>
        </div>

        <div className="panel-divider" />

        <div className="panel-body">
          <p className="panel-text">{about.description}</p>

          <div className="highlights-grid">
            {about.highlights.map((item) => (
              <div key={item} className="highlight-chip">
                <span className="chip-dot" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="panel-footer panel-actions">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hologram"
          >
            Download CV
          </a>
          <a
            href={socialLinks.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hologram btn-hologram-secondary"
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
}
