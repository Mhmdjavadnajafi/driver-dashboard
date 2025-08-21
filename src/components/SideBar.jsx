import { BiCategory, BiUser } from "react-icons/bi";
import { LuWalletCards } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FaRegCalendar } from "react-icons/fa";
import Logo from '../assets/images/Untitled-2 3 (2).png'
export function SideBar({ isOpen }) {
    const menuItems = [
        { icon: <BiCategory />, text: "ایجاد کاربر راننده" },
        { icon: <BiUser />, text: "مدیریت رانندگان" },
    ];

    return (
        <div
            className={`h-full transition-all duration-300 ease-in-out vazir-medium
            ${isOpen ? "w-[235px]" : "w-[100px]"}
            bg-white border-r border-gray-300 shadow-[4px_0_8px_rgba(0,0,0,0.1)]`}
        >
            <div className="font-bold text-center mb-4 pt-3 pb-2">
                <img className="h-15 w-auto mx-auto my-3" src={Logo}></img>
            </div>
            <ul className="w-full h-full flex flex-col items-center mt-4 overflow-y-auto">
                {menuItems.map((item, idx) => (
                    <li
                        key={idx}
                        className={`flex items-center h-[50px] mb-2 rounded-xl px-3 transition-all  duration-300 ease-in-out
                        ${isOpen ? "justify-start w-[90%] gap-2" : "justify-center w-[60%]"}
                        ${idx === 0 ? "bg-[#B9A278] text-white" : "bg-[#F5F5F5] text-[#B9A278] hover:bg-[#e0d8b0]"}`}
                    >
                        <div className={`text-[20px] ${idx === 0 ? "text-white" : "text-[#B9A278]"}`}>
                            {item.icon}
                        </div>
                        <span
                            className={`transition-all duration-300 ease-in-out overflow-hidden font-bold text-[12px] ${isOpen
                                ? `opacity-100 ml-2 ${idx === 0 ? "text-white" : "text-[#333]"}`
                                : "opacity-0 w-0"
                                }`}
                        >
                            {item.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
