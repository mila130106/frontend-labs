import { createContext, useContext, useEffect, useState } from "react";

const TrafficLightsContext = createContext(null);

export const CYCLE = ["red", "yellow", "green", "yellow"];
export const MANUAL_PHASE = { red: 0, yellow: 1, green: 2 };
export const PHASE_DURATION_MS = 2000;

export function TrafficLightsProvider({ children }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [counts, setCounts] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState("vertical");
  const [isAutomatic, setIsAutomatic] = useState(false);

  const currentSignal = CYCLE[phaseIndex];
  const totalClicks = counts.red + counts.yellow + counts.green;

  useEffect(() => {
    if (!isAutomatic) {
      return undefined;
    }

    const timerId = setInterval(() => {
      setPhaseIndex((previous) => (previous + 1) % CYCLE.length);
    }, PHASE_DURATION_MS);

    return () => clearInterval(timerId);
  }, [isAutomatic]);

  const selectSignal = (signal) => {
    const targetPhase = MANUAL_PHASE[signal];
    if (targetPhase === undefined) {
      return;
    }

    setIsAutomatic(false);
    setPhaseIndex(targetPhase);
    setCounts((previous) => ({
      ...previous,
      [signal]: previous[signal] + 1,
    }));
  };

  const startAutomatic = () => {
    setIsAutomatic(true);
  };

  const stopAutomatic = () => {
    setIsAutomatic(false);
  };

  const toggleOrientation = () => {
    setOrientation((previous) =>
      previous === "vertical" ? "horizontal" : "vertical",
    );
  };

  const value = {
    phaseIndex,
    currentSignal,
    counts,
    totalClicks,
    orientation,
    isAutomatic,
    selectSignal,
    startAutomatic,
    stopAutomatic,
    toggleOrientation,
  };

  return (
    <TrafficLightsContext.Provider value={value}>
      {children}
    </TrafficLightsContext.Provider>
  );
}

export function useTrafficLights() {
  const context = useContext(TrafficLightsContext);
  if (!context) {
    throw new Error("useTrafficLights must be used within TrafficLightsProvider");
  }
  return context;
}