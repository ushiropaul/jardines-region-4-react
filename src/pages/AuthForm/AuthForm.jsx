import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './AuthForm.css'

function AuthForm() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    // Manejar cambios en los inputs
    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value });
    };

    // Convertir el error en un mensaje amigable
    const parseError = (error) => {
        switch (true) {
            case error.includes("auth/invalid-credential"):
                return "Las credenciales ingresadas son inválidas.";
            default:
                return "Ocurrió un error al iniciar sesión. Por favor, intente nuevamente.";
        }
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(user);
            await login(user.email, user.password);
            navigate("/"); // Redirigir solo si no hay errores
        } catch (error) {
            setError(parseError(error.message)); // Traducir y mostrar el mensaje de error
        }
    };

    return (
        <div className="auth-form">
            
            <h2>Iniciar sesión</h2>
            <p>¿No tenés una cuenta? <Link to="/registrarse">Crear cuenta</Link></p>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar error */}
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default AuthForm;
