import PropTypes from "prop-types";
import { Play, Pause, SkipForward, TimerReset } from "lucide-react";

ControlButtons.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  handleStartStop: PropTypes.func.isRequired,
  handleSkip: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  maxTime: PropTypes.number.isRequired, // Tempo máximo do modo atual
};

export default function ControlButtons({
  isRunning,
  handleStartStop,
  handleSkip,
  handleReset,
  time,
  maxTime,
}) {
  return (
    <div className="flex gap-4 justify-center">
      <button
        className={`cursor-pointer px-6 py-3 rounded-lg font-semibold ${
          isRunning
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
        onClick={handleStartStop}
      >
        {isRunning ? <Pause /> : <Play />}
      </button>

      {isRunning && (
        <button
          className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold cursor-pointer"
          onClick={handleSkip}
        >
          <SkipForward />
        </button>
      )}

      {time < maxTime && (
        <button
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold cursor-pointer"
          onClick={handleReset}
        >
          <TimerReset />
        </button>
      )}
    </div>
  );
}
