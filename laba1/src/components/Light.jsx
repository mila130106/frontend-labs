import "./Light.css";

export default function Light({
  color = "red",
  signal,
  active = false,
  isActive = false,
  isLit = false,
  onClick,
  onSelect,
}) {
  const lightSignal = signal ?? color;
  const isLightOn = Boolean(active || isActive || isLit);

  const handleClick = (event) => {
    onClick?.(event);
    onSelect?.(lightSignal);
  };

  return (
    <button
      type="button"
      className={`light light--${color} ${isLightOn ? "light--active is-active active" : ""}`}
      aria-pressed={isLightOn}
      onClick={handleClick}
    />
  );
}