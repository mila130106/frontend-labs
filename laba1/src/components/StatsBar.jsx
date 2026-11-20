import './StatsBar.css';

// Лише відображення + кнопки. Власних копій стану тут немає.
export default function StatsBar({
  counts,
  totalClicks,
  currentSignal,
  orientation,
  isAutomatic,
  onStart,
  onStop,
  onToggleOrientation,
}) {
  // похідні значення: однозначно випливають зі стану
  const orientationLabel =
    orientation === 'vertical'
      ? 'Вертикальна орієнтація'
      : 'Горизонтальна орієнтація';
  const modeLabel = isAutomatic ? 'Автоматичний' : 'Ручний';

  return (
    <div className="stats-bar">
      <p>
        red: {counts.red} · yellow: {counts.yellow} · green: {counts.green}
      </p>
      <p>Усього ручних натискань: {totalClicks}</p>
      <p>Поточний сигнал: {currentSignal}</p>
      <p>Режим: {modeLabel}</p>
      <p>{orientationLabel}</p>

      <div className="stats-bar__buttons">
        <button type="button" onClick={onStart} disabled={isAutomatic}>
          Запустити
        </button>
        <button type="button" onClick={onStop} disabled={!isAutomatic}>
          Зупинити
        </button>
        <button type="button" onClick={onToggleOrientation}>
          Перемкнути орієнтацію
        </button>
      </div>
    </div>
  );
}