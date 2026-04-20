import { Fragment, useEffect, useRef, useState } from "react";
import { useAIChat } from "../hooks/useAIChat";

export default function AIAssistant() {
  const { messages, isOpen, sendMessage, toggleChat, clearChat } = useAIChat();
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    sendMessage(trimmedInput);
    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    "What are his skills?",
    "Tell me about projects",
    "How to contact?",
    "Is he available?",
  ];

  return (
    <>
      <button
        type="button"
        className={`ai-orb ${isOpen ? "ai-orb-active" : ""}`}
        onClick={toggleChat}
        id="ai-assistant-toggle"
        title="AI Assistant"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={isOpen}
      >
        <div className="orb-glow" />
        <div className="orb-core">
          <span className="orb-icon" aria-hidden="true">
            {isOpen ? "\u2715" : "AI"}
          </span>
        </div>
        <div className="orb-ring" />
      </button>

      {isOpen && (
        <div className="ai-chat-panel" id="ai-chat-panel">
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-avatar-dot" />
              <div>
                <div className="chat-title">AI Assistant</div>
                <div className="chat-subtitle">Portfolio Intelligence</div>
              </div>
            </div>

            <button
              type="button"
              className="chat-clear"
              onClick={clearChat}
              disabled={messages.length === 0}
            >
              Clear
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={`${msg.role}-${index}`} className={`chat-message ${msg.role}`}>
                {msg.role === "assistant" && <div className="msg-avatar">AI</div>}
                <div className="msg-bubble">
                  <div className="msg-content">{renderFormattedMessage(msg.content)}</div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {messages.length <= 2 && (
            <div className="chat-suggestions">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="suggestion-chip"
                  onClick={() => sendMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask about Aakash..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              id="ai-chat-input"
            />
            <button
              type="button"
              className="chat-send"
              onClick={handleSend}
              disabled={!input.trim()}
              aria-label="Send chat message"
            >
              {"\u2192"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function renderFormattedMessage(text) {
  return text.split("\n").map((line, lineIndex) => (
    <Fragment key={`line-${lineIndex}`}>
      {renderInlineFormatting(line, lineIndex)}
      {lineIndex < text.split("\n").length - 1 && <br />}
    </Fragment>
  ));
}

function renderInlineFormatting(line, lineIndex) {
  const segments = line.split(/(\*\*.*?\*\*)/g);

  return segments.map((segment, segmentIndex) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong key={`segment-${lineIndex}-${segmentIndex}`}>
          {segment.slice(2, -2)}
        </strong>
      );
    }

    return (
      <Fragment key={`segment-${lineIndex}-${segmentIndex}`}>{segment}</Fragment>
    );
  });
}
