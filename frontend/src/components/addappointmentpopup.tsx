import React, { useState } from "react";

interface AddAppointmentPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onAppointmentAdded?: (appointment: any) => void;
}

const AddAppointmentPopup: React.FC<AddAppointmentPopupProps> = ({
    isOpen,
    onClose,
    onAppointmentAdded,
}) => {
    const [title, setTitle] = useState("");
    const [doctor, setDoctor] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [note, setNote] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !doctor || !date || !time) {
            alert("Vul alle verplichte velden in (Titel, Arts, Datum, Tijd)");
            return;
        }

        setSaving(true);

        const newAppointment = {
            id: Date.now(),
            title,
            doctor,
            date,
            time,
            description,
            note,
        };

        if (onAppointmentAdded) {
            onAppointmentAdded(newAppointment);
        }

        // Reset velden
        setTitle("");
        setDoctor("");
        setDate("");
        setTime("");
        setDescription("");
        setNote("");

        setSaving(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Afspraak aanmaken</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Formulier */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Titel *
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Bijv. Controle, Bloedonderzoek..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Afspraak met *
                            </label>
                            <select
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Selecteer arts...</option>
                                <option>Dr. Lisa de Vries</option>
                                <option>Dr. Johan Janssen</option>
                                <option>Dr. Peeters</option>
                                <option>Dr. van den Berg</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Datum *
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tijd *
                                </label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Omschrijving
                            </label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Bijv. Evaluatie medicatie, controle spierkracht..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Notitie aanmaken
                            </label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                placeholder="Extra notitie bij deze afspraak..."
                            />
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                            >
                                Annuleren
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {saving ? "Opslaan..." : "Opslaan"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAppointmentPopup;
