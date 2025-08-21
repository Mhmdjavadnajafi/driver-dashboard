import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";
import { provinces, cities } from "../assets/satae2";
import MAP from "./Map";
import { LuPlus } from "react-icons/lu";
import { LuCheck } from "react-icons/lu"
import { IoCheckmark } from "react-icons/io5";
import { IoTrash } from "react-icons/io5";

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
    const [selectedProvince, setSelectedProvince] = useState(
        provinces.find((p) => p.name === "لرستان") || null
    );
    const [selectedCity, setSelectedCity] = useState(null);
    const [cityList, setCityList] = useState(
        selectedProvince ? citiesByProvince[selectedProvince.id] || [] : []
    );
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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorFirst, setErrorFirst] = useState(false);
    const [errorLast, setErrorLast] = useState(false);
    const [nationalCode, setNationalCode] = useState("");
    const [errorNationalCode, setErrorNationalCode] = useState(false);
    const [phone, setPhone] = useState("");
    const [errorPhone, setErrorPhone] = useState(false);
    const [errorDayField, setErrorDayField] = useState(false);
    const [errorMonthField, setErrorMonthField] = useState(false);
    const [errorYear, setErrorYear] = useState(false);
    const [errorDaughters, setErrorDaughters] = useState(false);
    const [errorSons, setErrorSons] = useState(false);
    const [errorThreeDigit, setErrorThreeDigit] = useState(false);
    const [errorProvince, setErrorProvince] = useState(false);
    const [errorTwoDigit, setErrorTwoDigit] = useState(false);
    const [errorCity, setErrorCity] = useState(false);
    const [address, setAddress] = useState("");
    const [errorAddress, setErrorAddress] = useState(false);
    const [floor, setFloor] = useState("");
    const [errorFloor, setErrorFloor] = useState(false);
    const [unit, setUnit] = useState("");
    const [errorUnit, setErrorUnit] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // state ها برای خطاها
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirm, setErrorConfirm] = useState(false);

    // تابع ولیدیشن هنگام blur
    const validateField = (value, setError) => {
        if (value.trim() === "") {
            setError(true);
        } else {
            setError(false);
        }
    };

    // submit فرم
    const handleSubmit = (e) => {
        e.preventDefault();
        // ولیدیشن نهایی قبل ذخیره
        const hasError =
            !password || !confirmPassword || password !== confirmPassword;

        setErrorPassword(!password);
        setErrorConfirm(!confirmPassword || password !== confirmPassword);

        if (!hasError) {
            // ارسال اطلاعات
            console.log("Password saved:", password);
        }
    };
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        if (e.target.value.trim() !== "") setErrorAddress(false);
    };

    // هندل blur
    const handleAddressBlur = () => {
        setErrorAddress(address.trim() === "");
    };
    const handleCityChange = (e) => {
        const city = cityList.find((c) => c.id === parseInt(e.target.value));
        setSelectedCity(city || null);
        setErrorCity(!city); // اگر خالی بود، خطا فعال شود
    };

    // هندل blur برای شهر
    const handleCityBlur = () => {
        setErrorCity(!selectedCity);
    };
    const handleProvinceChange = (e) => {
  const prov = provinces.find((p) => p.id === parseInt(e.target.value));
  setSelectedProvince(prov || null);
  setErrorProvince(!prov); // اگر خالی بود، خطا فعال شود
};

