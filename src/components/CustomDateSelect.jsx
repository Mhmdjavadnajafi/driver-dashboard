import React from "react";

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
    const handleDayBlur = () => {
        const isValid = day && +day >= 1 && +day <= 31;
        setErrorDay(!isValid);
    };

    const handleMonthBlur = () => {
        const isValid = month && +month >= 1 && +month <= 12;
        setErrorMonth(!isValid);
    };

    const handleYearBlur = () => {
        const isValid = year && +year >= 1300 && +year <= 1404; // 105 سال
        setErrorYear(!isValid);
    };

    const selectClass = (error) =>
        `w-[81px] h-[50px] border rounded-xl px-2 text-center vazir-medium text-[14px] text-[#909090] bg-white transition-all duration-300 ease-in-out
     ${error ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
     focus:border-[#B9A278] focus:shadow-md focus:scale-105 appearance-none`;

    return (
        <div className="col-span-12 sm:col-span-4 h-[57px] flex flex-wrap items-center gap-2">
            <span className="vazir-medium text-[#909090] w-full sm:w-auto">تاریخ تولد</span>

            {/* روز */}
            <select
                value={day}
                onChange={(e) => {
                    const val = e.target.value;
                    setDay(val);
                    if (+val >= 1 && +val <= 31) setErrorDay(false);
                }}
                onBlur={handleDayBlur}
                className={selectClass(errorDay)}
            >
                <option value="">روز</option>
                {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>

            {/* ماه */}
            <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                onBlur={handleMonthBlur}
                className={selectClass(errorMonth)}
            >
                <option value="">ماه</option>
                {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>

            {/* سال */}
            <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                onBlur={handleYearBlur}
                className={selectClass(errorYear)}
            >
                <option value="">سال</option>
                {Array.from({ length: 105 }, (_, i) => i + 1300).map((yr) => (
                    <option key={yr} value={yr}>
                        {yr}
                    </option>
                ))}
            </select>
        </div>
    );
}
