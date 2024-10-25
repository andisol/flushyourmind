import React, { useState } from "react";

function ThoughtInput({ onTransform, inputRef }) {
  const [thought, setThought] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onTransform(thought);
    setThought(""); // Clear the input
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        placeholder="Enter your thought..."
        ref={inputRef}
      />
      <button type="submit">Transform</button>
    </form>
  );
}

export default ThoughtInput;
