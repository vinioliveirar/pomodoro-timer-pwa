// src/utils/utils.js
export function formatTime(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsRemainder = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${secondsRemainder}`;
}

export function playAlarm(beepSound) {
  const alarmSound = new Audio(beepSound);
  alarmSound
    .play()
    .catch((error) => console.error("Erro ao reproduzir som:", error));
}
