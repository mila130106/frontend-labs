import { useTrafficLights } from "../context/TrafficLightsContext";

export default function StatsPage() {
  const {
    counts,
    totalClicks,
    currentSignal,
    savedServerSignal,
    orientation,
    isAutomatic,
    loadStatus,
  } = useTrafficLights();

  const orientationLabel =
    orientation === "vertical"
      ? "Вертикальна орієнтація"
      : "Горизонтальна орієнтація";
  const modeLabel = isAutomatic ? "Автоматичний" : "Ручний";

  return (
    <section className="page stats-page">
      <h1>Statistics</h1>

      {loadStatus === "loading" && (
        <p className="request-status request-status--loading">
          Завантаження даних світлофора…
        </p>
      )}

      <div className="stats-bar">
        <p>
          red: {counts.red} · yellow: {counts.yellow} · green: {counts.green}
        </p>
        <p>Усього ручних натискань: {totalClicks}</p>
        <p>Поточний сигнал (у пам’яті): {currentSignal}</p>
        <p>
          Збережений сигнал (сервер): {savedServerSignal ?? "невідомо"}
        </p>
        <p>Режим: {modeLabel}</p>
        <p>{orientationLabel}</p>
      </div>
    </section>
  );
}