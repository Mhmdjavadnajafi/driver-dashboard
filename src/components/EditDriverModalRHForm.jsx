// EditDriverModalCompactNumbers.jsx
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { decryptData } from "./tokenStorage.js";
import CustomInput from "./TextInput";
import CustomInputNumber from "./CustomInputNumber.jsx";
import CustomInputNumberPhone from "./CustomInputNumberPhone";
import CustomRadioGroup from "./CustomRadioGroup.jsx";
import CustomInputBoxNumber from "./CustomInputBoxNumber.jsx";
import CustomCarType from "./CustomCar.jsx";
import CustomInputBoxCarName from "./carName.jsx";
import CarPlateInput from "./CarPlateInput";
import TransportHistoryRadio from "./TransportHistoryRadio";
import TransportYearsSelect from "./TransportYearsSelect";

const dayOptions = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
const letters = ["الف", "ب", "پ", "ت", "ث", "ج", "چ", "ح", "خ", "د", "ذ", "ر", "ز", "ژ", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ک", "گ", "ل", "م", "ن", "و", "ه", "ی"];

export default function EditDriverModalCompactNumbers({ driver, onClose, onUpdate }) {
    const [firstName, setFirstName] = useState(driver.firstName);
    const [lastName, setLastName] = useState(driver.lastName);
    const [nationalCode, setNationalCode] = useState(driver.nationalCode);
    const [phone, setPhone] = useState(driver.phoneNumber);
    const [sons, setSons] = useState(driver.numSons || 0);
    const [daughters, setDaughters] = useState(driver.numDaughters || 0);
    const [errorFirst, setErrorFirst] = useState("");
    const [errorLast, setErrorLast] = useState("");
    const [errorNationalCode, setErrorNationalCode] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const [errorSons, setErrorSons] = useState("");
    const [errorDaughters, setErrorDaughters] = useState("");
    const [errorProvince, setErrorProvince] = useState("");
    const [errorThreeDigit, setErrorThreeDigit] = useState("");
    const [errorTwoDigit, setErrorTwoDigit] = useState("");

    const [provinceCode, setProvinceCode] = useState("");
    const [letter, setLetter] = useState("");
    const [threeDigitCode, setThreeDigitCode] = useState("");
    const [twoDigitCode, setTwoDigitCode] = useState("");

    useEffect(() => {
        if (driver.vehiclePlate) {
            const plate = driver.vehiclePlate.replace(/\s/g, "");

            const twoDigits = plate.slice(0,2);
            const threeDigits = plate.slice(3,6); 
            const letterPart = plate[2] 
            const province = plate.slice(6);

            setProvinceCode(province);
            setLetter(letterPart);
            setThreeDigitCode(threeDigits);
            setTwoDigitCode(twoDigits);
        }
    }, [driver.vehiclePlate]);

    const [transportHistory, setTransportHistory] = useState(driver.hasTransportExperience || false);
    const [transportYears, setTransportYears] = useState(driver.transportYears || 0);

    const { register, handleSubmit, control, watch, setValue, formState: { isSubmitting } } = useForm({
        defaultValues: {
            gender: driver.gender,
            maritalStatus: driver.maritalStatus,
            hasChildren: driver.hasChildren,
            vehicleType: driver.vehicleType,
            vehicleName: driver.vehicleName,
            serviceCount: driver.serviceCount,
            serviceTime: driver.serviceTime,
            workDays: driver.workDays || [],
        }
    });

    const genderValue = watch("gender");
    const maritalValue = watch("maritalStatus");

    const onSubmit = async (data) => {
        if (!firstName) return setErrorFirst("نام الزامی است");
        if (!lastName) return setErrorLast("نام خانوادگی الزامی است");
        if (!nationalCode || nationalCode.length !== 10) return setErrorNationalCode("کد ملی باید ۱۰ رقم باشد");
        if (!phone || phone.length !== 11) return setErrorPhone("شماره همراه باید ۱۱ رقم باشد");
        if (!provinceCode || !letter || !threeDigitCode || !twoDigitCode) return setErrorProvince("پلاک ناقص است");

        try {
            const tokens = decryptData(localStorage.getItem("encryptedTokens"));
            if (!tokens?.accessToken) throw new Error("توکن موجود نیست");

            const payload = {
                ...driver,
                firstName,
                lastName,
                nationalCode,
                phoneNumber: phone,
                numSons: Number(sons),
                numDaughters: Number(daughters),
                hasChildren: Boolean(data.hasChildren),
                gender: data.gender,
                maritalStatus: data.maritalStatus,
                vehicleType: data.vehicleType,
                vehicleName: data.vehicleName,
                vehiclePlate: `${twoDigitCode}${letter}${threeDigitCode}${provinceCode}`,
                serviceCount: Number(data.serviceCount || 0),
                serviceTime: data.serviceTime,
                workDays: Array.isArray(data.workDays) ? data.workDays : [],
                hasTransportExperience: transportHistory,
                transportExperienceDescription: `${transportYears} سال سابقه کاری`,
            };

            const response = await axios.put(
                `https://api.tda24.ir/api/core_admin/admin/drivers/${driver.id}/`,
                payload,
                { headers: { Authorization: `Bearer ${tokens.accessToken}` } }
            );

            onUpdate(response.data);
            onClose();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-auto">
            <div className="bg-white p-3 rounded-2xl shadow-xl w-full max-w-7xl h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-3 text-gray-800">ویرایش راننده</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">

                    <div className="grid grid-cols-12 gap-4">
                        <CustomInput value={firstName} setValue={setFirstName} error={errorFirst} setError={setErrorFirst} placeholder="نام" />
                        <CustomInput value={lastName} setValue={setLastName} error={errorLast} setError={setErrorLast} placeholder="نام خانوادگی" />
                        <CustomInputNumber value={nationalCode} setValue={setNationalCode} error={errorNationalCode} setError={setErrorNationalCode} placeholder="کد ملی" type="nationalCode" maxLength={10} />
                        <CustomInputNumberPhone value={phone} setValue={setPhone} error={errorPhone} setError={setErrorPhone} placeholder="شماره همراه" mode="phone" />
                        <CustomRadioGroup label="جنسیت" name="gender" value={genderValue} setValue={(val) => setValue("gender", val)} options={[{ value: "male", label: "آقا" }, { value: "female", label: "خانم" }]} />
                        <CustomRadioGroup label="وضعیت تأهل" name="maritalStatus" value={maritalValue} setValue={(val) => setValue("maritalStatus", val)} options={[{ value: "single", label: "مجرد" }, { value: "married", label: "متأهل" }]} />
                        <CustomInputBoxNumber placeholder="فرزند پسر" value={sons} setValue={setSons} error={errorSons} setError={setErrorSons} max={10} min={0} />
                        <CustomInputBoxNumber placeholder="فرزند دختر" value={daughters} setValue={setDaughters} error={errorDaughters} setError={setErrorDaughters} max={10} min={0} />
                        <TransportHistoryRadio transportHistory={transportHistory} setTransportHistory={setTransportHistory} />
                        <TransportYearsSelect transportHistory={transportHistory} transportYears={transportYears} setTransportYears={setTransportYears} />
                        <Controller name="vehicleType" control={control} defaultValue={driver.vehicleType || ""} render={({ field }) => <CustomCarType carType={field.value} setCarType={field.onChange} />} />
                        <Controller name="vehicleName" control={control} defaultValue={driver.vehicleName || ""} render={({ field }) => <CustomInputBoxCarName value={field.value} setValue={field.onChange} placeholder="نام خودرو" />} />
                        <CarPlateInput
                            provinceCode={provinceCode} setProvinceCode={setProvinceCode} errorProvince={errorProvince} setErrorProvince={setErrorProvince}
                            letter={letter} setLetter={setLetter} letters={letters}
                            threeDigitCode={threeDigitCode} setThreeDigitCode={setThreeDigitCode} errorThreeDigit={errorThreeDigit} setErrorThreeDigit={setErrorThreeDigit}
                            twoDigitCode={twoDigitCode} setTwoDigitCode={setTwoDigitCode} errorTwoDigit={errorTwoDigit} setErrorTwoDigit={setErrorTwoDigit}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <input {...register("serviceCount")} type="number" placeholder="تعداد سرویس" className="border px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <input {...register("serviceTime")} placeholder="زمان سرویس" className="border px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1 font-semibold">روزهای کاری</label>
                        <Controller control={control} name="workDays" render={({ field }) => (
                            <div className="flex flex-wrap gap-2">
                                {dayOptions.map(day => (
                                    <label key={day} className="flex items-center gap-1 border px-2 py-1 rounded-lg cursor-pointer select-none hover:bg-blue-100">
                                        <input type="checkbox" value={day} checked={field.value.includes(day)} onChange={e => {
                                            const newValue = e.target.checked ? [...field.value, day] : field.value.filter(d => d !== day);
                                            field.onChange(newValue);
                                        }} className="w-4 h-4" />
                                        {day}
                                    </label>
                                ))}
                            </div>
                        )} />
                    </div>

                    <div className="flex justify-end gap-2 mt-3">
                        <button type="button" onClick={onClose} className="px-4 py-1 border rounded-lg hover:bg-gray-100 transition">لغو</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
