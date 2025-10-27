import React, { useEffect, useState } from "react";
import axios from "axios";
import LabResultChart from "../components/LabResultChart";
import AddNotePopup from "../components/addnotepopup";
import AddAppointmentPopup from "../components/addappointmentpopup";

interface Patient {
    id: number;
    name: string;
    birthDate: string;
    gender?: string;
    diagnosis?: string;
}
interface Measurement {
    id: number;
    measurementId: string;
    dateTime: string;
    value: string;
}

interface LabResult {
    id: number;
    resultName: string;
    unit: string;
    measurements: Measurement[];
}

const PatientsPage: React.FC = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [activeTab, setActiveTab] = useState("Algemeen");
    const [labResults, setLabResults] = useState<LabResult[]>([]);

    // Notities
    const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
    const [editNote, setEditNote] = useState<{ id: number; title: string; content: string } | null>(null);

    // Afspraken
    const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
    const [editAppointment, setEditAppointment] = useState<any | null>(null);
    const [viewAppointment, setViewAppointment] = useState<any | null>(null);
    const [appointments, setAppointments] = useState<any[]>([]);

    // Notities data
    const [notes, setNotes] = useState([
        {
            id: 1,
            date: "14-09-2025",
            time: "14:27",
            specialist: "Dr. de Vries",
            title: "Bloedonderzoek resultaten besproken",
            content:
                "Patiënte reageert goed op huidige medicatie. Vermoeidheid verminderd, maar spierzwakte blijft aanwezig. Overweeg dosisaanpassing bij volgende afspraak.",
        },
        {
            id: 2,
            date: "01-08-2025",
            time: "09:15",
            specialist: "Dr. Janssen",
            title: "Controle spierkracht en huid",
            content:
                "Geen nieuwe klachten gemeld. Spierkracht stabiel, huiduitslag verminderd. Over drie maanden nieuwe controle.",
        },
        {
            id: 3,
            date: "10-07-2025",
            time: "16:40",
            specialist: "Dr. Peeters",
            title: "Evaluatie bijwerkingen",
            content:
                "Lichte misselijkheid na medicatie gemeld. Geen verdere klachten. Aanraden om medicatie na maaltijd in te nemen.",
        },
        {
            id: 4,
            date: "28-06-2025",
            time: "13:00",
            specialist: "Dr. van den Berg",
            title: "Controle huidontsteking",
            content:
                "Huidirritatie zichtbaar verbeterd. Advies om huidige zalf voort te zetten gedurende 2 weken.",
        },
    ]);

    // Eerste useEffect: haalt patiëntgegevens op
    useEffect(() => {
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

    // Tweede useEffect: haalt labresultaten op
    useEffect(() => {
        const fetchLabResults = async () => {
            try {
                const res = await axios.get("http://localhost:1337/api/lab-results", {
                    params: { populate: ["measurements"] },
                });

                const formatted = res.data.data.map((item: any) => ({
                    id: item.id,
                    resultName: item.resultName,
                    unit: item.unit || "",
                    measurements: item.measurements?.map((m: any) => ({
                        id: m.id,
                        measurementId: m.measurementId,
                        dateTime: m.dateTime,
                        value: m.value,
                    })) || [],
                }));

                setLabResults(formatted);
            } catch (error) {
                console.error("❌ Fout bij ophalen labresultaten:", error);
            }
        };

        fetchLabResults();
    }, []);

    // Loading state
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
                    Geboortedatum: 27-10-2008
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
                                <p><span className="font-medium text-gray-700">In behandeling sinds:</span> 18-09-2020</p>
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
                        {/* 📅 Popup aanmaken/bewerken/bekijken */}
                        <AddAppointmentPopup
                            isOpen={isAddAppointmentOpen || !!editAppointment || !!viewAppointment}
                            onClose={() => {
                                setIsAddAppointmentOpen(false);
                                setEditAppointment(null);
                                setViewAppointment(null);
                            }}
                            onAppointmentAdded={(newAppointment) => {
                                setAppointments((prev) => [...prev, newAppointment]);
                                setIsAddAppointmentOpen(false);
                            }}
                            onAppointmentEdited={(updated) => {
                                setAppointments((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
                                setEditAppointment(null);
                            }}

                            /* ✅ hier is de fix */
                            editAppointment={viewAppointment || editAppointment}
                            viewMode={!!viewAppointment}
                        />


                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-blue-900">Afspraken</h2>
                            <button
                                onClick={() => setIsAddAppointmentOpen(true)}
                                className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition"
                            >
                                + Afspraak toevoegen
                            </button>
                        </div>

                        {/* Geen afspraken */}
                        {appointments.length === 0 ? (
                            <p className="text-gray-500 italic">Nog geen afspraken toegevoegd.</p>
                        ) : (
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-4 py-2">Titel</th>
                                            <th className="px-4 py-2">Datum</th>
                                            <th className="px-4 py-2">Tijd</th>
                                            <th className="px-4 py-2">Arts</th>
                                            <th className="px-4 py-2">Omschrijving</th>
                                            <th className="px-4 py-2">Notitie</th>
                                            <th className="px-4 py-2 text-right">Acties</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {appointments.map((appt) => (
                                            <tr key={appt.id} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-2">{appt.title}</td>
                                                <td className="px-4 py-2">
                                                    {new Date(appt.date).toLocaleDateString("nl-NL")}
                                                </td>
                                                <td className="px-4 py-2">{appt.time}</td>
                                                <td className="px-4 py-2">{appt.doctor}</td>
                                                <td className="px-4 py-2">{appt.description}</td>
                                                <td className="px-4 py-2">{appt.note}</td>
                                                <td className="px-4 py-2 text-right">
                                                    <div className="flex justify-end gap-3">
                                                        <button
                                                            title="Bekijken"
                                                            onClick={() => setViewAppointment(appt)}
                                                            className="text-black hover:text-gray-600 transition"
                                                        >
                                                            <i className="bi bi-eye text-lg"></i>
                                                        </button>
                                                        <button
                                                            title="Bewerken"
                                                            onClick={() => setEditAppointment(appt)}
                                                            className="text-black hover:text-gray-600 transition"
                                                        >
                                                            <i className="bi bi-pencil text-lg"></i>
                                                        </button>
                                                        <button
                                                            title="Verwijderen"
                                                            onClick={() =>
                                                                setAppointments((prev) =>
                                                                    prev.filter((a) => a.id !== appt.id)
                                                                )
                                                            }
                                                            className="text-black hover:text-gray-600 transition"
                                                        >
                                                            <i className="bi bi-trash text-lg"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}



                {activeTab === "Notities" && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-blue-900">Notities</h2>
                            <button
                                onClick={() => {
                                    setEditNote(null); // reset bewerkmodus
                                    setIsAddNoteOpen(true);
                                }}
                                className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition"
                            >
                                + Notitie toevoegen
                            </button>
                        </div>

                        {/* Popup */}
                        <AddNotePopup
                            isOpen={isAddNoteOpen}
                            onClose={() => {
                                setIsAddNoteOpen(false);
                                setEditNote(null);
                            }}
                            patientId={String(patient.id)}
                            patientName={patient.name}
                            editNote={editNote} // 👈 nieuw
                            onNoteAdded={(title?: string, content?: string) => {
                                if (title && content) {
                                    const newNote = {
                                        id: notes.length + 1,
                                        date: new Date().toLocaleDateString("nl-NL"),
                                        time: new Date().toLocaleTimeString("nl-NL", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }),
                                        specialist: "Dr. de Vries",
                                        title,
                                        content,
                                    };
                                    setNotes((prev) => [newNote, ...prev]);
                                }
                                setIsAddNoteOpen(false);
                            }}
                            onNoteEdited={(id, title, content) => {
                                setNotes((prev) =>
                                    prev.map((n) => (n.id === id ? { ...n, title, content } : n))
                                );
                                setEditNote(null);
                                setIsAddNoteOpen(false);
                            }}
                        />

                        {/* ✅ Lijst van notities */}
                        {notes.length === 0 ? (
                            <p className="text-gray-500 italic">Nog geen notities toegevoegd.</p>
                        ) : (
                            notes.map((note) => (
                                <div key={note.id} className="border border-gray-200 rounded-lg mb-6">
                                    <div className="flex justify-between items-center bg-gray-50 border-b px-4 py-2">
                                        <div className="flex flex-wrap gap-6 text-sm text-gray-700">
                                            <p>
                                                <span className="font-medium">Datum:</span> {note.date}
                                            </p>
                                            <p>
                                                <span className="font-medium">Tijd:</span> {note.time}
                                            </p>
                                            <p>
                                                <span className="font-medium">Specialist:</span> {note.specialist}
                                            </p>
                                            <p>
                                                <span className="font-medium">Titel:</span> {note.title}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                title="Bekijken"
                                                className="text-black hover:text-gray-600 transition"
                                                onClick={() => alert(`Inhoud:\n\n${note.content}`)}
                                            >
                                                <i className="bi bi-eye text-lg"></i>
                                            </button>

                                            <button
                                                title="Bewerken"
                                                className="text-black hover:text-gray-600 transition"
                                                onClick={() => {
                                                    setEditNote({
                                                        id: note.id,
                                                        title: note.title,
                                                        content: note.content,
                                                    });
                                                    setIsAddNoteOpen(true);
                                                }}
                                            >
                                                <i className="bi bi-pencil text-lg"></i>
                                            </button>

                                            <button
                                                title="Verwijderen"
                                                onClick={() =>
                                                    setNotes((prev) => prev.filter((n) => n.id !== note.id))
                                                }
                                                className="text-black hover:text-gray-600 transition"
                                            >
                                                <i className="bi bi-trash text-lg"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4 text-sm text-gray-700 leading-relaxed">
                                        {note.content}
                                    </div>
                                </div>
                            ))
                        )}
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
                                <p><span className="font-medium text-gray-700">Gebruikt medicatie sinds:</span> 27-10-2020</p>
                            </div>

                            <hr className="my-4 border-gray-200" />

                            <div>
                                <p><span className="font-medium text-gray-700">Medicijn:</span> Methotrexaat</p>
                                <p><span className="font-medium text-gray-700">Dosering:</span> 15 mg</p>
                                <p><span className="font-medium text-gray-700">Frequentie:</span> 1x per week</p>
                                <p><span className="font-medium text-gray-700">Gebruikt medicatie sinds:</span> 27-10-2020</p>
                            </div>

                            <hr className="my-4 border-gray-200" />

                            <div>
                                <p><span className="font-medium text-gray-700">Medicijn:</span> Calcium + Vitamine D</p>
                                <p><span className="font-medium text-gray-700">Dosering:</span> 500 mg / 400 IU</p>
                                <p><span className="font-medium text-gray-700">Frequentie:</span> 2x per dag</p>
                                <p><span className="font-medium text-gray-700">Gebruikt medicatie sinds:</span> 27-10-2020</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "Labresultaten" && (
                    <div className="flex gap-6">
                        {/* Filtersectie */}
                        <div className="w-64 border border-gray-200 rounded-lg bg-white p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-blue-600 text-xl">🧪</span>
                                <h3 className="text-lg font-semibold text-gray-800">Filter</h3>
                            </div>

                            <div className="space-y-3 text-sm">
                                {["Hemoglobine", "Witte bloedcellen", "Glucose", "CRP", "Calcium"].map((label, index) => (
                                    <label key={index} className="flex items-center justify-between cursor-pointer">
                                        <span>{label}</span>
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Grafieksectie */}
                        <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-blue-900 mb-4">Labresultatenoverzicht</h3>
                            <p className="text-sm text-gray-500 mb-6">Gemeten waarden over de afgelopen maanden</p>

                            {/* Placeholder voor grafiek */}
                            <div className="h-80 flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-lg">
                                <span className="text-gray-400">[ Grafiek met labresultaten komt hier ]</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientsPage;