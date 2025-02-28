import PropTypes from "prop-types";

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired, // Progresso do timer em porcentagem
};

export default function ProgressBar({ progress }) {
  return (
    <div className="w-full h-4 bg-gray-700 rounded-lg overflow-hidden mb-4">
      <div
        className="h-full transition-all duration-500"
        style={{ width: `${progress}%`, backgroundColor: "#3442B5" }}
      ></div>
    </div>
  );
}
