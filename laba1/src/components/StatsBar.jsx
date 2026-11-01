import './StatsBar.css';

// Лише відображення + кнопка. Власних копій стану тут немає.
export default function StatsBar({
  counts,
  totalClicks,
  currentSignal,
  orientation,
  onToggleOrientation,
}) {
  // похідне значення: однозначно випливає з orientation
  const orientationLabel =
    orientation === 'vertical'
      ? 'Вертикальна орієнтація'
      : 'Горизонтальна орієнтація';

  return (
    <div className="stats-bar">
      <p>
        red: {counts.red} · yellow: {counts.yellow} · green: {counts.green}
      </p>
      <p>Усього натискань: {totalClicks}</p>
      <p>Поточний сигнал: {currentSignal}</p>
      <p>{orientationLabel}</p>
      <button type="button" onClick={onToggleOrientation}>
        Перемкнути орієнтацію
      </button>
    </div>
  );
}