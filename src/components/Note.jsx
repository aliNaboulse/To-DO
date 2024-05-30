import React, { useState } from "react";

function Note(props) {
  const [isChecked, setIsChecked] = useState(props.done); // Initialize isChecked state with the value of props.done

  function handleClick() {
    props.onDelete(props.id);
  }

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
    props.onTaskDone(props.id, !isChecked); // Call the parent component's function to update the task's done state
  }

  const noteStyle = {
    background: isChecked ? "#1000ff" : "#fff",
    textDecoration: isChecked ? "line-through" : "none",
    position: "relative", // Ensure the positioning context for the delete button
    marginBottom: "16px", // Add some space below the note
    padding: "10px", // Add padding for better spacing
    borderRadius: "7px",
    boxShadow: "3px 5px 3px #088395"
  };

  return (
    <div className="note" style={noteStyle}>
      <h1>{props.title}</h1>
      <p style={{ textDecoration: isChecked ? "line-through" : "none" }}>
        {props.content}
      </p>
      <p><small>{props.date}</small></p>
      <input 
        type="checkbox" 
        checked={isChecked} 
        onChange={handleCheckboxChange} 
        style={{ marginRight: "5px" }} // Add some spacing between checkbox and content
      />
      <button onClick={handleClick} className="delete-button">DELETE</button>
    </div>
  );
}

export default Note;
