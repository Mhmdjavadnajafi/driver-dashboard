import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiXCircle } from "react-icons/fi"; 
import { useEffect, useState } from "react";

export function ModalMessgae({ show, type = "success", message, onClose, duration = 10000 }) {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (!show) return;

        const interval = 50;
        const step = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    onClose();
                    return 0;
                }
                return prev - step;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [show, duration, onClose]);

    const Icon = type === "success" ? FiCheckCircle : FiXCircle;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-xl shadow-2xl z-50 border border-gray-300"
                >
                    <div className={`flex flex-col items-center p-6 relative vazir-medium`}>
                        <Icon className={`text-5xl mb-4 ${type === "success" ? "text-green-500" : "text-red-500"}`} />
                        <p className="text-lg text-center">{message}</p>
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
                        >
                            &times;
                        </button>
                        <div className="w-full h-1 bg-gray-200 rounded-full mt-6">
                            <div
                                className={`h-1 rounded-full ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
