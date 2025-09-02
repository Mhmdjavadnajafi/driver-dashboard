import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import { decryptData, encryptData } from "./tokenStorage.js";

export function ProtectedRoute({ onLogout }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            const tokens = decryptData(localStorage.getItem("encryptedTokens"));
            const logoutFlag = localStorage.getItem("logoutFlag");

            if (logoutFlag || !tokens) {
                setAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                // refresh token اگر نیاز است
                if (!tokens.accessToken && tokens.refreshToken) {
                    const res = await axios.post(
                        "https://api.tda24.ir/api/users_aslii/refresh/",
                        { refreshToken: tokens.refreshToken },
                        { headers: { "Content-Type": "application/json" } }
                    );
                    tokens.accessToken = res.data.access;
                    localStorage.setItem("encryptedTokens", encryptData(tokens));
                }

                if (isMounted) setAuthenticated(true);
            } catch (err) {
                localStorage.removeItem("encryptedTokens");
                localStorage.setItem("logoutFlag", "true");
                if (onLogout) onLogout();
                if (isMounted) setAuthenticated(false);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        checkAuth();
        return () => { isMounted = false; };
    }, [onLogout]);

    if (loading) return <LoadingScreen />;
    if (!authenticated) return <Navigate to="/login" replace />;
    return <Outlet />;
}
