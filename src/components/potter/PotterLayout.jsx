import React, { useState } from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import DashboardNavBar from "../layout/DashboardNavBar";

const PorterLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">

            {/* SIDEBAR */}
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* MAIN AREA */}
            <div className="flex flex-col flex-1 h-full">

                {/* NAVBAR */}
                <DashboardNavBar onMenuClick={() => setIsOpen(true)} />

                {/* PAGE CONTENT */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default PorterLayout;