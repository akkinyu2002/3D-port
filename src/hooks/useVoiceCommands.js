import { useCallback, useEffect, useRef, useState } from "react";

function getSpeechRecognition() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function useVoiceCommands(onCommand) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const supported = Boolean(getSpeechRecognition());

  const parseCommand = useCallback(
    (text) => {
      const commands = {
        home: ["home", "go home", "start", "beginning"],
        about: ["about", "about me", "who", "bio", "background"],
        skills: ["skill", "skills", "open skills", "show skills", "abilities"],
        projects: [
          "project",
          "projects",
          "show projects",
          "work",
          "portfolio",
        ],
        contact: [
          "contact",
          "connect",
          "reach",
          "email",
          "phone",
          "get in touch",
        ],
      };

      for (const [section, keywords] of Object.entries(commands)) {
        for (const keyword of keywords) {
          if (text.includes(keyword)) {
            onCommand?.(section);
            return;
          }
        }
      }
    },
    [onCommand]
  );

  useEffect(() => {
    if (!supported) {
      return undefined;
    }

    const SpeechRecognition = getSpeechRecognition();
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript.toLowerCase();
      setTranscript(result);
      parseCommand(result);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;

      try {
        recognition.stop();
      } catch {
        // Ignore cleanup errors from browsers that stop automatically.
      }

      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
      }
    };
  }, [parseCommand, supported]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) {
      return;
    }

    setTranscript("");

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch {
      setIsListening(false);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) {
      return;
    }

    try {
      recognitionRef.current.stop();
    } finally {
      setIsListening(false);
    }
  }, [isListening]);

  return {
    isListening,
    transcript,
    supported,
    startListening,
    stopListening,
  };
}
