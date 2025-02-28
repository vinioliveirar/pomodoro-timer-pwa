import { usePomodoroTimer } from "../../hooks/usePomodoroTimer";

export default function Timer() {
  const {
    time,
    isBreak,
    isRunning,
    focusCycles,
    progress,
    formatTime,
    setIsRunning,
    handleSkip,
    resetTimer,
    setMode, // Precisamos adicionar um estado para alternar entre os modos
    mode, // Novo estado para controlar qual modo está ativo
  } = usePomodoroTimer();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800/80 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        {/* 🔴 Toggle entre Pomodoro, Short Break e Long Break */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              mode === "focus"
                ? "bg-blue-500 text-white"
                : "bg-gray-600 text-gray-300"
            }`}
            onClick={() => setMode("focus")}
          >
            Pomo<span className="hidden sm:inline">doro</span>
          </button>

          <button
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              mode === "shortBreak"
                ? "bg-yellow-500 text-white"
                : "bg-gray-600 text-gray-300"
            }`}
            onClick={() => setMode("shortBreak")}
          >
            Short <span className="hidden sm:inline">Break</span>
          </button>

          <button
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              mode === "longBreak"
                ? "bg-green-500 text-white"
                : "bg-gray-600 text-gray-300"
            }`}
            onClick={() => setMode("longBreak")}
          >
            Long <span className="hidden sm:inline">Break</span>
          </button>
        </div>

        <h3 className="text-lg font-semibold text-gray-300 mb-4">
          {isBreak ? "Pausa" : `Ciclo de Foco: ${focusCycles + 1}`}
        </h3>

        <h2 className="text-6xl font-bold mb-6">{formatTime(time)}</h2>

        {/* Barra de Progresso */}
        <div className="w-full h-4 bg-gray-700 rounded-lg overflow-hidden mb-4">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              backgroundColor: isBreak ? "#F7CA11" : "#3442B5",
            }}
          ></div>
        </div>

        {/* Botões de controle */}
        <div className="flex gap-4 justify-center">
          <button
            className={`px-6 py-3 rounded-lg font-semibold text-white transition ${
              isRunning
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={() => setIsRunning((prev) => !prev)}
          >
            {time === 0 ? "Iniciar Pausa" : isRunning ? "Pausar" : "Iniciar"}
          </button>

          {isRunning && (
            <button
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition"
              onClick={handleSkip}
            >
              Pular ⏩
            </button>
          )}

          <button
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
            onClick={resetTimer}
          >
            Resetar 🔄
          </button>
        </div>
      </div>
    </section>
  );
}
