import React from "react";
import { motion } from "framer-motion";
import { IoCheckmark } from "react-icons/io5";

export default function SelectableCategories({ categories, selectedCategories, toggleCategory }) {
    return (
        <div className="col-span-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4 relative">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className={`relative flex flex-col items-center justify-center gap-10 h-36 rounded-xl border transition-all duration-200 cursor-pointer
        ${selectedCategories.includes(index) ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
                    onClick={(e) => {
                        e.preventDefault();
                        toggleCategory(index);
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={
                            selectedCategories.includes(index)
                                ? { opacity: 1, scale: 1 }
                                : { opacity: 0, scale: 0.5 }
                        }
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <IoCheckmark className="text-xl text-[#00C313]" />
                    </motion.div>

                    <div className="text-center vazir-light text-[#676767] font-bold text-[14px]">
                        {category}
                    </div>
                </div>
            ))}
        </div>
    );
}