const uniqid = require('uniqid');
const { loadNotes, deleteNoteById, saveNewNote, validateNote } = require("../lib/notes");
const fs = require("fs");
jest.mock('fs');


test("saveNewNote creates a new note and adds it to the notes array", () => {
    const noteId = uniqid();
    const notes = loadNotes();

    const note = saveNewNote(
        {title:"Save New Note Title", text:"Save New Note text", id: noteId},
        notes
    );

    expect(note.title).toBe("Save New Note Title");
    expect(note.text).toBe("Save New Note text");
    expect(note.id).toBe(noteId);
})

test("validateNote returns false for an invalid note and true for a valid note", () => {
  const noteId = uniqid();

  const validNote = {
    id: noteId,
    title: "Valid Title",
    text: "valid text",
  };
  const invalidNote = {
    title: "Valid Title"
  };

  const validResult = validateNote(validNote);
  const invalidResult = validateNote(invalidNote);

  expect(validResult).toBe(true);
  expect(invalidResult).toBe(false);
});

test("deleteNoteById deletes the correct note by id", () => {
    const noteId = uniqid();
    const notes = loadNotes();

    saveNewNote(
      {title:"Save New Note Title", text:"Save New Note text", id: noteId},
      notes
    );
    const expectedResult = notes.filter(note => note.id = noteId);

    deleteNoteById(noteId, notes);
    expect(notes).toMatchObject(expectedResult);
})