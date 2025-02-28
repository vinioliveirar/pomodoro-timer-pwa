import { useState, useEffect, useCallback } from "react";

export default function useTimer() {
  const [time, setTime] = useState(1500); // Tempo em segundos (25 minutos)
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus"); // "focus", "shortBreak", "longBreak"
  const [focusCycles, setFocusCycles] = useState(0); // Contador de ciclos de foco

  // Função para iniciar/pausar o timer
  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  // Função para resetar o timer
  const handleReset = () => {
    setIsRunning(false);
    setMode("focus");
    setTime(1500);
    setFocusCycles(0);
  };

  // Função para trocar o modo (Pomodoro, Short Break, Long Break)
  // Define o tempo com base no modo escolhido
  const changeMode = (newMode) => {
    setIsRunning(false); // Pausa o timer ao mudar o modo
    setMode(newMode);

    if (newMode === "focus") setTime(1500); // Pomodoro (25 min)
    if (newMode === "shortBreak") setTime(300); // Short Break (5 min)
    if (newMode === "longBreak") setTime(900); // Long Break (15 min)
  };

  // Função para avançar para o próximo estágio
  const handleSkip = useCallback(() => {
    setIsRunning(false);

    if (mode === "focus") {
      const nextMode = focusCycles >= 3 ? "longBreak" : "shortBreak";
      setMode(nextMode);
      setTime(nextMode === "longBreak" ? 900 : 300);
      setFocusCycles((prev) => (nextMode === "longBreak" ? 0 : prev + 1));
    } else {
      setMode("focus");
      setTime(1500);
    }
  }, [mode, focusCycles]);

  // Lógica do timer
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer);
            handleSkip();
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, time, handleSkip]);

  return {
    time,
    isRunning,
    mode,
    focusCycles,
    handleStartStop,
    handleReset,
    handleSkip,
    changeMode,
    setIsRunning,
  };
}
