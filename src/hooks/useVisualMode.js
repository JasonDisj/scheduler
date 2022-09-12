import { useState } from "react";

const useVisualMode = (initial) => {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace === false) {
      setHistory((prev) => [...prev, mode]);
    }
    if (replace === true) {
      setHistory((prev) => [...prev.slice(0, -1), mode]);
    }
  };

  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, -1)]);
    }
  };

  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;
