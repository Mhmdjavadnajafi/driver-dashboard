import React from "react";
import { FaChevronDown } from "react-icons/fa";

export default function ProvinceSelect({ provinces, selectedProvince, setSelectedProvince, errorProvince }) {

    const handleProvinceChange = (e) => setSelectedProvince(provinces.find(p => p.id === +e.target.value));
    const handleProvinceBlur = () => setSelectedProvince(selectedProvince ? selectedProvince : null);

    return (
        <div className="col-span-12 mt-4 h-[50px] relative bg-white">
            <label className="w-full relative">
                <select
                    value={selectedProvince?.id || ""}
                    onChange={handleProvinceChange}
                    onBlur={handleProvinceBlur}
                    className={`h-full w-full px-4 vazir-medium border rounded-xl focus:outline-none focus:ring-1 bg-transparent appearance-none
            ${errorProvince ? "border-red-500 text-red-500" : "border-[#909090] text-[#909090]"}`}
                >
                    <option value="">استان</option>
                    {provinces.map((province) => (
                        <option key={province.id} value={province.id}>{province.name}</option>
                    ))}
                </select>
                <FaChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#909090] pointer-events-none" />
            </label>
        </div>
    );
}