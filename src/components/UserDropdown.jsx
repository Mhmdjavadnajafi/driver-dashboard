// components/UserDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";

export function UserDropdown({ onLogout }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        setOpen(false);
        if (onLogout) onLogout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <FaUser
                className="text-4xl text-[#B9A278] bg-gray-200 cursor-pointer rounded-full p-2 hover:bg-[#B9A278] hover:text-white transition-all duration-200 shadow"
                onClick={() => setOpen(prev => !prev)}
            />
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg overflow-hidden z-50 border border-gray-200"
                    >
                        <motion.button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 vazir-medium cursor-pointer text-sm font-semibold text-red-600 flex items-center gap-2"
                            whileHover={{ scale: 1.05, backgroundColor: "#ffe5e5" }} 
                            whileTap={{ scale: 0.95 }} 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.3 }}
                        >
                            خروج از حساب
                            <CgLogOut />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
