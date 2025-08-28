import React from "react";
import { FaChevronDown } from "react-icons/fa";
import {useEffect} from 'react'
export default function TransportYearsSelect({ transportHistory, transportYears, setTransportYears }) {
    const disabled = transportHistory !== "has";
    useEffect(() => {
        if (transportHistory === "none") {
            setTransportYears(0);
        }
    }, [transportHistory]);
    return (
        <div className="col-span-12 sm:col-span-4 mt-4 h-[50px] relative">
            <label className="w-full relative">
                <select
                    value={transportYears}
                    onChange={(e) => setTransportYears(e.target.value)}
                    disabled={disabled}
                    className={`h-full w-full px-4 vazir-medium text-[#909090] border rounded-xl focus:outline-none appearance-none transition-all duration-300 ease-in-out
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                >
                    <option value="">سابقه در سال</option>
                    {Array.from({ length: 5 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} سال</option>
                    ))}
                    <option value="more">بیشتر از ۵ سال</option>
                </select>

                <FaChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#909090] pointer-events-none" />
            </label>
        </div>
    );
}