// هندل blur برای استان
const handleProvinceBlur = () => {
  setErrorProvince(!selectedProvince); // اگر خالی بود، خطا فعال شود
};
    const handleTwoDigitBlur = () => {
        if (selectedTwoDigit === "") {
            setErrorTwoDigit(true);
        } else {
            setErrorTwoDigit(false);
        }
    };

    const handleThreeDigitBlur = () => {
        // خالی بودن، صفر داخلش بودن یا بیشتر از 3 رقم
        if (
            threeDigitCode === "" ||
            /0/.test(threeDigitCode) ||
            threeDigitCode.length > 3
        ) {
            setErrorThreeDigit(true);
        } else {
            setErrorThreeDigit(false);
        }
    };

    const handleThreeDigitChange = (e) => {
        // فقط اعداد و حداکثر 3 رقم
        const value = e.target.value.replace(/\D/g, "").slice(0, 3);
        setThreeDigitCode(value);
    };
    const handleSonsBlur = () => setErrorSons(sons === "");
    const handleDaughtersBlur = () => setErrorDaughters(daughters === "");
    const handleMonthBlur = () => {
        setErrorMonthField(month === "");
    };
    const handleDayBlur = () => {
        if (day === "") {
            setErrorDayField(true);
        } else {
            setErrorDayField(false);
        }
    };
    const handleYearBlur = () => setErrorYear(year === "");

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 11); // فقط اعداد و حداکثر 11 رقم
        setPhone(value);
    };
    const handlePhoneBlur = () => {
        setErrorPhone(phone.length !== 11); // اگر کمتر یا بیشتر بود، خطا
    };
    const handleNationalCodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
        setNationalCode(value);
    };
    const handleNationalCodeBlur = () => {
        setErrorNationalCode(nationalCode.length !== 10);
    };
    const handleBlur = (value, setError) => {
        setError(value.trim() === "");
    };
    const categories = [
        "دولتی",
        "خرید کالا",
        "وسیله نقلیه",
        "بهداشتی",
        "سایر",
        "همه"
    ];
    const toggleCategory = (index) => {
        if (categories[index] === "همه") {
            if (selectedCategories.length === categories.length) {
                // همه انتخاب بودن → پاک کن
                setSelectedCategories([]);
            } else {
                // همه انتخاب کن (همه آیتم‌ها + همه خودش)
                setSelectedCategories(categories.map((_, i) => i));
            }
        } else {
            let updated;
            if (selectedCategories.includes(index)) {
                updated = selectedCategories.filter((i) => i !== index);
            } else {
                updated = [...selectedCategories, index];
            }

            // اگه همه انتخاب شدن، "همه" رو هم فعال کن
            if (
                updated.length === categories.length - 1 &&
                !updated.includes(categories.length - 1)
            ) {
                updated = [...updated, categories.length - 1];
            }

            // اگه یکی از گزینه‌ها لغو شد → "همه" هم لغو بشه
            if (
                updated.includes(categories.length - 1) &&
                updated.length !== categories.length
            ) {
                updated = updated.filter((i) => i !== categories.length - 1);
            }

            setSelectedCategories(updated);
        }
    };
    const handleToggleCategory = (index) => {
        if (allCategories[index] === "همه") {
            if (activeCategories.length === allCategories.length) {
                // همه انتخاب بودن → لغو همه
                setActiveCategories([]);
            } else {
                // همه انتخاب کن
                setActiveCategories(allCategories.map((_, i) => i));
            }
        } else {
            let updated;
            if (activeCategories.includes(index)) {
                updated = activeCategories.filter((i) => i !== index);
            } else {
                updated = [...activeCategories, index];
            }

            // اگه همه آیتم‌ها انتخاب شدن → "همه" رو هم فعال کن
            if (
                updated.length === allCategories.length - 1 &&
                !updated.includes(allCategories.length - 1)
            ) {
                updated = [...updated, allCategories.length - 1];
            }

            // اگه یکی لغو شد → "همه" هم لغو بشه
            if (
                updated.includes(allCategories.length - 1) &&
                updated.length !== allCategories.length
            ) {
                updated = updated.filter((i) => i !== allCategories.length - 1);
            }

            setActiveCategories(updated);
        }
    };
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
        const cities = selectedProvince ? citiesByProvince[selectedProvince.id] || [] : [];
        setCityList(cities);
        const defaultCity = cities.find(city => city.name === "خرم آباد");
        setSelectedCity(defaultCity || null);
    }, [selectedProvince]);
    const toggleDay = (day) =>
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    const toggleSelect = (index) => {
        if (initialDocs[index].name === "همه") {
            if (selected.length === initialDocs.length) {
                setSelected([]);
            } else {
                setSelected(initialDocs.map((_, i) => i));
            }
        } else {
            let updated;
            if (selected.includes(index)) {
                updated = selected.filter((i) => i !== index);
            } else {
                updated = [...selected, index];
            }

            if (
                updated.length === initialDocs.length - 1 &&
                !updated.includes(initialDocs.length - 1)
            ) {
                updated = [...updated, initialDocs.length - 1];
            }

            if (
                updated.includes(initialDocs.length - 1) &&
                updated.length !== initialDocs.length
            ) {
                updated = updated.filter((i) => i !== initialDocs.length - 1);
            }

            setSelected(updated);
        }
    };
    return (
        <div className="w-[95%] h-full mx-auto py-3 mt-5 sm-none">
            <div className="vazir-light text-[#676767] font-bold text-[14px]">ایجاد کاربر راننده</div>
            <form className="w-[100%] px-5 mt-10 mx-auto">
                <div className="form-title vazir-light text-[#676767] font-bold text-[14px]">اطلاعات پایه</div>
                <div className="grid grid-cols-12 gap-4 mt-5">
                    <div className="col-span-12 sm:col-span-4 h-[50px]">
                        <input
                            placeholder="نام"
                            type="text"
                            value={firstName} // همیشه مقدار state را نمایش بده
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                if (e.target.value.trim() !== "") setErrorFirst(false); // اگر مقدار معتبر شد، خطا پاک شود
                            }}
                            onBlur={() => handleBlur(firstName, setErrorFirst)}
                            className={`h-12 w-full px-4 vazir-medium text-[#909090] font-bold border rounded-xl transition-all duration-300 ease-in-out bg-white
        ${errorFirst ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
        focus:border-[#B9A278] focus:shadow-md focus:scale-105`}
                        />


                    </div>

                    <div className="col-span-12 sm:col-span-4 h-[50px]">
                        <input
                            placeholder="نام خانوادگی"
                            type="text"
                            value={lastName} // همیشه مقدار state را نمایش بده
                            onChange={(e) => {
                                setLastName(e.target.value);
                                if (e.target.value.trim() !== "") setErrorLast(false); // خطا پاک شود اگر مقدار معتبر شد
                            }}
                            onBlur={() => handleBlur(lastName, setErrorLast)}
                            className={`h-12 w-full px-4 vazir-medium text-[#909090] font-bold border rounded-xl transition-all duration-300 ease-in-out bg-white
        ${errorLast ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
        focus:border-[#B9A278] focus:shadow-md focus:scale-105`}
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
                            value={nationalCode} // همیشه مقدار state را نمایش بده
                            onChange={(e) => {
                                // فقط اعداد و حداکثر 10 رقم
                                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                                setNationalCode(value);
                                if (/^[1-9][0-9]{0,9}$/.test(value)) setErrorNationalCode(false); // خطا پاک شود اگر مقدار معتبر شد
                            }}
                            onBlur={() => {
                                const isValid = /^[1-9][0-9]{9}$/.test(nationalCode);
                                setErrorNationalCode(!isValid);
                            }}
                            className={`h-12 w-full px-4 vazir-medium text-[#909090] font-bold border rounded-xl transition-all duration-300 ease-in-out bg-white
        ${errorNationalCode ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
        focus:border-[#B9A278] focus:shadow-md focus:scale-105`}
                        />


                    </div>

                    <div className="col-span-12 sm:col-span-4 h-[50px]">
                        <input
                            placeholder="شماره همراه"
                            type="text"
                            value={phone} // همیشه مقدار state را نمایش بده
                            onChange={(e) => {
                                // فقط اعداد و حداکثر 11 رقم
                                const value = e.target.value.replace(/\D/g, "").slice(0, 11);
                                setPhone(value);
                                if (/^[1-9][0-9]{0,10}$/.test(value)) setErrorPhone(false); // خطا پاک شود اگر مقدار معتبر شد
                            }}
                            onBlur={() => {
                                const isValid = /^[1-9][0-9]{10}$/.test(phone);
                                setErrorPhone(!isValid);
                            }}
                            className={`h-12 w-full px-4 vazir-medium text-[#909090] font-bold border rounded-xl transition-all duration-300 ease-in-out bg-white
        ${errorPhone ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
        focus:border-[#B9A278] focus:shadow-md focus:scale-105`}
                        />


                    </div>

                    <div className="col-span-12 sm:col-span-4 h-[57px] flex flex-wrap items-center gap-2">
                        <span className="vazir-medium text-[#909090] w-full sm:w-auto">تاریخ تولد</span>

                        <input
                            type="number"
                            placeholder="روز"
                            value={day} // مقدار پاک نمی شود
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "").slice(0, 2);
                                setDay(value);
                                if (+value >= 1 && +value <= 31) setErrorDayField(false); // اگر معتبر شد، خطا پاک شود
                            }}
                            onBlur={() => {
                                const isValid = day && +day >= 1 && +day <= 31;
                                setErrorDayField(!isValid);
                            }}
                            className={`w-[81px] h-[50px] border rounded-xl px-2 text-center vazir-medium text-[14px] text-[#909090] bg-white transition-all duration-300 ease-in-out
        ${errorDayField ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
        focus:border-[#B9A278] focus:shadow-md focus:scale-105`}
                        />



                        <select
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            onBlur={handleMonthBlur}
                            className={`w-[81px] h-[50px] border rounded-xl px-2 text-center vazir-medium text-[14px] text-[#909090] bg-white transition-all duration-300 ease-in-out
          ${errorMonthField ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
          focus:border-[#B9A278] focus:shadow-md focus:scale-105
          appearance-none`}
                        >
                            <option value="">ماه</option>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>

                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            onBlur={handleYearBlur}
                            className={`w-[81px] h-[50px] border rounded-xl px-2 text-center vazir-medium text-[14px] text-[#909090] bg-white transition-all duration-300 ease-in-out
        ${errorYear ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
        focus:border-[#B9A278] focus:shadow-md focus:scale-105 appearance-none`}
                        >
                            <option value="">سال</option>
                            {Array.from({ length: 105 }, (_, i) => i + 1300).map((yr) => (
                                <option key={yr} value={yr}>{yr}</option>
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
                            <input
                                type="number"
                                placeholder="فرزند دختر"
                                value={errorDaughters ? "" : daughters} // اگر خطا هست، خالی نمایش بده
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, ""); // فقط عدد
                                    if (+value <= 10) setDaughters(value); // فقط عدد ≤ 10 ذخیره شود
                                }}
                                onBlur={() => {
                                    const isValid = daughters !== "" && +daughters >= 0 && +daughters <= 10;
                                    setErrorDaughters(!isValid);
                                    if (!isValid) setDaughters(""); // در صورت خطا، پاک شود
                                }}
                                className={`h-full w-full px-4 vazir-medium text-[#909090] border rounded-xl transition-all duration-300 ease-in-out
        ${errorDaughters ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
        focus:border-[#B9A278] focus:shadow-md focus:scale-105 bg-white`}
                            />

                        </label>
                    </div>

                    <div className="col-span-12 sm:col-span-4 h-[50px] relative">
                        <label className="w-full relative">
                            <input
                                type="number"
                                placeholder="فرزند پسر"
                                value={errorSons ? "" : sons} // اگر خطا هست، خالی نمایش بده
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, ""); // فقط عدد
                                    if (+value <= 10) setSons(value); // فقط عدد ≤ 10 ذخیره شود
                                }}
                                onBlur={() => {
                                    const isValid = sons !== "" && +sons >= 0 && +sons <= 10;
                                    setErrorSons(!isValid);
                                    if (!isValid) setSons(""); // در صورت خطا، پاک شود
                                }}
                                className={`h-full w-full px-4 vazir-medium text-[#909090] border rounded-xl transition-all duration-300 ease-in-out
        ${errorSons ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
        focus:border-[#B9A278] focus:shadow-md focus:scale-105 bg-white`}
                            />

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
                                <input
                                    type="number"
                                    placeholder="استان"
                                    value={provinceCode}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, ""); // فقط عدد
                                        setProvinceCode(value);

                                        // بررسی زنده خطا هنگام تایپ
                                        const isValid = value !== "" && +value >= 10 && +value <= 99;
                                        setErrorProvince(!isValid);
                                    }}
                                    onBlur={() => {
                                        const isValid = provinceCode !== "" && +provinceCode >= 10 && +provinceCode <= 99;
                                        setErrorProvince(!isValid);
                                    }}
                                    className={`h-full w-full px-4 vazir-medium text-[#909090] border rounded-xl transition-all duration-300 ease-in-out
        ${errorProvince ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
        focus:border-[#B9A278] focus:shadow-md focus:scale-105 bg-white text-center`}
                                />



                            </label>
                        </div>
                        <div className="col-span-6 sm:col-span-3 h-[50px] relative">
                            <label className="w-full relative">
                                <input
                                    type="number"
                                    placeholder="128"
                                    value={threeDigitCode}
                                    onChange={(e) => {
                                        // فقط عدد و حداکثر 3 رقم
                                        const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                                        setThreeDigitCode(value);
                                    }}
                                    onBlur={() => {
                                        const isValid = threeDigitCode.length === 3 && !threeDigitCode.includes("0");
                                        setErrorThreeDigit(!isValid);
                                    
                                    }}
                                    className={`h-full w-full px-4 vazir-medium text-[#909090] border rounded-xl transition-all duration-300 ease-in-out text-center
        ${errorThreeDigit ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
        focus:border-[#B9A278] focus:shadow-md focus:scale-105 bg-white`}
                                />

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
                                <input
                                    type="number"
                                    placeholder="کد دو رقمی"
                                    value={twoDigitCode} // همیشه مقدار استیت
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "").slice(0, 2);
                                        setTwoDigitCode(value);

                                        // اگر مقدار وارد شده هنوز نامعتبر بود، خطا بده
                                        const isValid = value && !value.includes("0") && value.length <= 2;
                                        setErrorTwoDigit(!isValid);
                                    }}
                                    onBlur={() => {
                                        // بررسی نهایی هنگام ترک فیلد
                                        const isValid = twoDigitCode && !twoDigitCode.includes("0") && twoDigitCode.length <= 2;
                                        setErrorTwoDigit(!isValid);
                                    }}
                                    className={`h-full w-full px-4 vazir-medium text-[#909090] border rounded-xl transition-all duration-300 ease-in-out
    ${errorTwoDigit ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
    focus:border-[#B9A278] focus:shadow-md focus:scale-105 bg-white text-center`}
                                />
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
    disabled={transportHistory !== "has"}
    className={`h-full w-full px-4 vazir-medium text-[#909090] border rounded-xl focus:outline-none appearance-none transition-all duration-300 ease-in-out
        ${transportHistory !== "has" ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
>
    <option value="">سابقه در سال</option>

    {/* گزینه‌های 1 تا 5 */}
    {Array.from({ length: 5 }, (_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1} سال</option>
    ))}

    {/* گزینه بیشتر از 5 سال */}
    <option value="more">بیشتر از ۵ سال</option>
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
                                disabled={schoolService !== '1'} // فعال فقط وقتی schoolService برابر '1' است
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className={`vazir-medium text-[14px] ${schoolService !== '1' ? "text-gray-400" : "text-[#909090]"}`}>
                                صبح
                            </span>
                        </label>

                        <label className="flex-1 flex flex-col gap-2 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="serviceType"
                                value="afternoon"
                                checked={serviceType === "afternoon"}
                                onChange={() => setServiceType("afternoon")}
                                disabled={schoolService !== '1'} // فعال فقط وقتی schoolService برابر '1' است
                                className="w-5 h-5 border-gray-300 accent-blue-600"
                            />
                            <span className={`vazir-medium text-[14px] ${schoolService !== '1' ? "text-gray-400" : "text-[#909090]"}`}>
                                عصر
                            </span>
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
                                        <option key={province.id} value={province.id}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                                <FaChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#909090] pointer-events-none" />
                            </label>
                        </div>

                        {/* انتخاب شهر */}
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
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                                <FaChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#909090] pointer-events-none" />
                            </label>
                        </div>
                        <div className="col-span-12 relative">
                            <div className={`col-span-12 mt-4 relative rounded-xl transition-all duration-300 ease-in-out
  ${errorAddress ? "border-2 border-red-600 animate-shake" : "border border-[#909090]"}
  focus-within:border-[#B9A278] focus-within:shadow-md focus-within:border-[#B9A278] focus-within:shadow-md focus-within:scale-105 bg-white border border-1`}
                            >
                                <textarea
                                    placeholder="آدرس"
                                    value={address}
                                    onChange={handleAddressChange}
                                    onBlur={handleAddressBlur}
                                    className="w-full h-[140px] px-4 py-2 vazir-medium text-[#909090]  resize-none bg-transparent outline-none "
                                />
                            </div>

                        </div>

                        <div className="col-span-12 h-[50px] grid grid-cols-12 gap-4">
                            <div className="col-span-12 sm:col-span-6">
                                <input
                                    type="text"
                                    placeholder="طبقه"
                                    value={floor}
                                    onChange={(e) => {
                                        setFloor(e.target.value);
                                        if (e.target.value.trim() !== "") setErrorFloor(false); // اگر مقدار معتبر شد، خطا پاک شود
                                    }}
                                    onBlur={() => {
                                        setErrorFloor(floor.trim() === ""); // اگر خالی بود خطا بده
                                    }}
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
                                    onChange={(e) => {
                                        setUnit(e.target.value);
                                        if (e.target.value.trim() !== "") setErrorUnit(false); // اگر معتبر شد، خطا پاک شود
                                    }}
                                    onBlur={() => {
                                        setErrorUnit(unit.trim() === ""); // اگر خالی بود، خطا بده
                                    }}
                                    className={`w-full h-full px-4 vazir-medium text-[#909090] border rounded-xl bg-white
      focus:border-[#B9A278] focus:shadow-md focus:scale-105 outline-none transition-all duration-300 ease-in-out
      ${errorUnit ? "border-2 border-red-600 animate-shake" : "border-[#909090]"}`}
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
                                <label className="flex flex-col items-center justify-center w-full h-full relative">
                                    <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center mb-2 hover:bg-blue-50 transition-colors duration-200 relative overflow-hidden">
                                        {doc.state ? (
                                            <>
                                                <motion.img
                                                    key={doc.state.name}
                                                    src={URL.createObjectURL(doc.state)}
                                                    alt={doc.name}
                                                    className="w-full h-full object-cover rounded-xl"
                                                    initial={{ opacity: 0, scale: 0.7 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                />

                                                {/* دکمه حذف با انیمیشن */}
                                                <motion.button
                                                    type="button"
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1.5 shadow-md"
                                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        doc.setState(null);
                                                    }}
                                                >
                                                    <IoTrash className="text-sm" />
                                                </motion.button>
                                            </>
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
                    <div className="col-span-12 mt-12 vazir-light text-[#676767] font-bold text-[14px] gap-4"></div>
                    {/* فیلد رمز عبور */}
                    <div className="col-span-12 sm:col-span-4 h-[50px]">
                        <input
                            placeholder="رمز عبور"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (e.target.value.trim() !== "") setErrorPassword(false);
                            }}
                            onBlur={() => handleBlur(password, setErrorPassword)}
                            className={`h-12 w-full px-4 vazir-medium text-[#909090] font-bold border rounded-xl transition-all duration-300 ease-in-out bg-white
      ${errorPassword ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
      focus:border-[#B9A278] focus:shadow-md focus:scale-105`}
                        />
                    </div>

                    {/* فیلد تکرار رمز عبور */}
                    <div className="col-span-12 sm:col-span-4 h-[50px]">
                        <input
                            placeholder="تکرار رمز عبور"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                if (e.target.value.trim() !== "") setErrorConfirm(false);
                            }}
                            onBlur={() => handleBlur(confirmPassword, setErrorConfirm)}
                            className={`h-12 w-full px-4 vazir-medium text-[#909090] font-bold border rounded-xl transition-all duration-300 ease-in-out bg-white
      ${errorConfirm ? "border-2 border-red-600 animate-shake" : "border-[#909090]"} 
      focus:border-[#B9A278] focus:shadow-md focus:scale-105`}
                        />
                    </div>

                    {/* دکمه ذخیره رمز عبور */}
                    <div className="col-span-12 sm:col-span-4 h-[50px]">
                        <button
                            type="submit"
                            className="h-12 w-full px-4 vazir-medium text-[#909090] font-bold border border-[#909090] rounded-xl transition-all duration-300 ease-in-out bg-gray-200
       hover:text-white focus:scale-105 focus:shadow-md"
                        >
                            ذخیره اطلاعات
                        </button>
                    </div>

                </div>
            </form>
        </div>
    )
}