// DriverTable.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { decryptData } from "./tokenStorage.js";
import DriverTableBody from "./DriverTableBody.jsx";
import DriverTableHeader from "./HeaderDriverTable.jsx";
import { ProfileButton } from "./ProfileButton.jsx";
import { MessagingButton } from "./MessagingButton.jsx";
import { EditButton } from "./EditButton.jsx";
import EditDriverModalFull from "./EditDriverModalRHForm.jsx";

export default function DriverTable({ searchQuery }) {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingDriver, setEditingDriver] = useState(null);

    useEffect(() => {
        const getDrivers = async () => {
            try {
                const tokens = decryptData(localStorage.getItem("encryptedTokens"));
                if (!tokens?.accessToken) throw new Error("توکن موجود نیست");

                const api = axios.create({
                    baseURL: "https://api.tda24.ir/api/core_admin/admin/",
                    headers: { Authorization: `Bearer ${tokens.accessToken}` },
                });

                const response = await api.get("drivers/");
                setDrivers(response.data);
            } catch (err) {
                console.error("Error fetching drivers:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getDrivers();
    }, []);

    const filteredDrivers = drivers.filter(driver => {
        const fullName = `${driver.firstName} ${driver.lastName}`.toLowerCase();
        const phone = driver.phoneNumber.toLowerCase();
        const query = searchQuery.toLowerCase();
        return fullName.includes(query) || phone.includes(query);
    });
    return (
        <div className="h-130 bg-white col-span-12 grid grid-cols-12 border border-gray-400 rounded-xl p-5">
            <div className="col-span-12 overflow-y-auto">
                <div className="vazir-light relative right-6 text-[#676767] font-bold text-[14px]">
                    رانندگان
                </div>
                <DriverTableHeader />

                {filteredDrivers.map((driver, index) => (
                    <DriverTableBody
                        key={driver.id || index}
                        id={index + 1}
                        name={driver.firstName}
                        lastName={driver.lastName}
                        numberPhone={driver.phoneNumber}
                        codeMelli={driver.nationalCode}
                        gender={driver.gender === "female" ? "زن" : driver.gender === "male" ? "مرد" : driver.gender}
                        history={driver.transportExperienceDescription}
                        profile={<ProfileButton />}
                        message={<MessagingButton />}
                        action={<EditButton onClick={() => setEditingDriver(driver)} />}
                    />
                ))}
            </div>

            {editingDriver && (
                <EditDriverModalFull
                    driver={editingDriver}
                    onClose={() => setEditingDriver(null)}
                    onUpdate={(updatedDriver) => {
                        setDrivers(drivers.map(d => d.id === updatedDriver.id ? updatedDriver : d));
                        setEditingDriver(null);
                    }}
                />
            )}
        </div>
    );
}
