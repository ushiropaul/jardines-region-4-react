import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './RegisForm.css'

function RegisForm() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        FirstName: "",
        LastName: ""
    });

    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    // Manejar cambios en los inputs
    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value });
    };

    // Convertir el error en un mensaje amigable
    const parseError = (error) => {
        switch (true) {
            case error.includes("auth/weak-password"):
                return "La contraseña debe ser superior a 6 caracteres.";
            case error.includes('auth/email-already-in-use'):
                return "Este email ya está en uso."
            default:
                return "Ocurrió un error al registrarse. Por favor, intente nuevamente.";
        }
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(user);
            await signup(user.email, user.password, user.FirstName, user.LastName);
            navigate("/"); // Redirigir solo si no hay errores
        } catch (error) {
            setError(parseError(error.message)); // Traducir y mostrar el mensaje de error
        }
    };

    return (
        <div className="regis-form">
            
            <h2>Crear cuenta</h2>
            <p>¿Ya tenés una cuenta? <Link to="/auth">Iniciar sesión</Link></p>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar error */}
            <form onSubmit={handleSubmit}>
                <div>
                  <input
                      type="text"
                      id="FirstName"
                      name="FirstName"
                      placeholder="Nombre"
                      required
                      onChange={handleChange}
                  />
                  <input
                      type="text"
                      id="LastName"
                      name="LastName"
                      placeholder="Apellido"
                      required
                      onChange={handleChange}
                  />
                </div>
                <div>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo electrónico"
                    required
                    onChange={handleChange}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    required
                    onChange={handleChange}
                />
                </div>
                <button type="submit">Crear cuenta</button>
            </form>
        </div>
    );
}

export default RegisForm;
