// components/Navbar.jsx
import { CgMenuRight } from "react-icons/cg";
import BigLogo from '../assets/images/BigLogo.png'
import { FaUser } from "react-icons/fa";
import { UserDropdown } from "./UserDropdown";

export function Navbar({ setSidebarOpen }) {
    return (
        <header className="w-full bg-white py-3 px-10 shadow-lg">
            <div className="mx-auto">
                <nav className="h-14 flex items-center justify-between">
                    <div
                        className="rounded-xl cursor-pointer"
                        onClick={() => setSidebarOpen(prev => !prev)}
                    >
                        <CgMenuRight className="text-[#B9A278] text-[30px]" />
                    </div>
                    <div className="flex items-center gap-10">
                        <UserDropdown/>
                        <img className="h-10 w-auto" src={BigLogo} alt="Logo" />
                    </div>
                    
                </nav>
            </div>
        </header>
    );
}
