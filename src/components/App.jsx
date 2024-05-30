import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { MdDelete } from 'react-icons/md'; // Correct import path for Material Icons

function App() {
  const [notes, setNotes] = useState([]);
  const [historicalNotes, setHistoricalNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    const savedHistoricalNotes = JSON.parse(localStorage.getItem("historicalNotes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
    if (savedHistoricalNotes) {
      setHistoricalNotes(savedHistoricalNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("historicalNotes", JSON.stringify(historicalNotes));
  }, [historicalNotes]);

  function addNote(newNote) {
    setNotes(prevNotes => [...prevNotes, { ...newNote, done: false }]);
  }

  function deleteNote(id) {
    const noteToDelete = notes[id];
    setNotes(prevNotes => prevNotes.filter((noteItem, index) => index !== id));
    setHistoricalNotes(prevHistoricalNotes => [...prevHistoricalNotes, noteToDelete]);
  }

  function deleteHistoricalNote(date) {
    setHistoricalNotes(prevHistoricalNotes =>
      prevHistoricalNotes.filter(note => note.date !== date)
    );
  }

  function handleTaskDone(id, isDone) {
    setNotes(prevNotes =>
      prevNotes.map((noteItem, index) =>
        index === id ? { ...noteItem, done: isDone } : noteItem
      )
    );
  }

  function countTasksByDate() {
    const taskCounts = {};
    historicalNotes.forEach(note => {
      const date = note.date;
      if (!taskCounts[date]) {
        taskCounts[date] = [];
      }
      taskCounts[date].push(note.title); // Push the title of the task
    });
    return taskCounts;
  }

  function renderTaskTable() {
    const taskCounts = countTasksByDate();
    return Object.keys(taskCounts).map(date => (
      <tr key={date}>
        <td>{date}</td>
        <td className="task-titles" colSpan="1">
          {taskCounts[date].join(", ")}
        </td>
        <td>
          <button className="trash"onClick={() => deleteHistoricalNote(date)}>
            <MdDelete style={{ color: 'red' }} />
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="notes-container" style={{ marginBottom: '20px' }}>
        {notes.map((noteItem, index) => (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            date={noteItem.date}
            done={noteItem.done}
            onTaskDone={handleTaskDone}
            onDelete={deleteNote}
          />
        ))}
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Tasks Done</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderTaskTable()}</tbody>
      </table>
      <Footer style={{ marginTop: '20px' }} />
    </div>
  );
}

export default App;