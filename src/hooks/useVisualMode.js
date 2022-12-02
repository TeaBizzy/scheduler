import { useState } from "react"

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode) {
    setMode(mode);
    const newHistory = [...history, mode]
    setHistory(newHistory);
  }

  function back() {
    if(history.length < 2) return;

    const previousMode = history[history.length - 2];
    setHistory(history.slice(0, history.length-1));
    setMode(previousMode);
  }

  return { mode, transition, back };
}
