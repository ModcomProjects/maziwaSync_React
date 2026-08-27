import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useContext(AuthContext);

    // Not logged in
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Role check
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/not-authorized" />;
    }

    return children;
};

export default ProtectedRoute;