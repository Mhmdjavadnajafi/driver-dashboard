import TextBoxSearch from "./searchBoxText.jsx";
import SectionSearch from "./sectionSearch.jsx";
import DriverTable from "./DriversList.jsx";

export default function DriversManager() {
    return (
        <div className="flex-1 h-full py-3 mt-5 px-8">
            <div className="vazir-light text-[#676767] font-bold text-[14px]">مدیریت رانندگان</div>
            <div className="grid grid-cols-12 my-10 gap-4">
                <TextBoxSearch></TextBoxSearch>
                <SectionSearch></SectionSearch>
                <DriverTable />
            </div>
        </div>
    )
}