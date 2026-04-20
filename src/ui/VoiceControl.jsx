import { useVoiceCommands } from "../hooks/useVoiceCommands";

export default function VoiceControl({ onCommand }) {
  const { isListening, transcript, supported, startListening, stopListening } =
    useVoiceCommands(onCommand);

  if (!supported) return null;

  return (
    <div className="voice-control" id="voice-control">
      <button
        type="button"
        className={`voice-btn ${isListening ? "voice-active" : ""}`}
        onClick={isListening ? stopListening : startListening}
        title="Voice Commands"
        id="voice-toggle"
        aria-label={isListening ? "Stop voice commands" : "Start voice commands"}
        aria-pressed={isListening}
      >
        <div className="voice-waves">
          {isListening && (
            <>
              <span className="wave w1" />
              <span className="wave w2" />
              <span className="wave w3" />
            </>
          )}
        </div>
        <span className="voice-icon" aria-hidden="true">
          {isListening ? "\u25C9" : "\u{1F3A4}"}
        </span>
      </button>

      {transcript && (
        <div className="voice-transcript">
          <span className="transcript-label">Heard:</span>
          <span className="transcript-text">"{transcript}"</span>
        </div>
      )}

      {isListening && (
        <div className="voice-listening">
          <span className="listening-dot" />
          Listening...
        </div>
      )}
    </div>
  );
}
