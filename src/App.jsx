// App.jsx
import { useState } from "react";
import { Container } from "./components/Container";
import { SideBar } from "./components/SideBar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-[#f5f5f5]">
      <SideBar isOpen={sidebarOpen} />
      <Container setSidebarOpen={setSidebarOpen} />
    </div>
  );
}

export default App;
