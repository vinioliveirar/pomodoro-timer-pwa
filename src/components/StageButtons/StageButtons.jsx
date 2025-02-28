import PropTypes from "prop-types";

StageButtons.propTypes = {
  mode: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
};

export default function StageButtons({ mode, changeMode }) {
  return (
    <div className="flex justify-center gap-4 mb-4">
      <button
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          mode === "focus"
            ? "bg-blue-500 text-white"
            : "bg-gray-600 text-gray-300"
        }`}
        onClick={() => changeMode("focus")}
      >
        Pomodoro
      </button>

      <button
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          mode === "shortBreak"
            ? "bg-yellow-500 text-white"
            : "bg-gray-600 text-gray-300"
        }`}
        onClick={() => changeMode("shortBreak")}
      >
        Short Break
      </button>

      <button
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          mode === "longBreak"
            ? "bg-green-500 text-white"
            : "bg-gray-600 text-gray-300"
        }`}
        onClick={() => changeMode("longBreak")}
      >
        Long Break
      </button>
    </div>
  );
}
