// JobSet.js
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from './Droppable';

const JobSet = ({ listOfJobs }) => {
    const [jobList, setJobList] = useState(listOfJobs);

    const handleDragEnd = (event) => {
        const { over, active } = event;
        if (over) {
            const jobIndex = jobList.findIndex((job) => job.id === over.id);
            if (jobIndex !== -1) {
                // Logic to update the job with the dragged skill (active.id)
                console.log(`Dropped ${active.id} on ${over.id}`);
            }
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="p-5 shadow-md border border-gray-300 hover:shadow-xl overflow-y-auto whitespace-nowrap flex flex-col w-full h-full">
                {jobList.map((job, index) => (
                    <div className='text-center inline-block' key = {index}>
                        <Droppable key={index} id={`job-${index}`}>
                            {job.name}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DndContext>
    );
};

export default JobSet;
