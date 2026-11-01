import TrafficLights from './components/TrafficLights';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <h1>Світлофор</h1>
      <TrafficLights colors={['#ff3b30', '#ff9500', '#34c759']} />
    </div>
  );
}