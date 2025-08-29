import { motion } from "framer-motion";
import { FiLogIn } from "react-icons/fi"; // آیکون ورود از react-icons

export default function LoadingScreen() {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-white">
            <div className="flex items-center gap-4">
                {/* لودر حرفه‌ای */}
                <motion.div
                    className="h-12 w-12 border-4 border-t-[#006ECF] border-b-[#006ECF] border-l-transparent border-r-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                />
                {/* آیکون */}
                <motion.div
                    className="text-[#006ECF] text-2xl"
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.8,
                    }}
                >
                    <FiLogIn />
                </motion.div>
            </div>
        </div>
    );
}
