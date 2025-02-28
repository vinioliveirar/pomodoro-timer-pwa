// src/components/Timer.jsx
import { useEffect } from "react";
import useTimer from "../../hooks/useTimer.jsx";
import TimerDisplay from "../TimerDisplay/TimerDisplay.jsx";
import ControlButtons from "../ControlButtons/ControlButtons.jsx";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import StageButtons from "../StageButtons/StageButtons.jsx";
import beepSound from "../../assets/sounds/beep.mp3";

export default function Timer() {
  const {
    time,
    isRunning,
    mode,
    changeMode,
    handleStartStop,
    handleReset,
    handleSkip,
    maxTime,
    setIsRunning,
  } = useTimer();

  // Função para tocar o som de alarme
  const playAlarm = () => {
    const alarmSound = new Audio(beepSound);
    alarmSound
      .play()
      .catch((error) => console.error("Erro ao reproduzir som:", error));
  };

  const progress = (time / maxTime) * 100;
  console.log("Progresso da barra:", progress);

  // Executa o som de alarme quando o tempo chega a zero
  useEffect(() => {
    if (time === 0) {
      playAlarm();
    }
  }, [time]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800/80 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <StageButtons mode={mode} changeMode={changeMode} />
        <TimerDisplay time={time} />
        <ProgressBar progress={progress} mode={mode} />
        <ControlButtons
          isRunning={isRunning}
          handleStartStop={handleStartStop}
          handleReset={handleReset}
          handleSkip={handleSkip}
          setIsRunning={setIsRunning}
          time={time}
        />
      </div>
    </section>
  );
}
