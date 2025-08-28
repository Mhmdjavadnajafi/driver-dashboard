import React from "react";

export default function CustomInputBoxCarName({
    value,
    setValue,
    placeholder = "نام خودرو"
}) {
    const handleChange = (e) => {
        setValue(e.target.value);
       
    };

    return (
        <div className="col-span-12 sm:col-span-4 mt-4 h-[50px] relative">
            <label className="w-full relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className={`h-full w-full px-4 vazir-medium text-[#909090] border rounded-xl transition-all duration-300 ease-in-out`}
                />
            </label>
        </div>
    );
}
