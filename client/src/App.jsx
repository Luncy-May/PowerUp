import React, { useState } from 'react';
import Container from './components/Container';

function App() {
  const draggableItems = ["Item 1", "Item 2", "Item 3", "Item 4"];
  const droppableAreas = ["Dropzone A", "Dropzone B", "Dropzone C"];

  return (
    <div className="p-10" tabIndex="0">
      <div className="text-3xl font-bold mb-6 text-center">
        <h1>PowerUp: Your AI-Driven Skill-to-Job Matcher Tool</h1>
        <h1>Manage Your Power Here</h1>
      </div>
      <div>
        <Container draggableItems={draggableItems} droppableAreas={droppableAreas} />
      </div>

    </div>
  );
}

export default App;
