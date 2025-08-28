// DocumentGrid.jsx
import React from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";

export default function DocumentGrid({ docs }) {
    return (
        <div className="col-span-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4">
            {docs.map((doc, index) => (
                <div
                    key={index}
                    className="flex vazir-light flex-col items-center justify-center h-36 rounded-xl border border-gray-300 transition-all duration-200 cursor-pointer text-[#676767] font-bold text-[14px]"
                >
                    <label className="flex flex-col items-center justify-center w-full h-full relative">
                        <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center mb-2 hover:bg-blue-50 transition-colors duration-200 relative overflow-hidden">
                            {doc.state ? (
                                <>
                                    <motion.img
                                        key={doc.state.name}
                                        src={URL.createObjectURL(doc.state)}
                                        alt={doc.name}
                                        className="w-full h-full object-cover rounded-xl"
                                        initial={{ opacity: 0, scale: 0.7 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    />

                                    <motion.button
                                        type="button"
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1.5 shadow-md"
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            doc.setState(null);
                                        }}
                                    >
                                        <IoTrash className="text-sm" />
                                    </motion.button>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ scale: 1 }}
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <LuPlus className="text-2xl text-gray-400" />
                                </motion.div>
                            )}
                        </div>
                        <div className="text-center relative top-3">{doc.name}</div>
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => doc.setState(e.target.files[0])}
                        />
                    </label>
                </div>
            ))}
        </div>
    );
}
