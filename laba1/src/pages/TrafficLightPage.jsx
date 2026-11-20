import TrafficLights from "../components/TrafficLights";
import StatsBar from "../components/StatsBar";
import { useTrafficLights } from "../context/TrafficLightsContext";

export default function TrafficLightPage() {
  const {
    currentSignal,
    counts,
    totalClicks,
    orientation,
    isAutomatic,
    selectSignal,
    startAutomatic,
    stopAutomatic,
    toggleOrientation,
  } = useTrafficLights();

  return (
    <section className="page traffic-light-page">
      <h1>Traffic Light</h1>

      <TrafficLights
        currentSignal={currentSignal}
        orientation={orientation}
        onSelectSignal={selectSignal}
      />

      <StatsBar
        counts={counts}
        totalClicks={totalClicks}
        currentSignal={currentSignal}
        orientation={orientation}
        isAutomatic={isAutomatic}
        onStart={startAutomatic}
        onStop={stopAutomatic}
        onToggleOrientation={toggleOrientation}
      />
    </section>
  );
}