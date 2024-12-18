import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>CARGANDO...</h1>;

  if (!user) return <Navigate to="/registrarse" />;

  return <>{children}</>;
}