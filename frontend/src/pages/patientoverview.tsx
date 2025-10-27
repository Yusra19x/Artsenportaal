// src/pages/PatientOverview.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Patient {
    id: number;
    name: string;
    birthDate: string;
}

const PatientOverview: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("http://localhost:1337/api/patients");
                const data = response.data.data;

                const transformed = data.map((p: any) => ({
                    id: p.id,
                    name: p.name || "Onbekend",
                    birthDate: p.birthDate || "Onbekend",
                }));

                setPatients(transformed);
            } catch (err) {
                setError("Kon patiënten niet ophalen");
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    const handleOpenPatient = (id: number) => {
        navigate(`/patient/${id}`);
    };

    if (loading) return <div className="p-6 text-gray-600">Laden...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-[#f7f9fc] p-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">Patiëntenoverzicht</h1>

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-semibold text-blue-900">Alle patiënten</h2>
                </div>

                <div className="grid grid-cols-4 font-semibold text-gray-600 border-b pb-2 mb-2">
                    <span>Naam</span>
                    <span>Geboortedatum</span>
                    <span>Diagnose</span>
                    <span className="text-right">Acties</span>
                </div>

                {patients.map((p) => (
                    <div
                        key={p.id}
                        className="grid grid-cols-4 items-center py-3 border-b hover:bg-blue-50 rounded-xl cursor-pointer transition"
                        onClick={() => handleOpenPatient(p.id)}
                    >
                        <span className="font-medium text-gray-900">{p.name}</span>
                        <span>{p.birthDate}</span>
                        <span>JDM, monocyclisch</span>
                        <div className="flex justify-end pr-3">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenPatient(p.id);
                                }}
                                className="p-2 rounded-lg hover:bg-gray-100"
                                title="Bekijk patiënt"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-gray-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-4.35-4.35m2.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientOverview;
