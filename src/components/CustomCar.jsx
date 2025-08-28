import React from "react";

export default function CustomCarType({ carType, setCarType }) {
    const options = [
        { value: "sedan", label: "سواری" },
        { value: "van", label: "ون" },
        { value: "minibus", label: "مینی‌بوس" },
        { value: "bus", label: "اتوبوس" },
    ];

    return (
        <div className="col-span-6 h-[50px] flex flex-wrap items-center space-x-0 sm:space-x-6 mt-4 mr-3">
            <span className="vazir-medium text-[#909090] w-full sm:w-auto mb-2 sm:mb-0">نوع خودرو :</span>

            {options.map((car) => (
                <label
                    key={car.value}
                    className="flex flex-col gap-2 items-center cursor-pointer mr-0 sm:mr-3 w-1/2 sm:w-auto mb-2 sm:mb-0"
                >
                    <input
                        type="radio"
                        name="carType"
                        value={car.value}
                        checked={carType === car.value}
                        onChange={() => setCarType(car.value)}
                        className="w-5 h-5 border-gray-300 accent-blue-600"
                    />
                    <span className="vazir-medium text-[#909090] text-[14px]">{car.label}</span>
                </label>
            ))}
        </div>
    );
}
