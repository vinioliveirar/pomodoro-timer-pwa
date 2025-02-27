import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(25 * 60); // 25 minutos em segundos
  const [isRunning, setIsRunning] =
    useState(false); //controle do time rodando

  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            setIsBreak((prev) => !prev);
            return isBreak ? 1500 : 300;
          }
          return prevTime - 1;
        }
        );
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, isBreak]);

  /*function toggleTimer() {
    setIsRunning(!isRunning);
  }*/

  const handleShortBreak = () => {
    if (isBreak) {
      setIsBreak(false);
      setTime(1500); // 25 min para trabalho
    } else {
      setIsBreak(true);
      setTime(300); // 5 min para pausa
    }
    setIsRunning(false); // Sempre pausa ao trocar
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
      <h2 className="text-xl font-bold">
        {isBreak ? "Hora da Pausa! ☕" : "Hora de Focar! 🚀"}
      </h2>
      <h2>{formatTime(time)}</h2>
      <div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md m-2"
          onClick={() => setIsRunning(true)}
        >
          Iniciar
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md m-2"
          onClick={() => setIsRunning(false)}
        >
          Pausar
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md m-2"
          onClick={() => setTime(1500)}
        >
          Resetar
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={handleShortBreak}
        >
          Short Break ☕
        </button>
      </div>
    </section>
  );
}
