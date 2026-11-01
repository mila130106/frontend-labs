import './Light.css';

// Light не має власного стану: колір, ознака active і callback приходять через props.
function Light({ color, signal, active, onSelect }) {
  return (
    <button
      type="button"
      className={`light ${active ? 'light--active' : 'light--inactive'}`}
      style={{ color }}
      aria-label={`Сигнал: ${signal}`}
      aria-pressed={active}
      onClick={() => onSelect(signal)}
    />
  );
}

export default Light;