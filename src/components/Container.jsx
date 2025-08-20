import { Contnet } from "./Content";
import { Navbar } from "./Navbar";
export function Container() {
    return (
        <div className="min-h-screen w-full">
            <Navbar></Navbar>
            <Contnet></Contnet>
        </div>
    );
}