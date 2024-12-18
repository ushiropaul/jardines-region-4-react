import { useState } from "react";
import "./Alert.css";

function Alert({ message, onConfirm, onCancel, showActions = false }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleCancel = () => {
    setIsVisible(false);
    if (onCancel) onCancel();
  };

  const handleConfirm = () => {
    setIsVisible(false);
    if (onConfirm) onConfirm();
  };

  if (!isVisible) return null;

  return (
    <div className="Alert bg-blue-300 border border-blue-400 text-black-700 rounded relative text-center" role="alert">
      <span className="">{message}</span>
      {showActions && (
        <div className=" confirmLogOutAlert">
          <button
            className=" hover:bg-blue-400 text-white font-bold py-1 px-4 rounded"
            onClick={handleConfirm}
          >
            Sí
          </button>
          <button
            className=" hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"
            onClick={handleCancel}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}

export default Alert;
