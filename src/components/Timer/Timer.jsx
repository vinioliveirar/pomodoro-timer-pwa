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
    <section>

      <h2 className="text-xl font-bold">{isBreak ? "Hora da Pausa! ☕" : "Hora de Focar! 🚀"}</h2>
      <h3 className="text-lg font-semibold">
        {isBreak ? "Pausa" : `Ciclo de Foco: ${focusCycles + 1}`}
      </h3>

      <h2>{formatTime(time)}</h2>
      <div>
        <button
          className={`px-4 py-2 rounded-md m-2 text-white ${isRunning ? "bg-yellow-500" : "bg-green-500"
            }`}
          onClick={() => setIsRunning((prev) => !prev)} >
          {time === 0 ? "Iniciar Pausa" : isRunning ? "Pausar" : "Iniciar"}
        </button>
        {isRunning && (
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
            onClick={handleSkip}
          >
            Pular ⏩
          </button>
        )}


        {/* <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md m-2"
          onClick={() => setIsRunning(false)}>
          Pausar
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md m-2"
          onClick={() => setTime(1500)}>
          Resetar
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={handleShortBreak}>
          Short Break ☕
        </button> 
        {time === 0 && !isBreak && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            onClick={handleShortBreak}>
            Iniciar Pausa ☕
          </button>
        )}*/}
      </div>
    </section>
  );
}
