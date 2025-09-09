import { useEffect, useState } from "react";
import "./App.css";

let interval;

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);



  // Función para iniciar el temporizador
  const startTimer = () => {
    
    if (interval) {
      clearInterval(interval);
    }

    if (!isRunning) {
      setIsRunning(true);
      interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds === 59) {
            setMinutes((minutes) => minutes + 1);
            return 0;
          }
          return seconds + 1;
        })
      }, 1000);
    } else {
      alert("El temporizador ya se está ejecutando");
      return;
    }
  };

  // Función para pausar el temporizador
  const pauseTimer = () => {
    if (isRunning && interval) {
      setIsRunning(false);
      clearInterval(interval);
    } else {
      alert("El temporizador no se está ejecutando");
      return;
    }
  };

  // Función para resetear el temporizador
  const resetTimer = () => {
    setIsRunning(false);

    if (interval) {
      clearInterval(interval);
    }

    setMinutes(0);
    setSeconds(0);
  };

  // Función para dar formato al tiempo (minutos y segundos)
  const formatTimer = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  // Función que retorna un objeto con los minutos y segundos
  const timerCheck = () => {
    const time = {
      minutes: formatTimer(minutes),
      seconds: formatTimer(seconds),
    };
    return `${time.minutes}:${time.seconds}`;
  };

  return (
    <div>
      <h1>Temporizador</h1>
      <p>Inicia en 00:00, cuenta en segundos, pausable y reiniciable</p>
      <div className="timer">
        <button id="btnComenzar" hidden={isRunning === true} onClick={startTimer}>
          Comenzar
        </button>
        <p>
          {timerCheck()}
        </p>
        <button id="btnPausar" hidden={isRunning === false} onClick={pauseTimer}>
          Pausar
        </button>
        {((minutes > 0 || seconds > 0) && isRunning === false) && (
          <button onClick={resetTimer}>Reiniciar</button>
        )}
      </div>
    </div>
  );
}

export default App;
