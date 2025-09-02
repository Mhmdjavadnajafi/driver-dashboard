import { ProfileButton } from "./ProfileButton";

export default function DriverTableBody({ id,name, lastName, numberPhone, codeMelli, gender, history, profile, message, action }) {
    return (
        <div className="grid grid-cols-12 my-6 text-center col-span-12 flex items-center">
            <div className="col-span-1 vazir-light text-[#676767] font-bold text-[14px]">{id}</div>
            <div className="col-span-1 vazir-light text-[#676767] font-bold text-[14px]">{name}</div>
            <div className="col-span-1 text-center vazir-light text-[#676767] font-bold text-[14px]">{lastName}</div>
            <div className="col-span-2 text-center vazir-light text-[#676767] font-bold text-[14px]">{numberPhone}</div>
            <div className="col-span-1 vazir-light text-[#676767] font-bold text-[14px]">{codeMelli}</div>
            <div className="col-span-1 vazir-light text-[#676767] font-bold text-[14px]">{gender}</div>
            <div className="col-span-1 vazir-light text-[#676767] font-bold text-[14px]">1</div>
            <div className="col-span-1 vazir-light text-[#676767] font-bold text-[14px]">{history}</div>
            <div className="col-span-1 vazir-light text-[#676767] font-bold text-[14px]">{profile}</div>
            <div className="col-span-1 text-center vazir-light text-[#676767] font-bold text-[14px]">{message}</div>
            <div className="col-span-1 cursor-pointer text-center vazir-light text-[#676767] font-bold text-[14px]">{action}</div>
        </div>
    )
}