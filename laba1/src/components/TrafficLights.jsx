import { useEffect, useState } from 'react';
import Light from './Light';
import StatsBar from './StatsBar';
import './TrafficLights.css';

// Ідентифікатори сигналів для відображення; кольори беруться з props colors за індексом.
const SIGNALS = ['red', 'yellow', 'green'];

// Єдина модель циклу. yellow зустрічається двічі, тому зберігаємо позицію, а не колір.
const CYCLE = ['red', 'yellow', 'green', 'yellow'];

// Позиція в циклі для ручного вибору (yellow завжди відповідає першій позиції).
const MANUAL_PHASE = { red: 0, yellow: 1, green: 2 };

// Константа поза компонентом, тому не є реактивною залежністю ефекту.
const PHASE_DURATION_MS = 2000;

export default function TrafficLights({
  initialOrientation = 'vertical',
  colors = ['red', 'yellow', 'green'],
}) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [counts, setCounts] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState(initialOrientation);
  const [isAutomatic, setIsAutomatic] = useState(false);

  // Похідні значення: окремого useState для них немає.
  const currentSignal = CYCLE[phaseIndex];
  const totalClicks = counts.red + counts.yellow + counts.green;

  // Ефект синхронізує браузерний таймер зі станом isAutomatic.
  useEffect(() => {
    if (!isAutomatic) {
      return;
    }

    const timerId = setInterval(() => {
      // Функціональна форма: ефекту не потрібен phaseIndex у залежностях.
      setPhaseIndex((previous) =>