export default function FloorUnitInput({
    floor, setFloor, errorFloor, setErrorFloor,
    unit, setUnit, errorUnit, setErrorUnit
}) {

    const handleFloorChange = (e) => {
        setFloor(e.target.value);
        if (e.target.value.trim() !== "") setErrorFloor(false);
    };

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
        if (e.target.value.trim() !== "") setErrorUnit(false);
    };

    const handleFloorBlur = () => setErrorFloor(floor.trim() === "");
    const handleUnitBlur = () => setErrorUnit(unit.trim() === "");

    return (
        <div className="col-span-12 h-[50px] grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-6">
                <input
                    type="text"
                    placeholder="طبقه"
                    value={floor}
                    onChange={handleFloorChange}
                    onBlur={handleFloorBlur}
                    className={`w-full h-full px-4 vazir-medium text-[#909090] border rounded-xl bg-white 
                    focus:border-[#B9A278] focus:shadow-md focus:scale-105 outline-none transition-all duration-300 ease-in-out
                    ${errorFloor ? "border-2 border-red-600 animate-shake" : "border-[#909090]"}`}
                />
            </div>

            <div className="col-span-12 sm:col-span-6">
                <input
                    type="text"
                    placeholder="واحد"
                    value={unit}
                    onChange={handleUnitChange}
                    onBlur={handleUnitBlur}
                    className={`w-full h-full px-4 vazir-medium text-[#909090] border rounded-xl bg-white
                    focus:border-[#B9A278] focus:shadow-md focus:scale-105 outline-none transition-all duration-300 ease-in-out
                    ${errorUnit ? "border-2 border-red-600 animate-shake" : "border-[#909090]"}`}
                />
            </div>
        </div>
    );
}
