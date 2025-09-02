import { useEffect, useState, useCallback } from "react";
import { motion,AnimatePresence} from "framer-motion";
import axios from "axios";
import { decryptData } from "./tokenStorage.js";
import { FaChevronDown } from "react-icons/fa6";
import { provinces, cities } from "../assets/satae2";
import MAP from "./Map";
import { LuPlus } from "react-icons/lu";
import { LuCheck } from "react-icons/lu"
import { IoCheckmark } from "react-icons/io5";
import { IoTrash } from "react-icons/io5";
import CustomInput from "./TextInput";
import CustomRadioGroup from "./CustomRadioGroup";
import CustomInputNumber from "./CustomInputNumber";
import CustomInputNumberPhone from "./CustomInputNumberPhone";
import CustomDateSelect from "./CustomDateSelect";
import CustomInputBoxNumber from "./CustomInputBoxNumber";
import CustomCarType from "./CustomCar";
import CarPlateInput from "./CarPlateInput";
import TransportHistoryRadio from "./TransportHistoryRadio";
import TransportYearsSelect from "./TransportYearsSelect";
import PassengerTypeRadio from "./PassengerTypeRadio";
import SchoolServiceRadio from "./SchoolServiceRadio";
import SchoolServiceTypeRadio from "./SchoolServiceTypeRadio";
import MisuseHistoryRadio from "./MisuseHistoryRadio";
import WorkDaysCheckbox from "./WeekDaysSelector";
import CitySelect from "./CitySelect";
import ProvinceSelect from "./ProvinceSelect";
import AddressTextarea from "./AddressTextarea";
import FloorUnitInput from "./FloorUnitInput";
import DocumentGrid from "./DocumentGrid";
import SelectableService from "./SelectableService";
import SelectableCategories from "./SelectableCategories";
import SelectableAllCategories from "./SelectableAllCategories";
import ValidatedInput from "./ValidatedInput";
import FancyAlert from "./Fancyalert.jsx";
import CustomInputBoxCarName from "./carName.jsx";
import {  ModalMessgae } from "./ModalMessgae.jsx";
const citiesByProvince = provinces.reduce((acc, province) => {
    acc[province.id] = cities.filter(city => city.province_id === province.id);
    return acc;
}, {});

