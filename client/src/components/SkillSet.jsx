
import React, {useState} from 'react';
import { Draggable } from './Draggable';

const SkillSet = ({ listOfSkills }) => {
    const [parent, setParent] = useState(null);
    const handleDragEnd = (event) => {
        const { over, active } = event;
        console.log(over.id, active.id)
        
        if (over) {
            const jobIndex = jobList.findIndex((job) => job.id === over.id);
            if (jobIndex !== -1) {
                // Logic to update the job with the dragged skill (active.id)
                console.log(`Dropped ${active.id} on ${over.id}`);
            }
        }
    };
    return (
        <div className="p-5 border border-gray-300 shadow-md hover:shadow-xl overflow-y-auto whitespace-nowrap flex flex-col w-full h-full">
            {listOfSkills.map((skill, index) => (
                <div className='text-center inline-block' key = {index}>
                    <Draggable key={index} id={`skill-${index}`}>
                        {skill}
                    </Draggable>
                </div>
            ))}
            
        </div>
    );
};

export default SkillSet;
