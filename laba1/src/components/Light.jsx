import './Light.css';

// Один сигнал світлофора. Колір приходить ззовні через props.
// Light не знає, "правильний" це колір чи ні, він лише відображає отримане значення.
function Light({ color }) {
  return (
    <div
      className="light"
      style={{ color }}
      role="img"
      aria-label={`Сигнал: ${color}`}
    />
  );
}

export default Light;