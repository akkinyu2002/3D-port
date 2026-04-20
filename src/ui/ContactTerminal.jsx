import { useEffect, useMemo, useRef, useState } from "react";
import { portfolioData } from "../data/portfolioData";

export default function ContactTerminal({ onClose }) {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const terminalRef = useRef(null);

  const { contact } = portfolioData;
  const terminalLines = useMemo(
    () => [
      { type: "system", text: "ESTABLISHING SECURE CONNECTION..." },
      { type: "system", text: "CONNECTION ESTABLISHED [OK]" },
      { type: "divider", text: "---------------------------------" },
      { type: "label", text: "CONTACT INTERFACE v2.0" },
      { type: "divider", text: "" },
      { type: "field", label: "PHONE", value: contact.phone },
      { type: "field", label: "EMAIL", value: contact.email },
      { type: "field", label: "LOCATION", value: contact.location },
      { type: "divider", text: "" },
      { type: "status", text: contact.availability },
      { type: "cta", text: contact.cta },
      { type: "divider", text: "---------------------------------" },
      { type: "prompt", text: "Ready to connect? >" },
    ],
    [contact]
  );

  const phoneHref = useMemo(
    () => `tel:${contact.phone.replace(/\s+/g, "")}`,
    [contact.phone]
  );

  useEffect(() => {
    if (currentLine >= terminalLines.length) {
      return undefined;
    }

    const timer = setTimeout(
      () => {
        setLines((prev) => [...prev, terminalLines[currentLine]]);
        setCurrentLine((prev) => prev + 1);
      },
      currentLine === 0 ? 500 : currentLine < 3 ? 400 : 150
    );

    return () => clearTimeout(timer);
  }, [currentLine, terminalLines]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="panel-overlay contact-panel panel-visible">
      <div className="terminal-container">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <span className="terminal-title">contact@aakash.terminal</span>
          <button
            type="button"
            className="panel-close terminal-close"
            onClick={onClose}
            aria-label="Close contact panel"
          >
            {"\u2715"}
          </button>
        </div>

        <div className="terminal-body" ref={terminalRef}>
          {lines.map((line, index) => (
            <div key={`${line.type}-${index}`} className={`terminal-line ${line.type}`}>
              {line.type === "system" && (
                <span>
                  <span className="terminal-prefix">[SYS]</span> {line.text}
                </span>
              )}
              {line.type === "label" && (
                <span className="terminal-label">{line.text}</span>
              )}
              {line.type === "field" && (
                <span>
                  <span className="terminal-prefix">{line.label}:</span>{" "}
                  <span className="terminal-value">{line.value}</span>
                </span>
              )}
              {line.type === "status" && (
                <span className="terminal-status">[LIVE] {line.text}</span>
              )}
              {line.type === "cta" && (
                <span className="terminal-cta">&gt; {line.text}</span>
              )}
              {line.type === "prompt" && (
                <span className="terminal-prompt">{line.text}</span>
              )}
              {line.type === "divider" && (
                <span className="terminal-divider">{line.text}</span>
              )}
            </div>
          ))}
        </div>

        <div className="terminal-actions">
          <a href={`mailto:${contact.email}`} className="btn-terminal">
            Send Email
          </a>
          <a href={phoneHref} className="btn-terminal">
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
