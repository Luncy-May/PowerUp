import React, { useState } from 'react';
import './index.css';  
import SkillSet from './components/SkillSet';
import JobSet from './components/JobSet';
// npm install @dnd-kit/core

function App() {
  
  return (
    <div className="p-10" tabIndex="0">
      <h1 className="text-3xl font-bold mb-6 text-center">Skill-to-Job Matcher</h1>

      <div className="flex mb-8">
        <div className="w-1/2 p-5 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <SkillSet />
        </div>

        <div className="w-1/2 p-5 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">Jobs</h2>
          <JobSet />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Matched Skills and Jobs</h2>
      
      </div>
    </div>
  );
}

export default App;
