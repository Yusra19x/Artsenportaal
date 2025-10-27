import React, { useState, useEffect } from "react";

interface AddAppointmentPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onAppointmentAdded: (appointment: any) => void;
    onAppointmentEdited?: (appointment: any) => void;
    editAppointment?: any;
    viewMode?: boolean;
}

const AddAppointmentPopup: React.FC<AddAppointmentPopupProps> = ({
    isOpen,
    onClose,
    onAppointmentAdded,
    onAppointmentEdited,
    editAppointment,
    viewMode = false,
}) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [doctor, setDoctor] = useState("");
    const [description, setDescription] = useState("");
    const [note, setNote] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (editAppointment) {
            setTitle(editAppointment.title || "");
            setDate(editAppointment.date || "");
            setTime(editAppointment.time || "");
            setDoctor(editAppointment.doctor || "");
            setDescription(editAppointment.description || "");
            setNote(editAppointment.note || "");
        } else {
            setTitle("");
            setDate("");
            setTime("");
            setDoctor("");
            setDescription("");
            setNote("");
        }
    }, [editAppointment]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const appointmentData = {
            id: editAppointment ? editAppointment.id : Date.now(),
            title,
            date,
            time,
            doctor,
            description,
            note,
        };

        if (editAppointment && onAppointmentEdited) {
            onAppointmentEdited(appointmentData);
        } else {
            onAppointmentAdded(appointmentData);
        }

        setSaving(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="p-6">
                    {/* Titel afhankelijk van modus */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">
                            {viewMode
                                ? "Afspraak bekijken"
                                : editAppointment
                                    ? "Afspraak bewerken"
                                    : "Nieuwe afspraak"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
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

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Titel */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Titel *
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Bijv. Controleafspraak, Bloedonderzoek, etc."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={saving || viewMode}
                                required
                            />
                        </div>

                        {/* Datum */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Datum *
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={saving || viewMode}
                                required
                            />
                        </div>

                        {/* Tijd */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tijd *
                            </label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={saving || viewMode}
                                required
                            />
                        </div>

                        {/* Arts (dropdown) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Arts *
                            </label>
                            <select
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={saving || viewMode}
                                required
                            >
                                <option value="">Selecteer een arts...</option>
                                <option value="Dr. de Vries">Dr. de Vries</option>
                                <option value="Dr. Janssen">Dr. Janssen</option>
                                <option value="Dr. Peeters">Dr. Peeters</option>
                                <option value="Dr. van den Berg">Dr. van den Berg</option>
                            </select>
                        </div>


                        {/* Omschrijving */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Omschrijving
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Bijv. Bespreken van bloeduitslagen, controle van medicatie, etc."
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                disabled={saving || viewMode}
                            />
                        </div>

                        {/* Notitie */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Notitie
                            </label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Eventuele opmerkingen of extra context..."
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                disabled={saving || viewMode}
                            />
                        </div>

                        {/* Buttons */}
                        {!viewMode && (
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                    disabled={saving}
                                >
                                    Annuleren
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Opslaan..."
                                        : editAppointment
                                            ? "Wijzigingen opslaan"
                                            : "Afspraak opslaan"}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAppointmentPopup;
