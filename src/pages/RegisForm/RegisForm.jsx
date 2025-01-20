import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import './RegisForm.css';
import { Link } from "react-router-dom";
import Alert from "../../components/Alert/Alert";

function Register() {
  const { signup } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    setSuccessMessage("");
    try {
      await signup(user.email, user.password, user.firstName, user.lastName);
      setSuccessMessage(
        "Registro exitoso. Por favor, verifica tu correo electrónico antes de iniciar sesión."
      );
    } catch (error) {
      setError(translateError(error.code));
    }
  };

  return (
    <div className="regis-form">
      <h1>¡Creá tu cuenta y descubrí todos los jardines de región 4!</h1>
      {error && <Alert message={error} />}
      {successMessage && <Alert message={successMessage} type="success" />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            placeholder="Nombre"
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            placeholder="Apellido"
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
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
