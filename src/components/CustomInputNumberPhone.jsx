// src/components/CustomInput.jsx
import React from "react";

export default function CustomInputNumberPhone({
    placeholder,
    value,
    setValue,
    error,
    setError,
    mode = "text",      // 'text' | 'number' | 'phone' | 'nationalCode'
    maxLength,          // اگر ندی، برای phone=11 و nationalCode=10 خودش تنظیم میشه
    minLength = 1,
    name,
}) {
    const effectiveMax =
        maxLength ??
        (mode === "phone" ? 11 : mode === "nationalCode" ? 10 : 100);

    const handleChange = (e) => {
        let v = e.target.value;

        // عددی کردن ورودی برای حالت‌های عددی
        if (mode === "number" || mode === "phone" || mode === "nationalCode") {
            v = v.replace(/\D/g, "").slice(0, effectiveMax);
        } else {
            v = v.slice(0, effectiveMax);
        }

        setValue(v);

        // اگر کاملاً معتبر شد، خطا رو پاک کن
        if (mode === "phone" && /^09\d{9}$/.test(v)) setError(false);
        else if (mode === "nationalCode" && /^[1-9]\d{9}$/.test(v)) setError(false);
        else if (mode === "number" && v.length >= minLength) setError(false);
    };

    const handleBlur = () => {
        if (mode === "phone") setError(!/^09\d{9}$/.test(value));
        else if (mode === "nationalCode") setError(!/^[1-9]\d{9}$/.test(value));
        else if (mode === "number") setError(value.trim() === "" || value.length < minLength);
        else setError(value.trim() === ""); // برای text: خالی باشه خطا
    };

    return (
        <div className="col-span-12 sm:col-span-4 h-[50px]">
            <input
                name={name}
                placeholder={placeholder}
                type="text"
                inputMode={mode === "text" ? "text" : "numeric"}
                pattern={mode === "text" ? undefined : "[0-9]*"}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`h-12 w-full px-4 vazir-medium text-[#909090] font-bold border rounded-xl 
          transition-all duration-300 ease-in-out bg-white
          ${error ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
          focus:border-[#B9A278] focus:shadow-md focus:scale-105`}
            />
        </div>
    );
}
