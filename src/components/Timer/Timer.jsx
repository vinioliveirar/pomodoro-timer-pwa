import { useState, useEffect } from "react";
import beepSound from "../../assets/sounds/beep.mp3";

export default function Timer() {
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem("pomodoroTime");
    return savedTime ? parseInt(savedTime, 10) : 1500;
  });

  const [isBreak, setIsBreak] = useState(() => {
    const savedBreak = localStorage.getItem("isBreak");
    return savedBreak === "true"; // Converte string para booleano
  });

  const [isRunning, setIsRunning] = useState(false);
  const [focusCycles, setFocusCycles] = useState(() => {
    const savedCycles = localStorage.getItem("focusCycles");
    return savedCycles ? parseInt(savedCycles, 10) : 0;
  });

  const maxTime = isBreak ? (focusCycles >= 3 ? 900 : 300) : 1500; // 15min, 5min ou 25min

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem("pomodoroTime", newTime);
          return newTime;
        });
      }, 1000);
    } else if (time === 0) {
      playAlarm();
      setIsRunning(false);
      localStorage.removeItem("pomodoroTime");

      if (!isBreak) {
        setFocusCycles((prevCycles) => prevCycles + 1);
      }

      setIsBreak((prev) => {
        const newBreakState = !prev;
        localStorage.setItem("isBreak", newBreakState);
        return newBreakState;
      });

      if (!isBreak && focusCycles >= 3) {
        setFocusCycles(0);
        setTime(900);
        localStorage.removeItem("isBreak");
      } else {
        setTime(isBreak ? 1500 : 300);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, time, isBreak, focusCycles]);

  useEffect(() => {
    localStorage.setItem("focusCycles", focusCycles);
    localStorage.setItem("isBreak", isBreak);
  }, [focusCycles, isBreak]);

  const handleSkip = () => {
    if (isBreak) {
      setIsBreak(false);
      setTime(1500);
    } else {
      if (focusCycles >= 3) {
        setFocusCycles(0);
        setTime(900);
      } else {
        setFocusCycles((prev) => prev + 1);
        setTime(300);
      }
      setIsBreak(true);
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(1500);
    setIsBreak(false);
    setIsRunning(false);
    setFocusCycles(0);
    localStorage.removeItem("pomodoroTime");
    localStorage.removeItem("isBreak");
    localStorage.removeItem("focusCycles");
  };

  const playAlarm = () => {
    const alarmSound = new Audio(beepSound);
    alarmSound.play().catch((error) => console.error("Erro ao reproduzir som:", error));
  };

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  const progress = (time / maxTime) * 100; // Calcula a % do tempo restante

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800/80 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-2">
          {isBreak ? "Hora da Pausa! ☕" : "Hora de Focar! 🚀"}
        </h2>
        <h3 className="text-lg font-semibold text-gray-300 mb-4">
          {isBreak ? "Pausa" : `Ciclo de Foco: ${focusCycles + 1}`}
        </h3>

        <h2 className="text-6xl font-bold mb-6">{formatTime(time)}</h2>

        {/* Barra de Progresso */}
        <div className="w-full h-4 bg-gray-700 rounded-lg overflow-hidden mb-4">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              backgroundColor: isBreak ? "#F7CA11" : "#3442B5", // Amarelo na pausa, Azul no foco
            }}
          ></div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            className={`px-6 py-3 rounded-lg font-semibold text-white transition ${isRunning ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
              }`}
            onClick={() => setIsRunning((prev) => !prev)}
          >
            {time === 0 ? "Iniciar Pausa" : isRunning ? "Pausar" : "Iniciar"}
          </button>

          {isRunning && (
            <button
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition"
              onClick={handleSkip}
            >
              Pular ⏩
            </button>
          )}

          <button
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
            onClick={resetTimer}
          >
            Resetar 🔄
          </button>
        </div>
      </div>
    </section>
  );
}
