import React from "react";
import { FaChevronDown } from "react-icons/fa";

export default function CarPlateInput({
    provinceCode, setProvinceCode, errorProvince, setErrorProvince,
    threeDigitCode, setThreeDigitCode, errorThreeDigit, setErrorThreeDigit,
    letter, setLetter, letters,
    twoDigitCode, setTwoDigitCode, errorTwoDigit, setErrorTwoDigit
}) {

    const handleNumberChange = (setter, maxLength, value, errorSetter) => {
        let val = value.replace(/\D/g, "").slice(0, maxLength);
        setter(val);
        // بررسی اعتبار هنگام تایپ
        if (val !== "") errorSetter(false);
    };

    const handleNumberBlur = (val, setter, errorSetter, min = 1, max = 99, length = null) => {
        // بررسی اینکه مقدار خالی نباشه، طول درست باشه، داخل محدوده باشه و صفر نداشته باشه
        const hasZero = val.includes("0");
        const isValid = val !== "" &&
            (!length || val.length === length) &&
            +val >= min &&
            +val <= max &&
            !hasZero;

        errorSetter(!isValid);
        if (!isValid) setter("");
    };


    return (
        <div className="col-span-6 mt-4 grid grid-cols-12 gap-3">

            {/* استان */}
            <div className="col-span-6 sm:col-span-3 h-[50px] relative">
                <label className="w-full relative">
                    <input
                        type="number"
                        placeholder="استان"
                        value={errorProvince ? "" : provinceCode}
                        onChange={(e) => handleNumberChange(setProvinceCode, 2, e.target.value, setErrorProvince)}
                        onBlur={() => handleNumberBlur(provinceCode, setProvinceCode, setErrorProvince, 10, 99, 2)}
                        className={`h-full w-full px-4 vazir-medium text-[#909090] border rounded-xl transition-all duration-300 ease-in-out
              ${errorProvince ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
              focus:border-[#B9A278] focus:shadow-md focus:scale-105 bg-white text-center`}
                    />
                </label>
            </div>

            {/* سه رقم */}
            <div className="col-span-6 sm:col-span-3 h-[50px] relative">
                <label className="w-full relative">
                    <input
                        type="number"
                        placeholder="128"
                        value={errorThreeDigit ? "" : threeDigitCode}
                        onChange={(e) => handleNumberChange(setThreeDigitCode, 3, e.target.value, setErrorThreeDigit)}
                        onBlur={() => handleNumberBlur(threeDigitCode, setThreeDigitCode, setErrorThreeDigit, 1, 999, 3)}
                        className={`h-full w-full px-4 vazir-medium text-[#909090] border rounded-xl transition-all duration-300 ease-in-out
              ${errorThreeDigit ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
              focus:border-[#B9A278] focus:shadow-md focus:scale-105 bg-white text-center`}
                    />
                </label>
            </div>

            {/* حرف پلاک */}
            <div className="col-span-6 sm:col-span-3 h-[50px] relative">
                <label className="w-full relative">
                    <select
                        value={letter}
                        onChange={(e) => setLetter(e.target.value)}
                        className="h-full w-full px-4 vazir-medium text-[#909090] border border-[#909090] rounded-xl focus:outline-none focus:ring-1 bg-transparent appearance-none text-center"
                    >
                        <option value="">الف</option>
                        {letters.map((ltr) => (
                            <option key={ltr} value={ltr}>{ltr}</option>
                        ))}
                    </select>
                    <FaChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#909090] pointer-events-none" />
                </label>
            </div>

            {/* دو رقم آخر */}
            <div className="col-span-6 sm:col-span-3 h-[50px] relative">
                <label className="w-full relative">
                    <input
                        type="number"
                        placeholder="کد دو رقمی"
                        value={errorTwoDigit ? "" : twoDigitCode}
                        onChange={(e) => handleNumberChange(setTwoDigitCode, 2, e.target.value, setErrorTwoDigit)}
                        onBlur={() => handleNumberBlur(twoDigitCode, setTwoDigitCode, setErrorTwoDigit, 1, 99, 2)}
                        className={`h-full w-full px-4 vazir-medium text-[#909090] border rounded-xl transition-all duration-300 ease-in-out
              ${errorTwoDigit ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
              focus:border-[#B9A278] focus:shadow-md focus:scale-105 bg-white text-center`}
                    />
                </label>
            </div>

        </div>
    );
}
