import React from "react";

export default function MisuseHistoryRadio({ misuseHistory, setMisuseHistory }) {
    const options = [
        { value: true, label: "ندارد" },
        { value: false, label: "دارد" }
    ];

    return (
        <div className="col-span-12 sm:col-span-4 mt-4 flex flex-wrap items-center gap-2 sm:gap-4">
            <span className="vazir-medium text-[#909090] w-full sm:w-auto">سابقه سوء مصرف :</span>

            {options.map((opt) => (
                <label key={opt.value} className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                    <input
                        type="radio"
                        name="misuseHistory"
                        value={opt.value}
                        checked={misuseHistory === opt.value}
                        onChange={() => setMisuseHistory(opt.value)}
                        className="w-5 h-5 border-gray-300 accent-blue-600"
                    />
                    <span className="vazir-medium text-[14px] text-[#909090]">{opt.label}</span>
                </label>
            ))}
        </div>
    );
}
