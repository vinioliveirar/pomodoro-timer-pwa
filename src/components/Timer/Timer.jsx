import { useEffect } from "react";
import useTimer from "../../hooks/useTimer.jsx";
import TimerDisplay from "../TimerDisplay/TimerDisplay.jsx";
import ControlButtons from "../ControlButtons/ControlButtons.jsx";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import StageButtons from "../StageButtons/StageButtons.jsx";

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
  } = useTimer();

  const progress = (time / maxTime) * 100;

  // Atualiza o título da aba corretamente
  useEffect(() => {
    // Define o título baseado no modo
    let modeTitle;
    if (mode === "focus") {
      modeTitle = "Pomodoro";
    } else if (mode === "shortBreak") {
      modeTitle = "Pausa Curta";
    } else if (mode === "longBreak") {
      modeTitle = "Pausa Longa";
    }

    // Define o título da aba
    document.title = isRunning
      ? `${modeTitle} - ${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`
      : "Pomodoro Timer";
  }, [time, isRunning, mode]);

  return (
    <section className="flex flex-col items-center justify-center mb-2 bg-gray-900 text-white">
      <div className="bg-gray-800/80 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <StageButtons mode={mode} changeMode={changeMode} />
        <TimerDisplay time={time} />
        <ProgressBar progress={progress} mode={mode} />
        <ControlButtons
          isRunning={isRunning}
          handleStartStop={handleStartStop}
          handleSkip={handleSkip}
          handleReset={handleReset}
          time={time}
          maxTime={maxTime}
        />
      </div>
    </section>
  );
}
