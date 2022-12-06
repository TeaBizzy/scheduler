import { useState } from "react"

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if(replace) {
      setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.pop();
      newHistory.push(mode);
      return newHistory;
    })} else {
      setHistory((prev) => ([...prev, mode]));
    }
    setMode(mode);

  }

  function back() {
    if(history.length < 2) return;

    setHistory(prev => {
      prev.pop();
      setMode(prev[prev.length - 1]);
      return prev;
    });
  }

  return { mode, transition, back };
}
