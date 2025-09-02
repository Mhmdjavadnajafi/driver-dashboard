import React, { useState } from "react";
import StepDateModal from "./ModalDate.jsx";

export default function CustomDateSelect({
    day,
    setDay,
    month,
    setMonth,
    year,
    setYear,
    errorDay,
    setErrorDay,
    errorMonth,
    setErrorMonth,
    errorYear,
    setErrorYear,
}) {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);

    const selectClass = (error) =>
        `w-[81px] h-[50px] border rounded-xl px-2 text-center flex items-center justify-center vazir-medium text-[14px] text-[#909090] bg-white transition-all duration-300 ease-in-out
     ${error ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
     focus:border-[#B9A278] focus:shadow-md focus:scale-105 appearance-none`;

    return (
        <div className="col-span-12 sm:col-span-4 h-[57px] flex flex-wrap items-center gap-2 relative">
            <span className="vazir-medium text-[#909090] w-full sm:w-auto">تاریخ تولد</span>

            <div className={selectClass(errorDay)} onClick={openModal}>
                {day || "روز"}
            </div>

            <div className={selectClass(errorMonth)} onClick={openModal}>
                {month || "ماه"}
            </div>

            <div className={selectClass(errorYear)} onClick={openModal}>
                {year || "سال"}
            </div>

            {modalOpen && (
                <StepDateModal
                    day={day}
                    setDay={setDay}
                    month={month}
                    setMonth={setMonth}
                    year={year}
                    setYear={setYear}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
}
