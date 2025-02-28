import PropTypes from "prop-types";

// Adicionando a validação dos props
TimerDisplay.propTypes = {
  time: PropTypes.number.isRequired,
};

export default function TimerDisplay({ time }) {
  const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secondsRemainder = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${secondsRemainder}`;
  };

  return <h2 className="text-6xl font-bold">{formatTime(time)}</h2>;
}
