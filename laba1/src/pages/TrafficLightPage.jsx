import TrafficLights from "../components/TrafficLights";
import { useTrafficLights } from "../context/TrafficLightsContext";

export default function TrafficLightPage() {
  const {
    currentSignal,
    counts,
    totalClicks,
    orientation,
    isAutomatic,
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
  } = useTrafficLights();

  const isSaving = saveStatus === "loading";
  const orientationLabel =
    orientation === "vertical"
      ? "Вертикальна орієнтація"
      : "Горизонтальна орієнтація";
  const modeLabel = isAutomatic ? "Автоматичний" : "Ручний";

  return (
    <section className="page traffic-light-page">
      <h1>Traffic Light</h1>

      {loadStatus === "loading" && (
        <p className="request-status request-status--loading">
          Завантаження даних світлофора…
        </p>
      )}

      {loadStatus === "error" && (
        <div className="request-status request-status--error" role="alert">
          <p>Не вдалося завантажити збережений серверний стан.</p>
          {loadError && <p className="request-status__detail">{loadError}</p>}
          <button type="button" onClick={reloadTrafficLights}>
            Повторити
          </button>
        </div>
      )}

      <TrafficLights
        currentSignal={currentSignal}
        orientation={orientation}
        onSelectSignal={selectSignal}
      />

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

      <div className="controls">
        <button type="button" onClick={startAutomatic} disabled={isAutomatic}>
          Запустити
        </button>
        <button type="button" onClick={stopAutomatic} disabled={!isAutomatic}>
          Зупинити
        </button>
        <button type="button" onClick={toggleOrientation}>
          Перемкнути орієнтацію
        </button>
        <button
          type="button"
          onClick={saveCurrentSignal}
          disabled={isSaving}
        >
          {isSaving ? "Збереження…" : "Зберегти поточний сигнал"}
        </button>
      </div>

      {saveStatus === "loading" && (
        <p className="request-status request-status--loading">
          Збереження поточного сигналу на сервері…
        </p>
      )}

      {saveStatus === "success" && (
        <p className="request-status request-status--success">
          Збережено на сервері: {savedServerSignal}
        </p>
      )}

      {saveStatus === "error" && (
        <div className="request-status request-status--error" role="alert">
          <p>Серверне збереження не підтверджено.</p>
          {saveError && <p className="request-status__detail">{saveError}</p>}
        </div>
      )}
    </section>
  );
}