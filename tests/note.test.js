import { notesService } from "../src/services/notesService";

describe("notesService", () => {
    // Mock localStorage
    beforeEach(() => {
        let store = {};
        global.localStorage = {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => { store[key] = value.toString(); },
            removeItem: (key) => { delete store[key]; },
            clear: () => { store = {}; },
        };
    });

    test("creates a new note", () => {
        const note = notesService.createNote(
            "1",
            "Patient A",
            "First Note",
            "Patient is recovering well",
            "Dr. Test"
        );

        expect(note.patientId).toBe("1");
        expect(note.title).toBe("First Note");
        expect(note.content).toBe("Patient is recovering well");

        const stored = notesService.getNotesByPatient("1");
        expect(stored.length).toBe(1);
        expect(stored[0].title).toBe("First Note");
    });

    test("gets notes for a specific patient", () => {
        notesService.createNote("1", "Patient A", "Note 1", "Content 1");
        notesService.createNote("2", "Patient B", "Note 2", "Content 2");

        const notesForPatient1 = notesService.getNotesByPatient("1");
        expect(notesForPatient1.length).toBe(1);
        expect(notesForPatient1[0].patientName).toBe("Patient A");
    });

    test("updates a note", () => {
        const note = notesService.createNote("1", "Patient A", "Old Title", "Old content");

        const success = notesService.updateNote(note.id, { title: "New Title" });
        expect(success).toBe(true);

        const updated = notesService.getNotesByPatient("1")[0];
        expect(updated.title).toBe("New Title");
    });

    test("deletes a note", () => {
        const note = notesService.createNote("1", "Patient A", "To Delete", "Some content");

        const success = notesService.deleteNote(note.id);
        expect(success).toBe(true);

        const notes = notesService.getNotesByPatient("1");
        expect(notes.length).toBe(0);
    });
});
