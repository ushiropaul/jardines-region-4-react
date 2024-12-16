
import { useState } from "react";
import { useAuth } from "./../../context/AuthContext.jsx";
import './RegisForm.css'
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto text-black">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="youremail@company.tld"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="*************"
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Register
        </button>
      </form>
      <p className="my-4 text-sm flex justify-between px-3">
        Already have an Account?
        <Link to="/auth" className="text-blue-700 hover:text-blue-900">
          Login
        </Link>
      </p>
    </div>
  );
}


export default Register;

// function RegisForm() {
//     const [user, setUser] = useState({
//         email: "",
//         password: "",
//         FirstName: "",
//         LastName: ""
//     });

//     const { signup } = useAuth();
//     const navigate = useNavigate();
//     const [error, setError] = useState(null);

//     // Manejar cambios en los inputs
//     const handleChange = ({ target: { name, value } }) => {
//         setUser({ ...user, [name]: value });
//     };

//     // Convertir el error en un mensaje amigable
//     const parseError = (error) => {
//         switch (true) {
//             case error.includes("auth/weak-password"):
//                 return "La contraseña debe ser superior a 6 caracteres.";
//             case error.includes('auth/email-already-in-use'):
//                 return "Este email ya está en uso."
//             default:
//                 return "Ocurrió un error al registrarse. Por favor, intente nuevamente.";
//         }
//     };

//     // Manejar envío del formulario
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             console.log(user);
//             await signup(user.email, user.password, user.FirstName, user.LastName);
//             navigate("/"); // Redirigir solo si no hay errores
//         } catch (error) {
//             setError(parseError(error.message)); // Traducir y mostrar el mensaje de error
//         }
//     };

//     return (
//         <div className="regis-form">
            
//             <h2>Crear cuenta</h2>
//             <p>¿Ya tenés una cuenta? <Link to="/auth">Iniciar sesión</Link></p>
//             {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar error */}
//             <form onSubmit={handleSubmit}>
//                 <div>
//                   <input
//                       type="text"
//                       id="FirstName"
//                       name="FirstName"
//                       placeholder="Nombre"
//                       required
//                       onChange={handleChange}
//                   />
//                   <input
//                       type="text"
//                       id="LastName"
//                       name="LastName"
//                       placeholder="Apellido"
//                       required
//                       onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                 <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Correo electrónico"
//                     required
//                     onChange={handleChange}
//                 />
//                 <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     placeholder="Contraseña"
//                     required
//                     onChange={handleChange}
//                 />
//                 </div>
//                 <button type="submit">Crear cuenta</button>
//             </form>
//         </div>
//     );
// }

// export default RegisForm;


