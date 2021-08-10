const uniqid = require('uniqid');
const router = require('express').Router();
const { loadNotes, deleteNoteById, saveNewNote, validateNote } = require("../../lib/notes");

router.get('/notes', (req, res) => {
    const notes = loadNotes();
    res.json(notes);
})

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = uniqid();

    // add note to the db.json file
    if (!validateNote(req.body)) {
        res.status(400).send('The note does not have a title and body.');
    } else {
        const notes = loadNotes();
        const note = saveNewNote(req.body, notes);
        res.json(note);
    }
});

//BONUS DELETE NOTES 
router.delete('/notes/:id', (req, res) => {
    const notes = loadNotes();
    if (req.params.id) {
        deleteNoteById(req.params.id, notes);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
})
//END BONUS DELETE NOTES
module.exports = router; 