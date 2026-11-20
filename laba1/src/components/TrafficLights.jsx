import Light from "./Light";
import "./TrafficLights.css";

const SIGNALS = ["red", "yellow", "green"];

export default function TrafficLights({
  currentSignal = "red",
  orientation = "vertical",
  colors = ["red", "yellow", "green"],
  onSelectSignal,
}) {
  return (
    <div className={`traffic-lights traffic-lights--${orientation}`}>
      {SIGNALS.map((signal, index) => {
        const isCurrent = currentSignal === signal;
        const handleSelect = () => onSelectSignal?.(signal);

        return (
          <Light
            key={signal}
            color={colors[index] ?? signal}
            signal={signal}
            active={isCurrent}
            isActive={isCurrent}
            isLit={isCurrent}
            onClick={handleSelect}
            onSelect={handleSelect}
          />
        );
      })}
    </div>
  );
}