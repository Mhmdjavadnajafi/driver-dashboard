import DriverTableBody from "./DriverTableBody.jsx";
import DriverTableHeader from "./HeaderDriverTable.jsx";
export default function DriverTable(){
    return(
        <div className="h-130 col-span-12 grid grid-cols-12 border border-gray-400 rounded-xl p-5">
            <div className="col-span-12">
                <div className="vazir-light relative right-6 text-[#676767] font-bold text-[14px]">رانندگان</div>
                <DriverTableHeader />
                <DriverTableBody />
            </div>
            
        </div>
    )
}