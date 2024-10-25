import React, { useState, useRef } from "react";
import ThoughtInput from "./components/ThoughtInput";
import Animation from "./components/Animation";

function App() {
  const [thought, setThought] = useState(null);
  const [inputPosition, setInputPosition] = useState(null);
  const inputRef = useRef(null);
  const appRef = useRef(null);

  const resetThought = () => {
    setThought(null);
  };

  const handleTransform = (thought) => {
    if (inputRef.current && appRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const appRect = appRef.current.getBoundingClientRect();
      const position = {
        top: inputRect.top - appRect.top,
        left: inputRect.left - appRect.left,
        width: inputRect.width,
        height: inputRect.height,
      };
      setInputPosition(position);
    }
    setThought(thought);
  };

  return (
    <div className="app" ref={appRef}>
      <h1>Mindrelease</h1>
      <div className="thoughtInputContainer">
        <ThoughtInput onTransform={handleTransform} inputRef={inputRef} />
      </div>
      {thought && (
        <Animation
          thought={thought}
          onAnimationComplete={resetThought}
          startPosition={inputPosition}
        />
      )}
    </div>
  );
}

export default App;
