const fs = require("fs");
const path = require("path");

function loadNotes() {
    const rawNotes = fs.readFileSync(
        path.join(__dirname, '../db/db.json')
    );
    if (rawNotes) {
        return JSON.parse(rawNotes);
    } else {
        return [];
    }
}

function saveNewNote(body, notesArray) {
    // add the note to the notesArray
    const note = body;
    notesArray.push(note);

    // rewrite db.json
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );

    return note;
}

function validateNote(note) {
    if (!note.title) {
        return false;
    }
    if (!note.id) {
        return false;
    }
    if (!note.text) {
        return false;
    }
    return true;
}

function deleteNoteById(noteId, notesArray) {
    // remove the note from the notesArray
    const result = notesArray.filter(note => note.id !== noteId);

    // rewrite db.json
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(result, null, 2)
    );

    return result;
}

module.exports = {
    loadNotes,
    deleteNoteById,
    saveNewNote,
    validateNote
};