import React from "react";
import {useEffect} from 'react'
export default function SchoolServiceTypeRadio({ schoolService, serviceType, setServiceType }) {
    const options = [
        { value: "morning", label: "صبح" },
        { value: "afternoon", label: "عصر" }
    ];
    useEffect(() => {
        if (schoolService !== "1") {
            setServiceType(""); // یا می‌توانی 0 هم بزاری
        }
    }, [schoolService]);

    const disabled = schoolService !== '1';

    return (
        <div className="col-span-12 sm:col-span-4 mt-4 flex flex-wrap items-center gap-2 sm:gap-4">
            <span className="vazir-medium text-[#909090] w-full sm:w-auto">نوع سرویس مدرسه :</span>

            {options.map((opt) => (
                <label key={opt.value} className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                    <input
                        type="radio"
                        name="serviceType"
                        value={opt.value}
                        checked={serviceType === opt.value}
                        onChange={() => setServiceType(opt.value)}
                        disabled={disabled}
                        className="w-5 h-5 border-gray-300 accent-blue-600"
                    />
                    <span className={`vazir-medium text-[14px] ${disabled ? "text-gray-400" : "text-[#909090]"}`}>
                        {opt.label}
                    </span>
                </label>
            ))}
        </div>
    );
}
