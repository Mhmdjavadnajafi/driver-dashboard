import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";
import { Container } from "./Container";

export function ProtectedLayout({ sidebarOpen, setSidebarOpen }) {
    return (
        <div className="flex bg-[#f5f5f5] w-full">
            <SideBar isOpen={sidebarOpen} />
            <Container setSidebarOpen={setSidebarOpen}>
                <Outlet />
            </Container>
        </div>
    );
}
