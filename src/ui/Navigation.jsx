const navItems = [
  { id: "home", label: "HOME", icon: "\u25A1" },
  { id: "about", label: "ABOUT", icon: "\u25C8" },
  { id: "skills", label: "SKILLS", icon: "\u25CE" },
  { id: "projects", label: "PROJECTS", icon: "\u25C7" },
  { id: "contact", label: "CONTACT", icon: "\u25C9" },
];

export default function Navigation({ activeSection, onNavigate }) {
  return (
    <nav className="nav-container" id="main-navigation" aria-label="Main navigation">
      <div className="nav-brand">
        <span className="nav-logo">A.</span>
      </div>

      <div className="nav-items">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            id={`nav-${item.id}`}
            className={`nav-item ${activeSection === item.id ? "nav-active" : ""}`}
            onClick={() => onNavigate(item.id)}
            aria-current={activeSection === item.id ? "page" : undefined}
          >
            <span className="nav-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="nav-label">{item.label}</span>
            {activeSection === item.id && <span className="nav-indicator" />}
          </button>
        ))}
      </div>

      <div className="nav-status">
        <span className="status-pulse" />
        <span className="status-text">ONLINE</span>
      </div>
    </nav>
  );
}
