// FancyAlert.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkCircle, IoAlertCircle, IoClose } from "react-icons/io5";

export default function FancyAlert({ open, type = "success", title, message, details = [], onClose, autoClose = 3000 }) {
    useEffect(() => {
        if (!open || !autoClose) return;
        const t = setTimeout(onClose, autoClose);
        return () => clearTimeout(t);
    }, [open, autoClose, onClose]);

    const isSuccess = type === "success";
    const color = isSuccess ? "from-green-600 to-emerald-700" : "from-red-600 to-rose-700";

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25 }}
                    className="fixed top-4 right-4 z-[9999] max-w-sm w-[92vw] sm:w-[420px]"
                >
                    <div className={`rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/10`}>
                        <div className={`px-4 py-3 bg-gradient-to-r ${color} text-white flex items-center gap-3`}>
                            {isSuccess ? <IoCheckmarkCircle className="text-2xl" /> : <IoAlertCircle className="text-2xl" />}
                            <div className="flex-1">
                                <div className="font-bold vazir-medium">{title}</div>
                                {message && <div className="text-sm opacity-90 mt-0.5">{message}</div>}
                            </div>
                            <button onClick={onClose} className="opacity-90 hover:opacity-100 transition">
                                <IoClose className="text-xl" />
                            </button>
                        </div>

                        {!!details?.length && (
                            <div className="bg-white px-4 py-3">
                                <ul className="list-disc pr-5 text-[13px] text-gray-700 space-y-1">
                                    {details.map((d, i) => (
                                        <li key={i}>{d}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
