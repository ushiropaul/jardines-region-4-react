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
        <p className="text-xl">¡Hola {user?.displayName || "Usuario"}!</p>
        <button
          className="buttonLogOut bg-slate-200 hover:bg-slate-300 rounded py-1 px-4 text-black"
          onClick={handleLogoutRequest}
        >
          Cerrar sesión
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
