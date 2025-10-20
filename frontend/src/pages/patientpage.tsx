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
                    <div className="grid grid-cols-2 gap-10">
                        {/* Linkerzijde - patiëntinformatie */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-blue-900">
                                Algemene informatie
                            </h2>
                            <div className="space-y-2">
                                <p><span className="font-medium text-gray-700">Naam:</span> {patient.name}</p>
                                <p><span className="font-medium text-gray-700">Leeftijd:</span> 17 jaar</p>
                                <p><span className="font-medium text-gray-700">Geslacht:</span> {patient.gender}</p>
                                <p><span className="font-medium text-gray-700">Diagnose:</span> {patient.diagnosis}</p>
                                <p><span className="font-medium text-gray-700">E-mailadres:</span> emma.thompson@email.com</p>
                                <p><span className="font-medium text-gray-700">Telefoonnummer:</span> +31 6 9876 5432</p>
                            </div>
                        </div>

                        {/* Rechterzijde - contactpersoon */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-blue-900">
                                Contactpersoon
                            </h2>
                            <div className="space-y-2">
                                <p><span className="font-medium text-gray-700">Naam:</span> Sarah Thompson</p>
                                <p><span className="font-medium text-gray-700">Relatie:</span> Moeder</p>
                                <p><span className="font-medium text-gray-700">E-mailadres:</span> sarah.thompson@email.com</p>
                                <p><span className="font-medium text-gray-700">Telefoonnummer:</span> +31 6 1122 3344</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "Afspraken" && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-blue-900">Afspraken</h2>
                            <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition">
                                + Afspraak toevoegen
                            </button>
                        </div>

                        {/* Aankomende afspraken */}
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Aankomend</h3>
                        <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-4 py-2">Datum</th>
                                        <th className="px-4 py-2">Tijd</th>
                                        <th className="px-4 py-2">Soort</th>
                                        <th className="px-4 py-2">Locatie</th>
                                        <th className="px-4 py-2">Arts</th>
                                        <th className="px-4 py-2">Notitie</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-2">14-10-2025</td>
                                        <td className="px-4 py-2">12:35</td>
                                        <td className="px-4 py-2">Bloedonderzoek</td>
                                        <td className="px-4 py-2">Ziekenhuis, Kerkstraat 12</td>
                                        <td className="px-4 py-2">Dr. Johan Janssen</td>
                                        <td className="px-4 py-2">Nuchter komen</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Verleden afspraken */}
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Verleden</h3>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-4 py-2">Datum</th>
                                        <th className="px-4 py-2">Tijd</th>
                                        <th className="px-4 py-2">Soort</th>
                                        <th className="px-4 py-2">Locatie</th>
                                        <th className="px-4 py-2">Arts</th>
                                        <th className="px-4 py-2">Notitie</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-2">06-10-2025</td>
                                        <td className="px-4 py-2">11:00</td>
                                        <td className="px-4 py-2">Controle</td>
                                        <td className="px-4 py-2">UMC Utrecht, Afdeling 3B</td>
                                        <td className="px-4 py-2">Dr. Lisa de Vries</td>
                                        <td className="px-4 py-2">Medicatie geëvalueerd</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
                        <h2 className="text-xl font-semibold mb-4 text-blue-900">
                            Medicatie
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <p><span className="font-medium text-gray-700">Medicijn:</span> Prednison</p>
                                <p><span className="font-medium text-gray-700">Dosering:</span> 10 mg</p>
                                <p><span className="font-medium text-gray-700">Frequentie:</span> 1x per dag (ochtend)</p>
                            </div>

                            <hr className="my-4 border-gray-200" />

                            <div>
                                <p><span className="font-medium text-gray-700">Medicijn:</span> Methotrexaat</p>
                                <p><span className="font-medium text-gray-700">Dosering:</span> 15 mg</p>
                                <p><span className="font-medium text-gray-700">Frequentie:</span> 1x per week</p>
                            </div>

                            <hr className="my-4 border-gray-200" />

                            <div>
                                <p><span className="font-medium text-gray-700">Medicijn:</span> Calcium + Vitamine D</p>
                                <p><span className="font-medium text-gray-700">Dosering:</span> 500 mg / 400 IU</p>
                                <p><span className="font-medium text-gray-700">Frequentie:</span> 2x per dag</p>
                            </div>
                        </div>
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