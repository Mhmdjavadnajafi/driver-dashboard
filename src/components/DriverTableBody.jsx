import { ProfileButton } from "./ProfileButton";

export default function DriverTableBody() {
    return (
        <div className="grid grid-cols-12 my-6 text-center col-span-12 flex items-center">
            <div className="col-span-1 vazir-light text-[#676767] font-bold text-[14px]">1</div>
            <div className="col-span-1 vazir-light text-[#676767] font-bold text-[14px]">محمد جواد</div>
            <div className="col-span-1 text-center vazir-light text-[#676767] font-bold text-[14px]">نجفی</div>
            <div className="col-span-2 text-center vazir-light text-[#676767] font-bold text-[14px]">09335592802</div>
            <div className="col-span-1 vazir-light text-[#676767] font-bold text-[14px]">4061377671</div>
            <div className="col-span-1 vazir-light text-[#676767] font-bold text-[14px]">مرد</div>
            <div className="col-span-1 vazir-light text-[#676767] font-bold text-[14px]">2</div>
            <div className="col-span-1 vazir-light text-[#676767] font-bold text-[14px]">3 سال</div>
            <div className="col-span-1 vazir-light text-[#676767] font-bold text-[14px]"><ProfileButton></ProfileButton></div>
            <div className="col-span-1 text-center vazir-light text-[#676767] font-bold text-[14px]"><ProfileButton></ProfileButton></div>
            <div className="col-span-1 cursor-pointer text-center vazir-light text-[#676767] font-bold text-[14px]"><ProfileButton></ProfileButton></div>
        </div>
    )
}