
// Register.js
import { useState } from "react";
import { useAuth } from "./../../context/AuthContext.jsx";
import './RegisForm.css';
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";

function Register() {
  const { signup } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const translateError = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "El correo ya está en uso.";
      case "auth/invalid-email":
        return "El correo ingresado no es válido.";
      case "auth/weak-password":
        return "La contraseña es demasiado débil.";
      default:
        return "Ocurrió un error. Por favor, inténtalo más tarde.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(translateError(error.code));
    }
  };

  return (
    <div className="regis-form">
      <h1>¡Creá tu cuenta y descubrí todos los jardines de región 4!</h1>
      {error && <Alert message={error} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            placeholder="Nombre"
            type="text"
            name="firstName"
            id="firstName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            placeholder="Apellido"
            type="text"
            name="lastName"
            id="lastName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="tucorreo@electronico"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="*************"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Registrarse
        </button>
      </form>
      <p className="my-4 text-sm flex justify-between px-3">
        Ya tenés una cuenta?
        <Link to="/auth" className="font-bold text-sm text-blue-500 hover:text-blue-800">
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}

export default Register;



