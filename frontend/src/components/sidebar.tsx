import React, { useState, useEffect } from "react";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    // Optioneel: sla voorkeur op in localStorage
    useEffect(() => {
        const saved = localStorage.getItem("sidebarOpen");
        if (saved) setIsOpen(saved === "true");
    }, []);

    useEffect(() => {
        localStorage.setItem("sidebarOpen", String(isOpen));
    }, [isOpen]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div
            className={`fixed left-0 top-0 h-screen bg-[#e8edf8] flex flex-col p-5 box-border rounded-tl-lg rounded-bl-lg z-40 transition-all duration-300 ease-in-out ${isOpen ? "w-[265px]" : "w-[80px]"
                }`}
        >
            {/* Toggle button */}
            <div className="absolute top-5 right-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-blue-700 hover:text-blue-900 transition"
                    title={isOpen ? "Sidebar inklappen" : "Sidebar uitklappen"}
                >
                    {isOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Logo Section */}
            <div className="flex items-center justify-center mb-4">
                <img
                    src="/Images/JDBLogo.png"
                    className={`object-contain transition-all duration-300 ${isOpen ? "h-[65px]" : "h-[40px]"
                        }`}
                    alt="JDB Logo"
                />
            </div>

            {/* Navigation */}
            <nav className="flex-1">
                <ul className="list-none p-0">
                    {[
                        { icon: "Dashboard", text: "Dashboard", link: "/dashboard" },
                        { icon: "Calendar", text: "Kalender", link: "/kalender" },
                        { icon: "Documents", text: "Notities", link: "/notes" },
                        { icon: "Patients", text: "Patiëntenoverzicht", link: "/patients" },
                    ].map((item) => (
                        <li key={item.text} className="flex items-center mb-4">
                            <img
                                src={`/Icons/${item.icon}.svg`}
                                alt={item.text}
                                className="w-8 h-8 mr-4"
                            />
                            {isOpen && (
                                <a
                                    href={item.link}
                                    className="text-black no-underline hover:font-bold whitespace-nowrap"
                                >
                                    {item.text}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>

                <hr className="border-t-2 border-[#d0d5dd] my-5" />
            </nav>

            {/* Settings + Logout */}
            <div>
                <ul className="list-none p-0">
                    <li className="flex items-center mb-4">
                        <img src="/Icons/Settings.svg" alt="Instellingen" className="w-8 h-8 mr-4" />
                        {isOpen && (
                            <a
                                href="/settings"
                                className="text-black no-underline hover:font-bold"
                            >
                                Instellingen
                            </a>
                        )}
                    </li>
                    <li
                        className="flex items-center cursor-pointer"
                        onClick={handleLogout}
                    >
                        <img src="/Icons/Logout.svg" alt="Uitloggen" className="w-8 h-8 mr-4" />
                        {isOpen && (
                            <span className="text-black hover:font-bold">Uitloggen</span>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;