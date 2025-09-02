import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { encryptData } from "./tokenStorage.js";
import Logo from "../assets/images/BigLogo.png";

export function Login({ onLogin }) {
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errorPhone, setErrorPhone] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const validatePhone = () => setErrorPhone(!/^09\d{9}$/.test(phone.trim()));
    const validatePassword = () => setErrorPassword(password.trim() === "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        validatePhone();
        validatePassword();

        if (errorPhone || errorPassword || !phone || !password) return;

        setLoading(true);
        setServerError("");

        try {
            const res = await axios.post(
                "https://api.tda24.ir/api/users_aslii/login/",
                { phoneNumber: phone.trim(), password: password.trim() },
                { withCredentials: true }
            );

            if (res.data.success) {
                const tokens = {
                    accessToken: res.data.data.tokens.access,
                    refreshToken: res.data.data.tokens.refresh,
                    userId: res.data.data.id,
                    phoneNumber: res.data.data.phoneNumber,
                    userType: res.data.data.userType,
                };

                localStorage.setItem("encryptedTokens", encryptData(tokens));
                localStorage.removeItem("logoutFlag");

                onLogin(); 
                navigate("/", { replace: true });
            } else {
                setServerError(res.data.message || "شماره یا رمز اشتباه است");
            }
        } catch (err) {
            setServerError("خطا در اتصال به سرور");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen vazir-medium  bg-white flex flex-col items-center justify-center relative">
            <img className="w-40 absolute top-4 right-4" src={Logo} alt="Logo" />
            <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
                <div className="text-[#909090] font-bold text-[14px]">
                    لطفا شماره و رمز عبور خود را وارد نمایید
                </div>

                <input
                    placeholder="شماره موبایل"
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value);
                        if (/^09\d{0,9}$/.test(e.target.value)) setErrorPhone(false);
                    }}
                    onBlur={validatePhone}
                    className={`h-12 text-left w-[270px] px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${errorPhone ? "border-red-600" : "border-gray-300"
                        }`}
                />

                <input
                    placeholder="رمز عبور"
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (e.target.value.trim() !== "") setErrorPassword(false);
                    }}
                    onBlur={validatePassword}
                    className={`h-12 text-left w-[270px] px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${errorPassword ? "border-red-600" : "border-gray-300"
                        }`}
                />

                {serverError && (
                    <div className="w-[270px] bg-red-100 text-red-700 border border-red-400 rounded-lg p-3 text-sm animate-fade-in">
                        {serverError}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="h-12 w-[270px] bg-[#006ECF] text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-blue-700 transition"
                >
                    {loading ? "در حال ورود.." : "ورود"}
                    {loading && <span className="animate-spin">⏳</span>}
                </button>
            </form>
        </div>
    );
}
