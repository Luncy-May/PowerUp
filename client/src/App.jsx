import React, { useState } from 'react';
import './index.css';  
// npm install @dnd-kit/core
const initialSkills = [
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'Python' },
  { id: 3, name: 'React' }
];

const initialJobs = [
  { id: 1, name: 'Frontend Developer' },
  { id: 2, name: 'Data Scientist' },
  { id: 3, name: 'Fullstack Developer' }
];

function App() {
  const [matched, setMatched] = useState([]);
  const [ctrlPressed, setCtrlPressed] = useState(false);

  const handleKeyDown = (event) => {
    if (event.ctrlKey) {
      setCtrlPressed(true);
    }
  };

  const handleKeyUp = () => {
    setCtrlPressed(false);
  };

  const handleDragStart = (event, skill) => {
    if (ctrlPressed) {
      event.dataTransfer.setData('skill', JSON.stringify(skill));
    }
  };

  const handleDrop = (event, job) => {
    event.preventDefault();
    const skill = JSON.parse(event.dataTransfer.getData('skill'));
    
    if (ctrlPressed) {
      setMatched((prev) => [...prev, { skill, job }]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="p-10" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex="0">
      <h1 className="text-3xl font-bold mb-6 text-center">Skill-to-Job Matcher</h1>

      <div className="flex mb-8">
        <div className="w-1/2 p-5 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          {initialSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-blue-300 text-blue-900 p-3 mb-2 w-[500px] rounded-lg text-center cursor-move border border-blue-500"
              draggable
              onDragStart={(e) => handleDragStart(e, skill)}
            >
              {skill.name}
            </div>
          ))}
        </div>

        <div className="w-1/2 p-5 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">Jobs</h2>
          {initialJobs.map((job) => (
            <div
              key={job.id}
              className="bg-green-300 text-green-900 p-3 mb-2 w-[500px] rounded-lg text-center border border-green-500"
              onDrop={(e) => handleDrop(e, job)}
              onDragOver={handleDragOver}
            >
              {job.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Matched Skills and Jobs</h2>
        {matched.map((match, index) => (
          <div key={index} className="bg-yellow-100 p-3 mb-2 rounded-lg border border-yellow-400">
            <span>{match.skill.name} → {match.job.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
