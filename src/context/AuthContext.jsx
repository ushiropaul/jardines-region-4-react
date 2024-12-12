// src/context/AuthContext.jsx


import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

// Crear contexto de autenticación
const authContext = createContext();

// Hook para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};

// Proveedor de autenticación
export function AuthProvider({ children }) {
    // Registro de usuario
    const signup = async (email, password, FirstName, LastName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuario registrado:", userCredential.user);
        } catch (error) {
            console.error("Error al registrarse:", error.message);
            throw error; // Propaga el error para manejarlo en el formulario
        }
    };

    // Inicio de sesión
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Usuario autenticado:", userCredential.user);
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message);
            throw error; // Propaga el error para manejarlo en el formulario
        }
    };

    return (
        <authContext.Provider value={{ signup, login }}>
            {children}
        </authContext.Provider>
    );
}


export default authContext;