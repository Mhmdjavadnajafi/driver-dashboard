// components/Container.jsx
import { Navbar } from "./Navbar";

export function Container({ setSidebarOpen, children }) {
    return (
        <div className="h-full w-full flex flex-col no-scroll-gutter">
            <Navbar setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 p-4">
                {children} 
            </main>
        </div>
    );
}
