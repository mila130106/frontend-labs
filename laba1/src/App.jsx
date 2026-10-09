import TrafficLights from './components/TrafficLights';
import './App.css';

function App() {
  return (
    <main className="app">
      <h1>Світлофор</h1>
      <div className="demo">
        <figure>
          <TrafficLights orientation="vertical" />
          <figcaption>Вертикальний</figcaption>
        </figure>
        <figure>
          <TrafficLights orientation="horizontal" />
          <figcaption>Горизонтальний</figcaption>
        </figure>
      </div>
    </main>
  );
}

export default App;