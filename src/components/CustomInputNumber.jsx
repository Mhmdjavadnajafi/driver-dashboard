// src/components/CustomInput.jsx
import React from "react";

export default function CustomInputNumber({
    placeholder,
    value,
    setValue,
    error,
    setError,
    type = "text",   // text | number | nationalCode
    maxLength = 100,
}) {
    return (
        <div className="col-span-12 sm:col-span-4 h-[50px]">
            <input
                placeholder={placeholder}
                type="text"
                value={value}
                onChange={(e) => {
                    let val = e.target.value;

                    // فقط اعداد برای number و nationalCode
                    if (type === "number" || type === "nationalCode") {
                        val = val.replace(/\D/g, "").slice(0, maxLength);
                    }

                    setValue(val);

                    // اگر چیزی وارد شد خطا پاک شه
                    if (val.trim() !== "") setError(false);
                }}
                onBlur={() => {
                    if (type === "nationalCode") {
                        // دقیقا ۱۰ رقم و نباید با صفر شروع بشه
                        const isValid = /^[1-9][0-9]{9}$/.test(value);
                        setError(!isValid);
                    } else {
                        // برای بقیه فقط چک کن خالی نباشه
                        setError(value.trim() === "");
                    }
                }}
                className={`h-12 w-full px-4 vazir-medium text-[#909090] font-bold border rounded-xl 
          transition-all duration-300 ease-in-out bg-white
          ${error ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
          focus:border-[#B9A278] focus:shadow-md focus:scale-105`}
            />
        </div>
    );
}
