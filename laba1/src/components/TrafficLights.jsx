import Light from './Light';
import './TrafficLights.css';

// Склад сигналів спільний для всіх варіантів світлофора.
const COLORS = ['red', 'yellow', 'green'];

// TrafficLights відповідає за композицію: збирає три екземпляри Light.
// orientation змінює лише компонування ("vertical" | "horizontal").
function TrafficLights({ orientation = 'vertical' }) {
  return (
    <div className={`traffic-lights traffic-lights--${orientation}`}>
      {COLORS.map((color) => (
        <Light key={color} color={color} />
      ))}
    </div>
  );
}

export default TrafficLights;