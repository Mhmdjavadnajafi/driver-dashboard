import React, { useState } from "react";

export default function WorkDaysCheckbox({ daysOfWeek }) {
    const [selectedDays, setSelectedDays] = useState([]);

    const toggleAllDays = () => {
        if (selectedDays.length === daysOfWeek.length) {
            setSelectedDays([]);
        } else {
            setSelectedDays([...daysOfWeek]);
        }
    };

    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const allChecked = selectedDays.length === daysOfWeek.length;

    return (
        <div className="col-span-12 mt-4 flex flex-wrap items-center gap-3">
            <span className="vazir-medium text-[#909090] w-full mb-2">کار در ایام هفته :</span>

            {daysOfWeek.map((day) => (
                <label key={day} className="flex flex-col items-center cursor-pointer relative">
                    <input
                        type="checkbox"
                        checked={selectedDays.includes(day)}
                        onChange={() => toggleDay(day)}
                        className="absolute opacity-0 w-0 h-0"
                    />
                    <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center border border-white transition-all duration-300
              ${selectedDays.includes(day) ? "bg-blue-500 shadow-md" : "bg-white hover:bg-gray-100"}`}
                    >
                        {selectedDays.includes(day) && (
                            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                        )}
                    </span>
                    <span className="vazir-medium text-[#909090] text-[14px] mt-1">{day}</span>
                </label>
            ))}

            {/* چک‌باکس "همه" */}
            <label className="flex flex-col items-center cursor-pointer relative">
                <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAllDays}
                    className="absolute opacity-0 w-0 h-0"
                />
                <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center border border-white transition-all duration-300
            ${allChecked ? "bg-blue-500 shadow-md" : "bg-white hover:bg-gray-100"}`}
                >
                    {allChecked && <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>}
                </span>
                <span className="vazir-medium text-[#909090] text-[14px] mt-1">همه</span>
            </label>
        </div>
    );
}
