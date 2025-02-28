import PropTypes from "prop-types";

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired, // Progresso do timer em porcentagem
  mode: PropTypes.string.isRequired, // Modo atual (focus, shortBreak, longBreak)
};

export default function ProgressBar({ progress, mode }) {
  // Definir cores para cada estágio
  const modeColors = {
    focus: "#3442B5", // Azul para Pomodoro
    shortBreak: "#F7CA11", // Amarelo para intervalo curto
    longBreak: "#00C951", // Roxo para intervalo longo
  };

  return (
    <div className="w-full h-4 bg-gray-700 rounded-lg overflow-hidden mb-4">
      <div
        className="h-full transition-all duration-500"
        style={{
          width: `${progress}%`,
          backgroundColor: modeColors[mode] || "#3442B5",
        }}
      ></div>
    </div>
  );
}
