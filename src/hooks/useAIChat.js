import { useState, useCallback, useRef } from "react";
import { aiKnowledge } from "../data/portfolioData";

export function useAIChat() {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const hasGreeted = useRef(false);

  const getGreeting = useCallback(() => {
    const greetings = aiKnowledge.greetings;
    return greetings[Math.floor(Math.random() * greetings.length)];
  }, []);

  const matchCategory = useCallback((input) => {
    const lower = input.toLowerCase();
    const { keywords } = aiKnowledge;

    for (const [category, words] of Object.entries(keywords)) {
      for (const word of words) {
        if (lower.includes(word)) {
          return category;
        }
      }
    }
    return null;
  }, []);

  const sendMessage = useCallback(
    (userInput) => {
      const userMsg = { role: "user", content: userInput };
      const category = matchCategory(userInput);
      const response = category
        ? aiKnowledge.responses[category]
        : aiKnowledge.responses.fallback;

      const aiMsg = { role: "assistant", content: response };

      setMessages((prev) => [...prev, userMsg, aiMsg]);
      return response;
    },
    [matchCategory]
  );

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && !hasGreeted.current) {
        hasGreeted.current = true;
        setMessages([{ role: "assistant", content: getGreeting() }]);
      }
      return next;
    });
  }, [getGreeting]);

  const clearChat = useCallback(() => {
    setMessages([]);
    hasGreeted.current = false;
  }, []);

  return { messages, isOpen, sendMessage, toggleChat, clearChat };
}
