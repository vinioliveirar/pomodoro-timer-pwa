import { useState, useEffect, useCallback } from "react";
import beepSound from "../assets/sounds/beep.mp3"; // ✅ Caminho correto do som

export default function useTimer() {
  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [focusCycles, setFocusCycles] = useState(0);

  const maxTime = mode === "focus" ? 1500 : mode === "shortBreak" ? 300 : 900;

  // ✅ Função para tocar o som de alarme
  const playAlarm = useCallback(() => {
    const alarmSound = new Audio(beepSound);
    alarmSound
      .play()
      .catch((error) => console.error("Erro ao reproduzir som:", error));
  }, []);

  // ✅ Função para iniciar/pausar o timer
  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  // ✅ Função para resetar o timer
  const handleReset = () => {
    setIsRunning(false);
    setMode("focus");
    setTime(1500);
    setFocusCycles(0);
  };

  // ✅ Função para trocar o modo
  const changeMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTime(newMode === "focus" ? 1500 : newMode === "shortBreak" ? 300 : 900);
  };

  // ✅ Função para avançar para o próximo estágio
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

  // ✅ Lógica do timer (Corrigida para evitar atrasos em segundo plano)
  useEffect(() => {
    if (!isRunning || time <= 0) return;

    const endTime = Date.now() + time * 1000;
    const timer = setInterval(() => {
      const remainingTime = Math.round((endTime - Date.now()) / 1000);
      if (remainingTime <= 0) {
        clearInterval(timer);
        setTime(0);
        playAlarm(); // 🔥 Som toca aqui!
        handleSkip();
      } else {
        setTime(remainingTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, time, handleSkip, playAlarm]);

  return {
    time,
    isRunning,
    mode,
    maxTime,
    focusCycles,
    handleStartStop,
    handleReset,
    handleSkip,
    changeMode,
  };
}
