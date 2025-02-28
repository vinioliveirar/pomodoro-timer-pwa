import { useState, useEffect } from "react";

export function usePomodoroTimer() {
  // Estados principais
  const [time, setTime] = useState(25 * 60); // Tempo inicial (25 min)
  const [isRunning, setIsRunning] = useState(false);
  const [focusCycles, setFocusCycles] = useState(0);
  const [progress, setProgress] = useState(0);

  // Novo estado: controla o modo atual (Pomodoro, Short Break, Long Break)
  const [mode, setMode] = useState("focus"); // "focus", "shortBreak", "longBreak"

  // Define os tempos padrões para cada modo
  const modeDurations = {
    focus: 25 * 60, // 25 minutos para Pomodoro
    shortBreak: 5 * 60, // 5 minutos para Pausa Curta
    longBreak: 15 * 60, // 15 minutos para Pausa Longa
  };

  // Atualiza o tempo quando o modo muda
  useEffect(() => {
    setTime(modeDurations[mode]);
    setIsRunning(false); // Para a contagem ao mudar de modo
  }, [mode]);

  // Atualiza o temporizador a cada segundo quando está rodando
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          handleSkip(); // Pula para o próximo ciclo automaticamente
          return 0;
        }
        return prevTime - 1;
      });

      setProgress((prev) => (time / modeDurations[mode]) * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode, time]);

  // Formata o tempo para mm:ss
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  // Reseta o tempo para o valor do modo atual
  function resetTimer() {
    setTime(modeDurations[mode]);
    setIsRunning(false);
    setProgress(0);
  }

  // Pula para o próximo ciclo
  function handleSkip() {
    if (mode === "focus") {
      setFocusCycles((prev) => prev + 1);
      setMode(focusCycles % 4 === 0 ? "longBreak" : "shortBreak");
    } else {
      setMode("focus");
    }
  }

  return {
    time,
    isRunning,
    setIsRunning,
    focusCycles,
    progress,
    formatTime,
    resetTimer,
    handleSkip,
    mode,
    setMode, // Para alternar entre os modos no toggle
  };
}