export default function Contnet() {
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
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState("success"); 
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const [alertDetails, setAlertDetails] = useState([]);
    const[MycarName,setCarName]=useState('')
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirm, setErrorConfirm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("success");
    useEffect(() => {
        const cities = selectedProvince ? citiesByProvince[selectedProvince.id] || [] : [];
        setCityList(cities);
        const defaultCity = cities.find(city => city.name === "خرم آباد");
        setSelectedCity(defaultCity || null);
    }, [selectedProvince]);
    const toggleDay = (day) => {
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };
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
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const tokens = decryptData(localStorage.getItem("encryptedTokens"));
            if (!tokens?.accessToken) throw new Error("توکن موجود نیست");

            const payload = {
                firstName,
                lastName,
                gender,
                birthDate:`${year}-${month}-${day}`,
                maritalStatus,
                hasChildren: Number(sons) + Number(daughters) > 0,
                numSons: Number(sons),
                numDaughters: Number(daughters),
                vehicleType: carType || "سواری",
                vehicleName: MycarName || "",
                vehiclePlate: twoDigitCode && letter && threeDigitCode && provinceCode ? `${twoDigitCode}${letter}${threeDigitCode} ${provinceCode}` : "",
                hasTransportExperience: transportHistory ?? false,
                transportExperienceDescription: transportHistory ? `دارای ${transportYears} سال سابقه کاری` : "",
                passengerType,
                serviceCount: schoolService?.toString() || "1",
                serviceTime: schoolService === 2 ? "صبح و عصر" : serviceType || "",
                substanceUseHistory: misuseHistory ?? false,
                workDays: selectedDays?.length > 0 ? selectedDays : ["شنبه"],
                homeLocation: { latitude: 33.4878, longitude: 48.3558, province: "", city: "", district: "", description: "" },
                serviceLocations: [
                    { latitude: 33.49, longitude: 48.36, province: "", city: "", district: "", description: "" },
                    { latitude: 33.495, longitude: 48.37, province: "", city: "", district: "", description: "" },
                    { latitude: 33.48, longitude: 48.35, province: "", city: "", district: "", description: "" }
                ],
                phoneNumber: phone,
                nationalCode,
                isActive: true
            };


            await axios.post(
                "https://api.tda24.ir/api/core_admin/admin/drivers/",
                payload,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokens.accessToken}`,
                    },
                }
            );
            console.log(payload)

            setModalMessage("درخواست با موفقیت ثبت شد!");
            setShowModal(true);
            setTimeout(() => setShowModal(false), 10000);
            setPhone(""); setNationalCode(""); setFirstName(""); setLastName(""); setGender("");
            setYear(""); setMonth(""); setDay(""); setCarType(""); setCarName("");
            setTwoDigitCode(""); setLetter(""); setThreeDigitCode(""); setMaritalStatus("");
            setSons(""); setDaughters(""); setTransportHistory(false); setTransportYears(0);
            setPassengerType(""); setSchoolService(""); setServiceType(""); setMisuseHistory(false);
            setSelectedDays([]);

        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                setModalMessage("اعتبار توکن تمام شده، دوباره وارد شوید.");
            } else {
                setModalMessage("خطا در ثبت درخواست یا اعتبارسنجی توکن");
            }
            setShowModal(true);
            setTimeout(() => setShowModal(false), 10000);
        }
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
                
                setSelectedCategories([]);
            } else {
              
                setSelectedCategories(categories.map((_, i) => i));
            }
        } else {
            let updated;
            if (selectedCategories.includes(index)) {
                updated = selectedCategories.filter((i) => i !== index);
            } else {
                updated = [...selectedCategories, index];
            }

            if (
                updated.length === categories.length - 1 &&
                !updated.includes(categories.length - 1)
            ) {
                updated = [...updated, categories.length - 1];
            }

          
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
                setActiveCategories([]);
            } else {
                setActiveCategories(allCategories.map((_, i) => i));
            }
        } else {
            let updated;
            if (activeCategories.includes(index)) {
                updated = activeCategories.filter((i) => i !== index);
            } else {
                updated = [...activeCategories, index];
            }

          
            if (
                updated.length === allCategories.length - 1 &&
                !updated.includes(allCategories.length - 1)
            ) {
                updated = [...updated, allCategories.length - 1];
            }

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
   
    return (
        <div className="flex-1 h-full py-3 mt-5 px-5">
            <div className="vazir-light text-[#676767] font-bold text-[14px]">ایجاد کاربر راننده</div>
            <form className="w-[100%] mt-10 mx-auto rounded-xl">
                <div className="grid grid-cols-12 gap-4 my-4">
                    <div className="col-span-12 gap-3 py-5 grid grid-cols-12 bg-white p-3 rounded-xl">
                        <div className="col-span-12 my-4">
                            <div className="vazir-light text-[#676767] font-bold text-[14px]">اطلاعات پایه</div>
                        </div>
                        <CustomInput
                            value={firstName}
                            setValue={setFirstName}
                            error={errorFirst}
                            setError={setErrorFirst}
                            placeholder="نام"
                        />

                        <CustomInput
                            value={lastName}
                            setValue={setLastName}
                            error={errorLast}
                            setError={setErrorLast}
                            placeholder="نام خانوادگی"
                        />

                        <CustomRadioGroup
                            label="جنسیت"
                            name="gender"
                            value={gender}
                            setValue={setGender}
                            options={[
                                { value: "male", label: "آقا" },
                                { value: "female", label: "خانم" },
                            ]}
                        />

                        <CustomInputNumber
                            placeholder="کد ملی"
                            value={nationalCode}
                            setValue={setNationalCode}
                            error={errorNationalCode}
                            setError={setErrorNationalCode}
                            type="nationalCode"
                            maxLength={10}
                        />


                        <CustomInputNumberPhone
                            placeholder="شماره همراه"
                            value={phone}
                            setValue={setPhone}
                            error={errorPhone}
                            setError={setErrorPhone}
                            mode="phone"
                        />
                        <CustomDateSelect
                            day={day}
                            setDay={setDay}
                            month={month}
                            setMonth={setMonth}
                            year={year}
                            setYear={setYear}
                            errorDay={errorDayField}
                            setErrorDay={setErrorDayField}
                            errorMonth={errorMonthField}
                            setErrorMonth={setErrorMonthField}
                            errorYear={errorYear}
                            setErrorYear={setErrorYear}
                        />

                        <CustomRadioGroup
                            label="وضعیت تأهل"
                            name="maritalStatus"
                            value={maritalStatus}
                            setValue={setMaritalStatus}
                            options={[
                                { value: "single", label: "مجرد" },
                                { value: "married", label: "متأهل" },
                            ]}
                        />
                        <CustomInputBoxNumber
                            placeholder="فرزند دختر"
                            value={daughters}
                            setValue={setDaughters}
                            error={errorDaughters}
                            setError={setErrorDaughters}
                            max={10}
                            min={0}
                        />
                        <CustomInputBoxNumber
                            placeholder="فرزند پسر"
                            value={sons}
                            setValue={setSons}
                            error={errorSons}
                            setError={setErrorSons}
                            max={10}
                            min={0}
                        />
                        <CustomInputBoxCarName value={MycarName} setValue={setCarName} placeholder="نام خودرو" />

                        <CustomCarType carType={carType} setCarType={setCarType} />
                        <CarPlateInput
                            provinceCode={provinceCode} setProvinceCode={setProvinceCode} errorProvince={errorProvince} setErrorProvince={setErrorProvince}
                            threeDigitCode={threeDigitCode} setThreeDigitCode={setThreeDigitCode} errorThreeDigit={errorThreeDigit} setErrorThreeDigit={setErrorThreeDigit}
                            letter={letter} setLetter={setLetter} letters={letters}
                            twoDigitCode={twoDigitCode} setTwoDigitCode={setTwoDigitCode} errorTwoDigit={errorTwoDigit} setErrorTwoDigit={setErrorTwoDigit}
                        />

                        <TransportHistoryRadio
                            transportHistory={transportHistory}
                            setTransportHistory={setTransportHistory}
                        />
                        <TransportYearsSelect
                            transportHistory={transportHistory}
                            transportYears={transportYears}
                            setTransportYears={setTransportYears}
                        />
                        <PassengerTypeRadio
                            passengerType={passengerType}
                            setPassengerType={setPassengerType}
                        />

                        <SchoolServiceRadio
                            schoolService={schoolService}
                            setSchoolService={setSchoolService}
                        />
                        <SchoolServiceTypeRadio
                            schoolService={schoolService}
                            serviceType={serviceType}
                            setServiceType={setServiceType}
                        />
                        <MisuseHistoryRadio
                            misuseHistory={misuseHistory}
                            setMisuseHistory={setMisuseHistory}
                        />
                        <WorkDaysCheckbox
                            daysOfWeek={daysOfWeek}
                            selectedDays={selectedDays}
                            toggleDay={toggleDay}
                        />
                 </div>
                    <div className="col-span-12 gap-3 mt-10 py-5 grid grid-cols-12 bg-white p-3 rounded-xl py-10">
                        <div className="col-span-12 mt-5 vazir-light text-[#676767] font-bold text-[14px] gap-4 ">
                            اطلاعات محل سکونت راننده
                        </div>
                        <div className="col-span-12 md:col-span-4 h-auto grid grid-cols-12 gap-4">
                            {/* انتخاب استان */}
                            <ProvinceSelect
                                provinces={provinces}
                                selectedProvince={selectedProvince}
                                setSelectedProvince={setSelectedProvince}
                                errorProvince={errorProvince}
                            />

                            <CitySelect
                                selectedProvince={selectedProvince}
                                cityList={cityList}
                                selectedCity={selectedCity}
                                setSelectedCity={setSelectedCity}
                                errorCity={errorCity}
                            />

                            <AddressTextarea
                                address={address}
                                setAddress={setAddress}
                                errorAddress={errorAddress}
                                setErrorAddress={setErrorAddress}
                            />


                            <FloorUnitInput
                                floor={floor}
                                setFloor={setFloor}
                                errorFloor={errorFloor}
                                setErrorFloor={setErrorFloor}
                                unit={unit}
                                setUnit={setUnit}
                                errorUnit={errorUnit}
                                setErrorUnit={setErrorUnit}
                            />


                        </div>
                        <div className="col-span-12 md:col-span-8 h-[400px] mt-4 md:mt-0">
                            <MAP />
                        </div>
                    </div>
                    <div className="col-span-12 gap-3 mt-10 py-5 grid grid-cols-12 bg-white p-3 rounded-xl py-10">
                        <div className="col-span-12 mb-5 vazir-light text-[#676767] font-bold text-[14px] gap-4">مدارک هویتی</div>
                        <DocumentGrid docs={docs} />
                    </div>
                    <div className="col-span-12 gap-3 mt-10 py-5 grid grid-cols-12 bg-white p-3 rounded-xl py-10">
                        <div className="col-span-12 mb-5 vazir-light text-[#676767] font-bold text-[14px] gap-4">ارائه خدمات در</div>
                        <SelectableService
                            docs={initialDocs}
                            selected={selected}
                            toggleSelect={toggleSelect}
                        />
                    </div>
                    <div className="col-span-12 gap-3 mt-10 py-5 grid grid-cols-12 bg-white p-3 rounded-xl py-10">
                        <div className="col-span-12 mb-5 vazir-light text-[#676767] font-bold text-[14px] gap-4">دریافت خدمات</div>
                        <SelectableCategories
                            categories={categories}
                            selectedCategories={selectedCategories}
                            toggleCategory={toggleCategory}
                        />
                   </div>
                    <div className="col-span-12 gap-3 mt-10 py-5 grid grid-cols-12 bg-white p-3 rounded-xl py-10">
                        <div className="col-span-12 mb-5 vazir-light text-[#676767] font-bold text-[14px] gap-4">تمایل حمل و نقل در بخش</div>
                        <SelectableAllCategories
                            allCategories={allCategories}
                            activeCategories={activeCategories}
                            handleToggleCategory={handleToggleCategory}
                        />
                   </div>
                    
                    <div className="col-span-12 mt-12 vazir-light text-[#676767] font-bold text-[14px] gap-4"></div>
                    {/* فیلد رمز عبور */}
                    <div className="col-span-12 sm:col-span-4 h-[50px]">
                        <ValidatedInput
                            placeholder="رمز عبور"
                            type="password"
                            value={password}
                            setValue={setPassword}
                            error={errorPassword}
                            setError={setErrorPassword}
                            handleBlur={handleBlur}
                        />
                    </div>

                    <ValidatedInput
                        placeholder="تکرار رمز عبور"
                        type="password"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        error={errorConfirm}
                        setError={setErrorConfirm}
                        handleBlur={handleBlur}
                    />
                    <div className="col-span-12 sm:col-span-4 h-[50px]">
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleSave}
                            className="h-12 w-full sm:w-auto px-6 rounded-xl vazir-medium font-bold text-white
                   bg-gradient-to-r from-blue-800 to-gray-700
                   shadow-md hover:shadow-lg focus:outline-none
                   transition-all duration-300 ease-in-out"
                        >
                            ذخیره اطلاعات
                        </motion.button>
                       <ModalMessgae 
                            show={showModal}
                            type={modalType} 
                            message={modalMessage}
                            onClose={() => setShowModal(false)}
                            autoClose={10000} 
                        />
                    </div>
                    </div>
            </form>
        </div>
    )
}