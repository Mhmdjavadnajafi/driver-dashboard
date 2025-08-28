export default function CustomInput({ value, setValue, error, setError, placeholder }) {
    const handleBlur = () => {
        if (value.trim() === "") setError(true);
        else setError(false);
    };

    return (
        <div className="col-span-12 sm:col-span-4 h-[50px]">
            <input
                placeholder={placeholder}
                type="text"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    if (e.target.value.trim() !== "") setError(false);
                }}
                onBlur={handleBlur}
                className={`h-12 w-full px-4 vazir-medium text-[#909090] font-bold border rounded-xl transition-all duration-300 ease-in-out bg-white
          ${error ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
          focus:border-[#B9A278] focus:shadow-md focus:scale-105`}
            />
        </div>
    );
}