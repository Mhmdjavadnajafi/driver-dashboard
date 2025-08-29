import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

export function ProtectedRoute({ onLogout }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (!accessToken && !refreshToken) {
                setAuthenticated(false);
                setLoading(false);
                return;
            }

            if (!accessToken && refreshToken) {
                try {
                    const res = await axios.post(
                        "https://api.tda24.ir/api/users_aslii/refresh/",
                        { refreshToken },
                        { headers: { "Content-Type": "application/json" } }
                    );
                    localStorage.setItem("accessToken", res.data.access);
                    setAuthenticated(true);
                } catch (err) {
                    console.error("رفرش توکن ناموفق:", err);
                    onLogout();
                    setAuthenticated(false);
                } finally {
                    setLoading(false);
                }
            } else {
                setAuthenticated(true);
                setLoading(false);
            }
        };

        checkAuth();
    }, [onLogout]);

    if (loading) return <LoadingScreen />;
    if (!authenticated) return <Navigate to="/login" replace />;

    return <Outlet />;
}
