import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Alert from "../Alert/Alert";
import "./SubHeader.css";

function SubHeader() {
  const { logout, user } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleLogoutRequest = () => {
    setAlertMessage("¿Estás seguro de que deseas cerrar sesión?");
    setShowAlert(true);
  };

  const handleLogoutConfirm = async () => {
    setShowAlert(false);
    try {
      await logout();
      console.log("Sesión cerrada correctamente.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleLogoutCancel = () => {
    setShowAlert(false);
  };

  return (
    <div className="containerSubHeader">
      <div className="bg-white SubHeader">
        <p className="text-xl">¡Hola {user.displayName || user.email}!</p>
        <button
          className="buttonLogOut bg-slate-200 hover:bg-slate-300 rounded py-1 px-4 text-black"
          onClick={handleLogoutRequest}
        >
          Cerrar sesión
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#000000"
          >
            <path d="M216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h264v72H216v528h264v72H216Zm432-168-51-51 81-81H384v-72h294l-81-81 51-51 168 168-168 168Z" />
          </svg>
        </button>
      </div>
      {showAlert && (
        <Alert
          message={alertMessage}
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
          showActions={true}
        />
      )}
    </div>
  );
}

export default SubHeader;
