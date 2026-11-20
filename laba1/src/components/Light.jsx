import './Light.css';

// Light не має власного стану: колір, active, disabled і callback приходять через props.
function Light({ color, signal, active, disabled, onSelect }) {
  return (
    <button
      type="button"
      className={`light ${active ? 'light--active' : 'light--inactive'}`}
      style={{ color }}
      aria-label={`Сигнал: ${signal}`}
      aria-pressed={active}
      disabled={disabled}
      onClick={() => onSelect(signal)}
    />
  );
}

export default Light;