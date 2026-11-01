import { useState } from 'react';
import Light from './Light';
import StatsBar from './StatsBar';
import './TrafficLights.css';

// Ідентифікатори сигналів для стану; кольори беруться з props colors за індексом.
const SIGNALS = ['red', 'yellow', 'green'];

export default function TrafficLights({
  initialOrientation = 'vertical',
  colors = ['red', 'yellow', 'green'],
}) {
  const [currentSignal, setCurrentSignal] = useState('red');
  const [counts, setCounts] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState(initialOrientation);

  // похідне значення, окремого useState немає
  const totalClicks = counts.red + counts.yellow + counts.green;

  function handleSelect(signal) {
    setCurrentSignal(signal);
    setCounts((previous) => ({
      ...previous,
      [signal]: previous[signal] + 1,
    }));
  }

  function handleToggleOrientation() {
    setOrientation((previous) =>
      previous === 'vertical' ? 'horizontal' : 'vertical',
    );
  }

  return (
    <div className="traffic-lights-wrapper">
      <div className={`traffic-lights traffic-lights--${orientation}`}>
        {SIGNALS.map((signal, index) => (
          <Light
            key={signal}
            signal={signal}
            color={colors[index]}
            active={currentSignal === signal}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <StatsBar
        counts={counts}
        totalClicks={totalClicks}
        currentSignal={currentSignal}
        orientation={orientation}
        onToggleOrientation={handleToggleOrientation}
      />
    </div>
  );
}