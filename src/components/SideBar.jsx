export function SideBar() {
    return (
        <div id="sidebar" className="w-[235px] flex flex-col items-center pt-3 border border-gray-500
    fixed top-0 right-0 md:relative md:top-auto md:right-auto ">
            <div className="font-bold text-gray-500 text-[30px] text-center mb-4 vazir-bold w-full border-b pb-2">
                TDA24.IR
            </div>
            <ul className="w-full py-2 h-full">
                <li className="w-4/5 mx-auto text-[14px] font-bold py-2 px-6 rounded-xl text-[#676767] bg-gray-200 vazir-light">
                    ایجاد کاربر راننده
                </li>
            </ul>
        </div>
    );
}