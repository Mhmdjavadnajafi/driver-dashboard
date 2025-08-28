// src/components/form/CustomRadioGroup.jsx
export default function CustomRadioGroup({ label, name, options, value, setValue }) {
    return (
        <div className="col-span-12 sm:col-span-4 h-[50px] flex flex-wrap items-center gap-4">
            <span className="vazir-medium text-[#909090]">{label} :</span>

            {options.map((opt) => (
                <label key={opt.value} className="flex flex-col items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={value === opt.value}
                        onChange={() => setValue(opt.value)}
                        className="w-5 h-5 border-gray-300 accent-blue-600"
                    />
                    <span className="vazir-medium text-[#909090] text-[14px]">{opt.label}</span>
                </label>
            ))}
        </div>
    );
}
