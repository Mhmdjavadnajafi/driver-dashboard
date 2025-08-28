// AddressTextarea.jsx
import React from "react";

export default function AddressTextarea({ address, setAddress, errorAddress, setErrorAddress }) {

    const handleChange = (e) => {
        setAddress(e.target.value);
        if (e.target.value.trim() !== "") setErrorAddress(false); // پاک کردن ارور هنگام تایپ
    };

    const handleBlur = () => {
        setAddress(address.trim());
        if (address.trim() === "") setErrorAddress(true); // اگر خالی بود، ارور بده
    };

    return (
        <div className="col-span-12 relative">
            <div
                className={`col-span-12 mt-4 relative rounded-xl transition-all duration-300 ease-in-out
          ${errorAddress ? "border-2 border-red-600 animate-shake" : "border border-[#909090]"}
          focus-within:border-[#B9A278] focus-within:shadow-md focus-within:scale-105 bg-white`}
            >
                <textarea
                    placeholder="آدرس"
                    value={address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full h-[140px] px-4 py-2 vazir-medium text-[#909090] resize-none bg-transparent outline-none"
                />
            </div>
        </div>
    );
}
