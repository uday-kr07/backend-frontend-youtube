import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { accessToken, user } = useAuth();

    if (!user || !accessToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
