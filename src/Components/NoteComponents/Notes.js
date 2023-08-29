import { useState, useEffect } from "react";
import "../css/Note.css";
import CreateNote from "./CreateNote";
import Note from "./Note";
import { v4 as uuid } from "uuid";

function Notes() {

  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");

  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  // add new note 
  const saveHandler = () => {
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuid(),
        text: inputText
      }
    ]);

    setInputText("");
  };

  //delete 
  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  //get the saved notes 
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (data) {
      setNotes(data);
    }
  }, []);

  //save note to local storage
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="notes">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          deleteNote={deleteNote}
        />
      ))}
      <CreateNote
        textHandler={textHandler}
        saveHandler={saveHandler}
        inputText={inputText}
      />
    </div>
  );
}

export default Notes;
