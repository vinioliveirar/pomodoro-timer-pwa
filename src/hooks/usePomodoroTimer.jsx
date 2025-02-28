import { useState, useEffect } from "react";

export function usePomodoroTimer() {
  const focusDuration = 25 * 60; // 25 minutos
  const shortBreakDuration = 5 * 60; // 5 minutos
  const longBreakDuration = 15 * 60; // 15 minutos
  const cyclesBeforeLongBreak = 4;

  const [time, setTime] = useState(focusDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [focusCycles, setFocusCycles] = useState(0);
  const [progress, setProgress] = useState(100);

  // Atualiza o tempo e o progresso do timer
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          handleSkip();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Atualiza a barra de progresso
  useEffect(() => {
    const totalTime = isBreak
      ? focusCycles % cyclesBeforeLongBreak === 0
        ? longBreakDuration
        : shortBreakDuration
      : focusDuration;

    setProgress((time / totalTime) * 100);
  }, [time, isBreak]);

  // Alterna entre Foco, Short Break e Long Break
  const handleSkip = () => {
    if (!isBreak) {
      if ((focusCycles + 1) % cyclesBeforeLongBreak === 0) {
        setTime(longBreakDuration);
      } else {
        setTime(shortBreakDuration);
      }
      setIsBreak(true);
    } else {
      setTime(focusDuration);
      setIsBreak(false);
      setFocusCycles((prev) => prev + 1);
    }
    setIsRunning(false);
  };

  // Reseta o timer para o início do ciclo de foco
  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setFocusCycles(0);
    setTime(focusDuration);
    setProgress(100);
  };

  // Formata o tempo para "MM:SS"
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return {
    time,
    isRunning,
    isBreak,
    focusCycles,
    progress,
    setIsRunning,
    handleSkip,
    resetTimer,
    formatTime,
  };
}
