// components/Container.jsx
import { Contnet } from "./Content";
import { Navbar } from "./Navbar";

export function Container({ setSidebarOpen }) {
    return (
        <div className="h-full w-full flex flex-col">
            <Navbar setSidebarOpen={setSidebarOpen} />
            <Contnet />
        </div>
    );
}
