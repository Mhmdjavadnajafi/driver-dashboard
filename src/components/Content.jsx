import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";
import { provinces, cities } from "../assets/satae2";
import MAP from "./Map";
import { LuPlus } from "react-icons/lu";
import { LuCheck } from "react-icons/lu"
import { IoCheckmark } from "react-icons/io5";
const citiesByProvince = provinces.reduce((acc, province) => {
    acc[province.id] = cities.filter(city => city.province_id === province.id);
    return acc;
}, {});

export function Contnet() {
    const [gender, setGender] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [maritalStatus, setMaritalStatus] = useState('');
    const [daughters, setDaughters] = useState("");
    const [sons, setSons] = useState("");
    const [carType, setCarType] = useState("");
    const [provinceCode, setProvinceCode] = useState(""); // کد استان (10 تا 99)
    const [threeDigitCode, setThreeDigitCode] = useState(""); // کد سه رقمی (100 تا 999)
    const [letter, setLetter] = useState(""); // حرف الفبا
    const [twoDigitCode, setTwoDigitCode] = useState(""); // کد دو رقمی (11 تا 99)
    const [transportHistory, setTransportHistory] = useState("");
    const [transportYears, setTransportYears] = useState("");
    const [passengerType, setPassengerType] = useState("");
    const [schoolService, setSchoolService] = useState("");
    const [serviceType, setServiceType] = useState("")
    const [misuseHistory, setMisuseHistory] = useState("")
    const [selectedDays, setSelectedDays] = useState([]);
    const daysOfWeek = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
    const letters = ["ب", "پ", "ت", "ث", "ج", "چ", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ک", "گ", "ل", "م", "ن", "و", "ه", "ی"];
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cityList, setCityList] = useState([]);
    const [nationalCardFront, setNationalCardFront] = useState(null);
    const [nationalCardBack, setNationalCardBack] = useState(null);
    const [criminalRecord, setCriminalRecord] = useState(null);
    const [addictionFree, setAddictionFree] = useState(null);
    const [birthCertificate, setBirthCertificate] = useState(null);
    const [driverLicense, setDriverLicense] = useState(null);
    const [sepandRegistration, setSepandRegistration] = useState(null);
    const [personalPhoto, setPersonalPhoto] = useState(null);
    const [teydaContract, setTeydaContract] = useState(null);
    const [carCard, setCarCard] = useState(null);
    const [carInsurance, setCarInsurance] = useState(null);
    const [technicalInspection, setTechnicalInspection] = useState(null);
    const [selected, setSelected] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [activeCategories, setActiveCategories] = useState([]);
    const categories = [
        "دولتی",
        "خرید کالا",
        "وسیله نقلیه",
        "بهداشتی",
        "سایر",
        "همه"
    ];
    const toggleCategory = (index) =>
        setSelectedCategories(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    const handleToggleCategory = (index) =>
        setActiveCategories(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    const initialDocs = [
        {
            name: "حمل و نقل دانش آموز"
        },
        {
            name: "حمل و نقل سرویس"
        },
        {
            name: "حمل و نقل بین شهری"
        },
        {
            name: "حمل و نقل داخل شهری"
        },
        { name: "مارکت پلیس" },
        { name: "خدمات فردی" },
        { name: 'خدمات خانواده' },
        { name: 'سایر' },
        { name: 'همه' }
    ];
    const docs = [
        { name: "کارت ملی رو", state: nationalCardFront, setState: setNationalCardFront },
        { name: "کارت ملی پشت", state: nationalCardBack, setState: setNationalCardBack },
        { name: "سوء پیشینه", state: criminalRecord, setState: setCriminalRecord },
        { name: "عدم اعتیاد", state: addictionFree, setState: setAddictionFree },
        { name: "شناسنامه", state: birthCertificate, setState: setBirthCertificate },
        { name: "گواهی نامه", state: driverLicense, setState: setDriverLicense },
        { name: "ثبت نام سپند", state: sepandRegistration, setState: setSepandRegistration },
        { name: "تصویر پرسنلی", state: personalPhoto, setState: setPersonalPhoto },
        { name: "قرارداد تیدا", state: teydaContract, setState: setTeydaContract },
        { name: "کارت ماشین", state: carCard, setState: setCarCard },
        { name: "بیمه ماشین", state: carInsurance, setState: setCarInsurance },
        { name: "معاینه فنی", state: technicalInspection, setState: setTechnicalInspection },
    ];
    const allCategories = [
        "بخش 1",
        "بخش 2",
        "بخش 3",
        "بخش 4",
        "بخش 5",
        "بخش 6",
        "بخش 7",
        "بخش 8",
        "همه",
    ];
    useEffect(() => {
        setCityList(selectedProvince ? citiesByProvince[selectedProvince.id] || [] : []);
        setSelectedCity(null);
    }, [selectedProvince]);
    const toggleDay = (day) =>
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    const toggleSelect = (index) =>
        setSelected(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    return (
        <div className="w-[95%] mx-auto py-3 mt-5">
            <div className="vazir-light text-[#676767] font-bold text-[14px]">ایجاد کاربر راننده</div>
            <form className="w-[100%] px-5 mt-10 mx-auto">
                <div className="form-title vazir-light text-[#676767] font-bold text-[14px]">اطلاعات پایه</div>
                <div className="grid grid-cols-12 gap-4 mt-5">
                    <div className="col-span-12 sm:col-span-4 h-[50px]">
                        <input
                            placeholder="نام"
                            type="text"
                            className="h-full w-full px-4 vazir-medium text-[#909090] font-bold border border-[#909090] rounded-xl"
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-4 h-[50px]">
                        <input
                            placeholder="نام خانوادگی"
                            type="text"
                            className="h-full w-full px-4 vazir-medium text-[#909090] font-bold border border-[#909090] rounded-xl"
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-4 h-[50px] flex flex-wrap items-center gap-4">
                        <span className="vazir-medium text-[#909090]">جنسیت :</span>

                        <label className="flex flex-col gap-2 items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === "male"}
                                onChange={() => setGender("male")}
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className="vazir-medium text-[#909090] text-[14px]">آقا</span>
                        </label>

                        <label className="flex flex-col gap-2 items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === "female"}
                                onChange={() => setGender("female")}
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className="vazir-medium text-[#909090] text-[14px]">خانم</span>
                        </label>
                    </div>

                    <div className="col-span-12 sm:col-span-4 h-[50px]">
                        <input
                            placeholder="کد ملی"
                            type="text"
                            className="h-full w-full px-4 vazir-medium text-[#909090] font-bold border border-[#909090] rounded-xl"
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-4 h-[50px]">
                        <input
                            placeholder="شماره همراه"
                            type="text"
                            className="h-full w-full px-4 vazir-medium text-[#909090] font-bold border border-[#909090] rounded-xl"
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-4 h-[57px] flex flex-wrap items-center gap-2">
                        <span className="vazir-medium text-[#909090] w-full sm:w-auto">تاریخ تولد</span>

                        <select
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            className="w-[81px] h-[50px] border border-[#909090] rounded px-2 text-center vazir-medium text-[14px] text-[#909090] focus:outline-none rounded-xl focus:ring-1 focus:ring-blue-500 bg-transparent appearance-none"
                        >
                            <option value="">روز</option>
                            {Array.from({ length: 31 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>

                        <select
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className="w-[81px] h-[50px] border border-[#909090] rounded px-2 text-center vazir-medium text-[14px] text-[#909090] rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent appearance-none"
                        >
                            <option value="">ماه</option>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>

                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-[81px] h-[50px] border border-[#909090] rounded px-2 text-center vazir-medium rounded-xl text-[14px] text-[#909090] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent appearance-none"
                        >
                            <option value="">سال</option>
                            {Array.from({ length: 151 }, (_, i) => (
                                <option key={i + 1300} value={i + 1300}>{i + 1300}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-12 sm:col-span-4 h-[50px] flex flex-wrap items-center gap-2 sm:gap-4 my-8 md:my-0">
                        <span className="vazir-medium text-[#909090] w-full sm:w-auto">وضعیت تأهل :</span>

                        <label className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="maritalStatus"
                                value="single"
                                checked={maritalStatus === "single"}
                                onChange={() => setMaritalStatus("single")}
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className="vazir-medium text-[#909090] text-[14px]">مجرد</span>
                        </label>

                        <label className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="maritalStatus"
                                value="married"
                                checked={maritalStatus === "married"}
                                onChange={() => setMaritalStatus("married")}
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className="vazir-medium text-[14px] text-[#909090]">متأهل</span>
                        </label>
                    </div>


                    <div className="col-span-12 sm:col-span-4 h-[50px] relative">
                        <label className="w-full relative">
                            <select
                                value={daughters}
                                onChange={(e) => setDaughters(e.target.value)}
                                className="h-full w-full px-4 vazir-medium text-[#909090] border border-[#909090] rounded-xl focus:outline-none focus:ring-1 bg-transparent appearance-none"
                            >
                                <option value="">فرزند دختر</option>
                                {Array.from({ length: 11 }, (_, i) => (
                                    <option key={i} value={i}>{i}</option>
                                ))}
                            </select>
                            <FaChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#909090] pointer-events-none" />
                        </label>
                    </div>

                    <div className="col-span-12 sm:col-span-4 h-[50px] relative">
                        <label className="w-full relative">
                            <select
                                value={sons}
                                onChange={(e) => setSons(e.target.value)}
                                className="h-full w-full px-4 vazir-medium text-[#909090] border border-[#909090] rounded-xl focus:outline-none focus:ring-1 bg-transparent appearance-none"
                            >
                                <option value="">فرزند پسر</option>
                                {Array.from({ length: 11 }, (_, i) => (
                                    <option key={i} value={i}>{i}</option>
                                ))}
                            </select>
                            <FaChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#909090] pointer-events-none" />
                        </label>
                    </div>
                    {/* نوع خودرو */}
                    <div className="col-span-6 h-[50px] flex flex-wrap items-center space-x-0 sm:space-x-6 mt-4 mr-3">
                        <span className="vazir-medium text-[#909090] w-full sm:w-auto mb-2 sm:mb-0">نوع خودرو :</span>

                        {[
                            { value: "sedan", label: "سواری" },
                            { value: "van", label: "ون" },
                            { value: "minibus", label: "مینی‌بوس" },
                            { value: "bus", label: "اتوبوس" },
                        ].map((car) => (
                            <label key={car.value} className="flex flex-col gap-2 items-center cursor-pointer mr-0 sm:mr-3 w-1/2 sm:w-auto mb-2 sm:mb-0">
                                <input
                                    type="radio"
                                    name="carType"
                                    value={car.value}
                                    checked={carType === car.value}
                                    onChange={() => setCarType(car.value)}
                                    className="w-5 h-5 border-gray-300 accent-blue-600"
                                />
                                <span className="vazir-medium text-[#909090] text-[14px]">{car.label}</span>
                            </label>
                        ))}
                    </div>

                    {/* کد پلاک خودرو */}
                    <div className="col-span-6 mt-4 grid grid-cols-12 gap-3">
                        <div className="col-span-6 sm:col-span-3 h-[50px] relative">
                            <label className="w-full relative">
                                <select
                                    value={provinceCode}
                                    onChange={(e) => setProvinceCode(e.target.value)}
                                    className="h-full w-full px-4 vazir-medium text-[#909090] border border-[#909090] rounded-xl focus:outline-none focus:ring-1 bg-transparent appearance-none text-center"
                                >
                                    <option value="">استان</option>
                                    {Array.from({ length: 90 }, (_, i) => i + 10).map((num) => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="col-span-6 sm:col-span-3 h-[50px] relative">
                            <label className="w-full relative">
                                <select
                                    value={threeDigitCode}
                                    onChange={(e) => setThreeDigitCode(e.target.value)}
                                    className="h-full w-full px-4 vazir-medium text-[#909090] border border-[#909090] rounded-xl focus:outline-none focus:ring-1 bg-transparent appearance-none text-center"
                                >
                                    <option value="">128</option>
                                    {Array.from({ length: 900 }, (_, i) => i + 100).map((num) => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
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
                        <div className="col-span-6 sm:col-span-3 h-[50px] relative">
                            <label className="w-full relative">
                                <select
                                    value={twoDigitCode}
                                    onChange={(e) => setTwoDigitCode(e.target.value)}
                                    className="h-full w-full px-4 vazir-medium text-[#909090] border border-[#909090] rounded-xl focus:outline-none focus:ring-1 bg-transparent appearance-none text-center"
                                >
                                    <option value="">12</option>
                                    {Array.from({ length: 89 }, (_, i) => i + 11).map((num) => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                                <FaChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#909090] pointer-events-none" />
                            </label>
                        </div>
                    </div>

                    {/* سابقه حمل و نقل دانش‌آموز */}
                    <div className="col-span-12 sm:col-span-4 mt-4 flex flex-wrap items-center gap-2 sm:gap-4">
                        <span className="vazir-medium text-[#909090] w-full sm:w-auto">سابقه حمل و نقل دانش‌آموز :</span>

                        <label className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="transportHistory"
                                value="has"
                                checked={transportHistory === "has"}
                                onChange={() => setTransportHistory("has")}
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className="vazir-medium text-[#909090] text-[14px]">دارد</span>
                        </label>

                        <label className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="transportHistory"
                                value="none"
                                checked={transportHistory === "none"}
                                onChange={() => setTransportHistory("none")}
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className="vazir-medium text-[14px] text-[#909090]">ندارد</span>
                        </label>
                    </div>

                    {/* سابقه در سال */}
                    <div className="col-span-12 sm:col-span-4 mt-4 h-[50px] relative">
                        <label className="w-full relative">
                            <select
                                value={transportYears}
                                onChange={(e) => setTransportYears(e.target.value)}
                                className="h-full w-full px-4 vazir-medium text-[#909090] border border-[#909090] rounded-xl focus:outline-none focus:ring-1 bg-transparent appearance-none"
                            >
                                <option value="">سابقه در سال</option>
                                {Array.from({ length: 51 }, (_, i) => (
                                    <option key={i} value={i}>{i}</option>
                                ))}
                            </select>
                            <FaChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#909090] pointer-events-none" />
                        </label>
                    </div>

                    {/* نوع مسافر */}
                    <div className="col-span-12 sm:col-span-4 mt-4 flex flex-wrap items-center gap-2 sm:gap-6">
                        <span className="vazir-medium text-[#909090] w-full sm:w-auto">نوع مسافر :</span>

                        <label className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="passengerType"
                                value="boy"
                                checked={passengerType === "boy"}
                                onChange={() => setPassengerType("boy")}
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className="vazir-medium text-[#909090] text-[14px]">پسر</span>
                        </label>

                        <label className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="passengerType"
                                value="girl"
                                checked={passengerType === "girl"}
                                onChange={() => setPassengerType("girl")}
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className="vazir-medium text-[14px] text-[#909090]">دختر</span>
                        </label>

                        <label className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="passengerType"
                                value="both"
                                checked={passengerType === "both"}
                                onChange={() => setPassengerType("both")}
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className="vazir-medium text-[14px] text-[#909090]">هر دو</span>
                        </label>
                    </div>

                    {/* تعداد سرویس مدرسه */}
                    <div className="col-span-12 sm:col-span-4 mt-4 flex flex-wrap items-center gap-2 sm:gap-4">
                        <span className="vazir-medium text-[#909090] w-full sm:w-auto">تعداد سرویس مدرسه :</span>

                        <label className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="schoolService"
                                value="1"
                                checked={schoolService === "1"}
                                onChange={() => setSchoolService("1")}
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className="vazir-medium text-[#909090] text-[14px]">یک</span>
                        </label>

                        <label className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="schoolService"
                                value="2"
                                checked={schoolService === "2"}
                                onChange={() => setSchoolService("2")}
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className="vazir-medium text-[14px] text-[#909090]">دو</span>
                        </label>
                    </div>

                    {/* نوع سرویس مدرسه */}
                    <div className="col-span-12 sm:col-span-4 mt-4 flex flex-wrap items-center gap-2 sm:gap-4">
                        <span className="vazir-medium text-[#909090] w-full sm:w-auto">نوع سرویس مدرسه :</span>

                        <label className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="serviceType"
                                value="morning"
                                checked={serviceType === "morning"}
                                onChange={() => setServiceType("morning")}
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className="vazir-medium text-[#909090] text-[14px]">صبح</span>
                        </label>

                        <label className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="serviceType"
                                value="afternoon"
                                checked={serviceType === "afternoon"}
                                onChange={() => setServiceType("afternoon")}
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className="vazir-medium text-[14px] text-[#909090]">عصر</span>
                        </label>
                    </div>

                    {/* سابقه سو مصرف */}
                    <div className="col-span-12 sm:col-span-4 mt-4 flex flex-wrap items-center gap-2 sm:gap-4">
                        <span className="vazir-medium text-[#909090] w-full sm:w-auto">سابقه سو مصرف :</span>

                        <label className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="misuseHistory"
                                value="no"
                                checked={misuseHistory === "no"}
                                onChange={() => setMisuseHistory("no")}
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className="vazir-medium text-[#909090] text-[14px]">ندارد</span>
                        </label>

                        <label className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="misuseHistory"
                                value="yes"
                                checked={misuseHistory === "yes"}
                                onChange={() => setMisuseHistory("yes")}
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className="vazir-medium text-[14px] text-[#909090]">دارد</span>
                        </label>
                    </div>

                    <div className="col-span-12 mt-4 flex flex-wrap items-center gap-2 sm:gap-4 mr-3">
                        <span className="vazir-medium text-[#909090] w-full sm:w-auto">کار در ایام هفته :</span>

                        {daysOfWeek.map((day) => (
                            <label key={day} className="flex flex-col gap-2 items-center cursor-pointer flex-1 sm:flex-none relative">
                                <input
                                    type="checkbox"
                                    checked={selectedDays.includes(day)}
                                    onChange={() => toggleDay(day)}
                                    className="absolute opacity-0 w-0 h-0"
                                />

                                <span
                                    className={`w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center 
          ${selectedDays.includes(day) ? "bg-blue-600" : "bg-white"}`}
                                >
                                    {selectedDays.includes(day) && <span className="w-2 h-2 bg-white rounded-full"></span>}
                                </span>
                                <span className="vazir-medium text-[#909090] text-[14px]">{day}</span>
                            </label>
                        ))}
                    </div>

                    <div className="col-span-12 mt-12 vazir-light text-[#676767] font-bold text-[14px] gap-4 ">
                        اطلاعات محل سکونت راننده
                    </div>
                    <div className="col-span-12 md:col-span-4 h-auto grid grid-cols-12 gap-4">
                        {/* انتخاب استان */}
                        <div className="col-span-12 mt-4 h-[50px] relative">
                            <label className="w-full relative">
                                <select
                                    value={selectedProvince?.id || ""}
                                    onChange={(e) => {
                                        const prov = provinces.find((p) => p.id === parseInt(e.target.value));
                                        setSelectedProvince(prov || null);
                                    }}
                                    className="h-full w-full px-4 vazir-medium text-[#909090] border border-[#909090] rounded-xl focus:outline-none focus:ring-1 bg-transparent appearance-none"
                                >
                                    <option value="">استان</option>
                                    {provinces.map((province) => (
                                        <option key={province.id} value={province.id}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                                <FaChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#909090] pointer-events-none" />
                            </label>
                        </div>

                        {/* انتخاب شهر */}
                        <div className="col-span-12 mt-4 h-[50px] relative">
                            <label className="w-full relative">
                                <select
                                    value={selectedCity?.id || ""}
                                    onChange={(e) => {
                                        const city = cityList.find((c) => c.id === parseInt(e.target.value));
                                        setSelectedCity(city || null);
                                    }}
                                    disabled={!selectedProvince}
                                    className="h-full w-full px-4 vazir-medium text-[#909090] border border-[#909090] rounded-xl focus:outline-none focus:ring-1 bg-transparent appearance-none disabled:bg-gray-100"
                                >
                                    <option value="">شهر</option>
                                    {cityList.map((city) => (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                                <FaChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#909090] pointer-events-none" />
                            </label>
                        </div>
                        <div className="col-span-12 mt-4 relative">
                            <textarea
                                placeholder="آدرس"
                                className="w-full h-[140px] px-4 py-2 vazir-medium text-[#909090] border border-[#909090] rounded-xl focus:outline-none focus:ring-1 resize-none bg-white"
                            />
                        </div>

                        <div className="col-span-12 h-[50px] grid grid-cols-12 gap-4">
                            <div className="col-span-12 sm:col-span-6">
                                <input
                                    type="text"
                                    placeholder="طبقه"
                                    className="w-full h-full px-4 vazir-medium text-[#909090] border border-[#909090] rounded-xl focus:outline-none focus:ring-1"
                                />
                            </div>
                            <div className="col-span-12 sm:col-span-6">
                                <input
                                    type="text"
                                    placeholder="واحد"
                                    className="w-full h-full px-4 vazir-medium text-[#909090] border border-[#909090] rounded-xl focus:outline-none focus:ring-1"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-8 h-[400px] mt-4 md:mt-0">
                        <MAP />
                    </div>
                    <div className="col-span-12 mt-12 vazir-light text-[#676767] font-bold text-[14px] gap-4">مدارک هویتی</div>
                    <div className="col-span-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4">
                        {docs.map((doc, index) => (
                            <div
                                key={index}
                                className="flex vazir-light flex-col items-center justify-center h-36 rounded-xl border border-gray-300 transition-all duration-200 cursor-pointer text-[#676767] font-bold text-[14px]"
                            >
                                <label className="flex flex-col items-center justify-center w-full h-full">
                                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2 hover:bg-blue-50 transition-colors duration-200">
                                        {doc.state ? (
                                            <motion.img
                                                key={doc.state.name}
                                                src={URL.createObjectURL(doc.state)}
                                                alt={doc.name}
                                                className="w-full h-full object-cover rounded-full"
                                                initial={{ opacity: 0, scale: 0.7 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.4, ease: "easeOut" }}
                                            />
                                        ) : (
                                            <motion.div
                                                initial={{ scale: 1 }}
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                            >
                                                <LuPlus className="text-2xl text-gray-400" />
                                            </motion.div>
                                        )}
                                    </div>
                                    <div className="text-center relative top-3">{doc.name}</div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => doc.setState(e.target.files[0])}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="col-span-12 mt-12 vazir-light text-[#676767] font-bold text-[14px] gap-4">ارائه خدمات در</div>
                    <div className="col-span-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4 relative">
                        {initialDocs.map((doc, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col items-center justify-center gap-10 h-36 rounded-xl border transition-all duration-200 cursor-pointer
        ${selected.includes(index) ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleSelect(index);
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={
                                        selected.includes(index)
                                            ? { opacity: 1, scale: 1 }
                                            : { opacity: 0, scale: 0.5 }
                                    }
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                    <IoCheckmark className="text-xl text-[#00C313]" />
                                </motion.div>

                                <div className="text-center vazir-light text-[#676767] font-bold text-[14px]">
                                    {doc.name}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-span-12 mt-12 vazir-light text-[#676767] font-bold text-[14px] gap-4">دریافت خدمات</div>
                    <div className="col-span-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4 relative">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col items-center justify-center gap-10 h-36 rounded-xl border transition-all duration-200 cursor-pointer
        ${selectedCategories.includes(index) ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleCategory(index);
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={
                                        selectedCategories.includes(index)
                                            ? { opacity: 1, scale: 1 }
                                            : { opacity: 0, scale: 0.5 }
                                    }
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                    <IoCheckmark className="text-xl text-[#00C313]" />
                                </motion.div>

                                <div className="text-center vazir-light text-[#676767] font-bold text-[14px]">
                                    {category}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-span-12 mt-12 vazir-light text-[#676767] font-bold text-[14px] gap-4">تمایل حمل و نقل در بخش</div>
                    <div className="col-span-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4 relative">
                        {allCategories.map((category, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col items-center justify-center gap-10 h-36 rounded-xl border transition-all duration-200 cursor-pointer
        ${activeCategories.includes(index) ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleToggleCategory(index);
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={
                                        activeCategories.includes(index)
                                            ? { opacity: 1, scale: 1 }
                                            : { opacity: 0, scale: 0.5 }
                                    }
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                    <IoCheckmark className="text-xl text-[#00C313]" />
                                </motion.div>
                                <div className="text-center vazir-light text-[#676767] font-bold text-[14px]">
                                    {category}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </form>
        </div>
    )
}