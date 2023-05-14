import "./styles.css";
import { useState, useEffect } from "react";
export default function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [secValue, setSecValue] = useState(0);
  const [minValue, setMinValue] = useState(0);

  const [start, setStart] = useState(false);
  const handleStart = () => {
    setMinValue(minutes);
    setSecValue(seconds);

    setStart(true);
  };
  const handleToggle = () => {
    setStart(!start);
  };

  const handelReset = () => {
    setStart(false);
    setMinValue(0);
    setSecValue(0);
    setSeconds(0);
    setMinutes(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (start) {
        if (secValue > 0) {
          setSecValue(secValue - 1);
        }
        if (secValue === 0) {
          if (minValue === 0) {
            clearInterval(interval);
          } else {
            setMinValue(minValue - 1);
            setSecValue(59);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secValue, start]);

  return (
    <div className="App">
      <h1>
        {`${minValue
          .toString()
          .padStart(2, "0")}:${secValue.toString().padStart(2, "0")}`}
      </h1>

      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
      />
      <label>Minutes</label>
      <input
        type="number"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
      />
      <label>Seconds</label>
      <br />
      <br />

      <button onClick={handleStart}>Start</button>
      <button onClick={handleToggle}>Pause/Resume</button>
      <button onClick={handelReset}>Reset</button>
    </div>
  );
}
