import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/images/BigLogo.png";

export function Login({ onLogin }) {
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            onLogin();
            navigate("/", { replace: true });
        }
    }, []);

    const handleBlurPhone = () =>
        setError(!/^09\d{9}$/.test(phone.trim()));
    const handleBlurPassword = () =>
        setErrorPassword(password.trim() === "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleBlurPhone();
        handleBlurPassword();
        if (error || errorPassword || !phone || !password) return;

        setLoading(true);
        setServerError("");

        try {
            const res = await axios.post(
                "https://api.tda24.ir/api/users_aslii/login/",
                {
                    phoneNumber: phone.trim(),
                    password: password.trim(),
                }
            );

            if (res.data.success) {
                const tokens = res.data.data.tokens;
                // ذخیره توکن‌ها و اطلاعات کاربر در localStorage
                localStorage.setItem("accessToken", tokens.access);
                localStorage.setItem("refreshToken", tokens.refresh);
                localStorage.setItem("userId", res.data.data.id);
                localStorage.setItem("phoneNumber", res.data.data.phoneNumber);
                localStorage.setItem("userType", res.data.data.userType);

                onLogin();
                navigate("/", { replace: true });
            } else {
                setServerError(res.data.message || "شماره موبایل یا رمز عبور اشتباه است ❌");
            }
        } catch (err) {
            console.error(err);
            if (err.response && (err.response.status === 400 || err.response.status === 401)) {
                setServerError("شماره موبایل یا رمز عبور اشتباه است ❌");
            } else {
                setServerError("خطا در اتصال به سرور 🚨");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen bg-white flex flex-col items-center justify-center relative">
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
                        if (/^09\d{0,9}$/.test(e.target.value)) setError(false);
                    }}
                    onBlur={handleBlurPhone}
                    className={`h-12 w-[270px] px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-600" : "border-gray-300"
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
                    onBlur={handleBlurPassword}
                    className={`h-12 w-[270px] px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${errorPassword ? "border-red-600" : "border-gray-300"
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
                    {loading ? (
                        <>
                            <span className="animate-spin">⏳</span> در حال ورود..
                        </>
                    ) : (
                        "ورود"
                    )}
                </button>
            </form>
        </div>
    );
}
