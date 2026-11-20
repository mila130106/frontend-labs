import { useTrafficLights } from "../context/TrafficLightsContext";

export default function StatsPage() {
  const { counts, totalClicks, currentSignal, orientation, isAutomatic } =
    useTrafficLights();

  const orientationLabel =
    orientation === "vertical"
      ? "Вертикальна орієнтація"
      : "Горизонтальна орієнтація";
  const modeLabel = isAutomatic ? "Автоматичний" : "Ручний";

  return (
    <section className="page stats-page">
      <h1>Statistics</h1>
      <div className="stats-bar">
        <p>
          red: {counts.red} · yellow: {counts.yellow} · green: {counts.green}
        </p>
        <p>Усього ручних натискань: {totalClicks}</p>
        <p>Поточний сигнал: {currentSignal}</p>
        <p>Режим: {modeLabel}</p>
        <p>{orientationLabel}</p>
      </div>
    </section>
  );
}