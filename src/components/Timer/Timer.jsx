import { useState, useEffect } from "react";
import beepSound from "../../assets/sounds/beep.mp3";

export default function Timer() {
  const [time, setTime] = useState(0.1 * 60); // 25 minutos em segundos
  const [isRunning, setIsRunning] = useState(false); //controle do time rodando
  const [isBreak, setIsBreak] = useState(false); //controla a pausa
  const [focusCycles, setFocusCycles] = useState(0); //contador de ciclos

  useEffect(() => {
    let interval;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      playAlarm();
      setIsRunning(false);

      if (!isBreak) {
        setFocusCycles((prevCycles) => prevCycles + 1); // Aumenta ciclo após foco
      }

      setIsBreak((prev) => !prev);

      if (!isBreak && focusCycles >= 3) {
        setFocusCycles(0); // Reseta contador após o long break
        setTime(900); // 15 minutos (Long Break)
      } else {
        setTime(isBreak ? 1500 : 300); // 25 min foco / 5 min pausa
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, time, isBreak, focusCycles]);


  //função de pular ciclo ou break
  const handleSkip = () => {
    if (isBreak) {
      setIsBreak(false)
      setTime(1500)
    } else {
      if (focusCycles >= 3) {
        setFocusCycles(0)
        setTime(900)
      } else {
        setFocusCycles((prev) => prev + 1)
        setTime(300);
      }
      setIsBreak(true)
    }
    setIsRunning(false);
  }

  //função que faz o som
  const playAlarm = () => {
    const alarmSound = new Audio(beepSound);
    alarmSound.play().catch((error) => console.error("Erro ao reproduzir som:", error));
  };

  //função que formata o tempo
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60); //arredonda para baixo, deixando num inteiro
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    //garante que os minutos e segundos tenha 2 digitos
  }

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
        </div>
      </div>
    </section>
  );

}
