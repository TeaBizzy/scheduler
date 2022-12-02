import { useState } from "react"

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  function transition(mode) {
    setMode(mode);
  }

  return { mode, transition };
}
