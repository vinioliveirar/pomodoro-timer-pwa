import PropTypes from "prop-types";

ControlButtons.propTypes = {
  isRunning: PropTypes.bool.isRequired, // Estado atual do timer (em execução ou não)
  setIsRunning: PropTypes.func.isRequired, // Função para alterar o estado de execução do timer
  handleSkip: PropTypes.func.isRequired, // Função para pular para o próximo estágio
  handleReset: PropTypes.func.isRequired, // Função para resetar o timer
  time: PropTypes.number.isRequired,
};

export default function ControlButtons({
  isRunning,
  setIsRunning,
  handleSkip,
  handleReset,
  time,
}) {
  return (
    <div className="flex gap-4 justify-center">
      <button
        className={`px-6 py-3 rounded-lg font-semibold ${isRunning ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"}`}
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? "Pausar" : "Iniciar"}
      </button>
      {isRunning && (
        <button
          className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold"
          onClick={handleSkip}
        >
          Pular ⏩
        </button>
      )}
      {time < 1500 && (
        <button
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
          onClick={handleReset}
        >
          Resetar 🔄
        </button>
      )}
    </div>
  );
}
