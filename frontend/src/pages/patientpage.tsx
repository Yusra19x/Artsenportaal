import React, { useEffect, useState } from "react";
import axios from "axios";

interface Patient {
    id: number;
    name: string;
    birthDate: string;
    gender?: string;
    diagnosis?: string;
}

const PatientsPage: React.FC = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [activeTab, setActiveTab] = useState("Algemeen");

    useEffect(() => {
        // Haal de eerste patiënt op uit Strapi
        const fetchPatient = async () => {
            try {
                const res = await axios.get("http://localhost:1337/api/patients");
                if (res.data?.data && res.data.data.length > 0) {
                    const p = res.data.data[0];
                    setPatient({
                        id: p.id,
                        name: p.name,
                        birthDate: p.birthDate || "Onbekend",
                        gender: p.gender || "Onbekend",
                        diagnosis: p.diagnosis || "Niet ingevuld",
                    });
                }
            } catch (err) {
                console.error("Fout bij het ophalen van patiëntgegevens:", err);
            }
        };

        fetchPatient();
    }, []);

    if (!patient)
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600">Patiëntgegevens worden geladen...</p>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="p-6 bg-white shadow-sm border-b">
                <h1 className="text-3xl font-bold text-blue-900">{patient.name}</h1>
                <p className="text-sm text-gray-600">
                    Geboortedatum: {patient.birthDate}
                </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b bg-gray-50">
                {["Algemeen", "Afspraken", "Notities", "Medicatie", "Labresultaten"].map(
                    (tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === tab
                                    ? "border-blue-600 text-blue-700 bg-white"
                                    : "border-transparent text-gray-500 hover:text-blue-700 hover:bg-white"
                                }`}
                        >
                            {tab}
                        </button>
                    )
                )}
            </div>

            {/* Tab Content */}
            <div className="p-6 bg-white flex-1 overflow-y-auto">
                {activeTab === "Algemeen" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-blue-900">
                            Algemene informatie
                        </h2>
                        <p>Leeftijd: 17 jaar</p>
                        <p>Geslacht: {patient.gender}</p>
                        <p>Diagnose: {patient.diagnosis}</p>
                    </div>
                )}

                {activeTab === "Afspraken" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-blue-900">Afspraken</h2>
                        <p>Hier komen afspraken van deze patiënt</p>
                    </div>
                )}

                {activeTab === "Notities" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-blue-900">Notities</h2>
                        <p>Hier komen notities over deze patiënt</p>
                    </div>
                )}

                {activeTab === "Medicatie" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-blue-900">Medicatie</h2>
                        <p>Hier komt een overzicht van medicatie</p>
                    </div>
                )}

                {activeTab === "Labresultaten" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-blue-900">
                            Labresultaten
                        </h2>
                        <p>Hier komen labresultaten en grafieken</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientsPage;