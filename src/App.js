import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Editor from './components/editor/Editor';

const firebase = require('firebase')

function App() {
  let [selectedNoteIndex, setSelectedNoteIndex] = useState(null)
  let [selectedNote, setSelectedNote] = useState(null)
  let [stateNotes, setNotes] = useState(null)
  let [newId, setNewId] = useState(null)

  useEffect(() => {
    firebase.firestore().collection('notes').onSnapshot(serverUpdate => {
      const notes = serverUpdate.docs.map( _doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        console.log('INSIDE FIRESTORE STUFF')
        return data;
      });
      console.log('FIREBASE',notes)
      setNotes(notes)
    });
  }, [])

  useEffect(() => {
    if(stateNotes){
      let newIndex
      let newNoteArr = stateNotes.filter( (note, index) => note.id === newId ? newIndex = index : null)
      setSelectedNote(stateNotes[newIndex])
      setSelectedNoteIndex(newIndex)
      console.log('new note array' , newIndex)
      console.log('new id', newId)
    }
  
  }, [newId])

  const selectNote = (note, index) =>  {
    setSelectedNoteIndex(index)
    setSelectedNote(note)
  }

  const noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  const  newNote = async (title) => {
    let note = {
      title: title,
      body: ''
    };
    let newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    let newID = newFromDB.id;
    setNewId(newID)
  }

  const deleteNote = async (note) => {
    const noteIndex = stateNotes.indexOf(note);
    const filteredNotes = await stateNotes.filter(_note => _note !== note)
    setNotes(filteredNotes)

    if(selectedNoteIndex === noteIndex) {
      setSelectedNote(null)
      setSelectedNoteIndex(null)
    } else {
      stateNotes.length > 1 ?
      selectNote(stateNotes[selectedNoteIndex - 1], selectedNoteIndex - 1) :
      setSelectedNote(null)
      setSelectedNoteIndex(null)
    }

    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }

  return (
    <div className="app-container">
      <Sidebar  
        selectedNoteIndex={selectedNoteIndex}
        notes={stateNotes}
        deleteNote={deleteNote}
        selectNote={selectNote}
        newNote={newNote} />
      {
        selectedNote ?
          <Editor 
            selectedNote={selectedNote}
            selectedNoteIndex={selectedNoteIndex}
            notes={stateNotes}
            noteUpdate={noteUpdate} /> :
          null
      } 
      {console.log('END OF RENDER')}
    </div>
  );
}

export default App;
