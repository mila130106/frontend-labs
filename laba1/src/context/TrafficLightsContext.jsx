import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { listTrafficLights, updateTrafficLightState } from "../api/trafficLightsApi";

const PHASES = [
  { signal: "red", durationMs: 4000 },
  { signal: "yellow", durationMs: 1500 },
  { signal: "green", durationMs: 4000 },
  { signal: "yellow", durationMs: 1500 },
];

const SIGNAL_TO_PHASE_INDEX = {
  red: 0,
  yellow: 1,
  green: 2,
};

const INITIAL_COUNTS = {
  red: 0,
  yellow: 0,
  green: 0,
};

const TrafficLightsContext = createContext(null);

export function TrafficLightsProvider({ children }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [counts, setCounts] = useState(INITIAL_COUNTS);
  const [orientation, setOrientation] = useState("vertical");
  const [isAutomatic, setIsAutomatic] = useState(false);

  const [serverTrafficLights, setServerTrafficLights] = useState([]);
  const [loadStatus, setLoadStatus] = useState("idle");
  const [loadError, setLoadError] = useState("");
  const [saveStatus, setSaveStatus] = useState("idle");
  const [saveError, setSaveError] = useState("");

  const currentSignal = PHASES[phaseIndex]?.signal ?? "red";
  const totalClicks = counts.red + counts.yellow + counts.green;

  const mainServerRecord =
    serverTrafficLights.find((item) => item.id === "main") ?? null;
  const savedServerSignal = mainServerRecord?.currentSignal ?? null;

  const reloadTrafficLights = useCallback(async () => {
    setLoadStatus("loading");
    setLoadError("");

    try {
      const items = await listTrafficLights();
      setServerTrafficLights(items);

      const mainItem = items.find((item) => item.id === "main");
      if (mainItem && SIGNAL_TO_PHASE_INDEX[mainItem.currentSignal] !== undefined) {
        setPhaseIndex(SIGNAL_TO_PHASE_INDEX[mainItem.currentSignal]);
      }

      setLoadStatus("success");
    } catch (error) {
      setLoadStatus("error");
      setLoadError(
        error instanceof Error
          ? error.message
          : "Не вдалося завантажити збережений серверний стан."
      );
    }
  }, []);

  useEffect(() => {
    reloadTrafficLights();
  }, [reloadTrafficLights]);

  useEffect(() => {
    if (!isAutomatic) {
      return undefined;
    }

    const currentDuration = PHASES[phaseIndex]?.durationMs ?? 2000;
    const timerId = window.setTimeout(() => {
      setPhaseIndex((prevIndex) => (prevIndex + 1) % PHASES.length);
    }, currentDuration);

    return () => window.clearTimeout(timerId);
  }, [isAutomatic, phaseIndex]);

  const selectSignal = useCallback((signal) => {
    const nextPhaseIndex = SIGNAL_TO_PHASE_INDEX[signal];
    if (nextPhaseIndex === undefined) {
      return;
    }

    setPhaseIndex(nextPhaseIndex);
    setCounts((prevCounts) => ({
      ...prevCounts,
      [signal]: (prevCounts[signal] ?? 0) + 1,
    }));
  }, []);

  const toggleOrientation = useCallback(() => {
    setOrientation((prev) => (prev === "vertical" ? "horizontal" : "vertical"));
  }, []);

  const startAutomatic = useCallback(() => {
    setIsAutomatic(true);
  }, []);

  const stopAutomatic = useCallback(() => {
    setIsAutomatic(false);
  }, []);

  const saveCurrentSignal = useCallback(async () => {
    setSaveStatus("loading");
    setSaveError("");

    try {
      const updated = await updateTrafficLightState("main", currentSignal);
      setServerTrafficLights((prev) => {
        const hasMain = prev.some((item) => item.id === updated.id);
        if (hasMain) {
          return prev.map((item) => (item.id === updated.id ? updated : item));
        }
        return [...prev, updated];
      });
      setSaveStatus("success");
    } catch (error) {
      setSaveStatus("error");
      setSaveError(
        error instanceof Error
          ? error.message
          : "Не вдалося зберегти поточний сигнал на сервері."
      );
    }
  }, [currentSignal]);

  const value = {
    phaseIndex,
    currentSignal,
    counts,
    totalClicks,
    orientation,
    isAutomatic,
    serverTrafficLights,
    savedServerSignal,
    loadStatus,
    loadError,
    saveStatus,
    saveError,
    selectSignal,
    toggleOrientation,
    startAutomatic,
    stopAutomatic,
    reloadTrafficLights,
    saveCurrentSignal,
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
    throw new Error("useTrafficLights must be used inside TrafficLightsProvider");
  }
  return context;
}