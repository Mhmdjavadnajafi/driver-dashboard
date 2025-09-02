export default function WorkDaysCheckbox({ daysOfWeek, selectedDays, toggleDay }) {

    const toggleAllDays = () => {
        if (selectedDays.length === daysOfWeek.length) {
            daysOfWeek.forEach(day => toggleDay(day)); 
        } else {
            daysOfWeek.forEach(day => {
                if (!selectedDays.includes(day)) toggleDay(day);
            });
        }
    };

    const allChecked = selectedDays.length === daysOfWeek.length;

    return (
        <div className="col-span-12 mt-4 flex flex-wrap items-center gap-3">
            <span className="vazir-medium text-[#909090] w-full mb-2">کار در ایام هفته :</span>

            {daysOfWeek.map((day) => (
                <label key={day} className="flex flex-col items-center cursor-pointer relative">
                    <input
                        type="checkbox"
                        checked={selectedDays.includes(day)}
                        onChange={() => toggleDay(day)}
                        className="absolute w-0 h-0"
                    />
                    <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center border border-white transition-all duration-300
                          ${selectedDays.includes(day) ? "bg-blue-500 shadow-md" : "bg-gray-300 hover:bg-gray-500"}`}
                    >
                        {selectedDays.includes(day) && (
                            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                        )}
                    </span>
                    <span className="vazir-medium text-[#909090] text-[14px] mt-1">{day}</span>
                </label>
            ))}

            <label className="flex flex-col items-center cursor-pointer relative">
                <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAllDays}
                    className="absolute opacity-0 w-0 h-0"
                />
                <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center border border-white transition-all duration-300
                        ${allChecked ? "bg-blue-500 shadow-md" : "bg-gray-300 hover:bg-gray-500"}`}
                >
                    {allChecked && <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>}
                </span>
                <span className="vazir-medium text-[#909090] text-[14px] mt-1">همه</span>
            </label>
        </div>
    );
}
