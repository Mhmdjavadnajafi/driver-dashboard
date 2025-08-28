import React from "react";

export default function CustomInputBoxNumber({
    placeholder,
    value,
    setValue,
    error,
    setError,
    max = 10,
    min = 0
}) {
    const handleChange = (e) => {
        let val = e.target.value.replace(/\D/g, ""); // فقط عدد
        if (+val <= max) setValue(val);
    };

    const handleBlur = () => {
        const isValid = value !== "" && +value >= min && +value <= max;
        setError(!isValid);
        if (!isValid) setValue(""); // خطا ⇒ پاک شود
    };

    return (
        <div className="col-span-12 sm:col-span-4 h-[50px] relative">
            <label className="w-full relative">
                <input
                    type="number"
                    placeholder={placeholder}
                    value={error ? "" : value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`h-full w-full px-4 vazir-medium text-[#909090] border rounded-xl transition-all duration-300 ease-in-out
            ${error ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
            focus:border-[#B9A278] focus:shadow-md focus:scale-105 bg-white`}
                />
            </label>
        </div>
    );
}

