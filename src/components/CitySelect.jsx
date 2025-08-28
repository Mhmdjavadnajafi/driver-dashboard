import React from "react";
import { FaChevronDown } from "react-icons/fa";

export default function CitySelect({ selectedProvince, cityList, selectedCity, setSelectedCity, errorCity }) {

    const handleCityChange = (e) => setSelectedCity(cityList.find(c => c.id === +e.target.value));
    const handleCityBlur = () => setSelectedCity(selectedCity ? selectedCity : null);

    return (
        <div className="col-span-12 mt-4 h-[50px] relative bg-white">
            <label className="w-full relative">
                <select
                    value={selectedCity?.id || ""}
                    onChange={handleCityChange}
                    onBlur={handleCityBlur}
                    disabled={!selectedProvince}
                    className={`h-full w-full px-4 vazir-medium border rounded-xl focus:outline-none focus:ring-1 bg-transparent appearance-none
            ${errorCity ? "border-red-500 text-red-500" : "border-[#909090] text-[#909090]"}
            ${!selectedProvince ? "disabled:bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                >
                    <option value="">شهر</option>
                    {cityList.map((city) => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                </select>
                <FaChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#909090] pointer-events-none" />
            </label>
        </div>
    );
}