// App.jsx
import { useState } from "react";
import { Container } from "./components/Container";
import { SideBar } from "./components/SideBar";
import DriversManager from "./components/ManagerDrivers";
import { BrowserRouter, Route, Routes } from "react-router";
import { Contnet } from "./components/Content";
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex bg-[#f5f5f5] w-full">
        <SideBar isOpen={sidebarOpen} />
        <Container setSidebarOpen={setSidebarOpen}>
          <Routes>
            <Route path="/" element={<Contnet/>} />
            <Route path="/drivers" element={<DriversManager/>} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
