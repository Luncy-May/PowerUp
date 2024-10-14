import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

const Container = ({ draggableItems, droppableAreas }) => {
    // State to track which droppable contains which draggable items (each droppable can hold multiple items)
    const [parent, setParent] = useState(
        droppableAreas.reduce((acc, droppable, index) => {
            acc[`droppable-${index}`] = []; // Initialize each droppable with an empty array
            return acc;
        }, {})
    );

    // Handle the end of drag event
    function handleDragEnd({ active, over }) {
        if (over) {
            const draggableId = active.id;
            const droppableId = over.id;

            // Move draggable from its previous droppable to the new droppable
            setParent((prevState) => {
                // Remove the draggable from the previous droppable (if it was in one)
                const newState = { ...prevState };
                Object.keys(newState).forEach((key) => {
                    newState[key] = newState[key].filter(id => id !== draggableId);
                });

                // Add the draggable to the new droppable
                return {
                    ...newState,
                    [droppableId]: [...newState[droppableId], draggableId],
                };
            });
        }
    }

    // Render draggable items that are not in any droppable area
    const draggable = draggableItems.map((draggableName, index) => {
        const id = `draggable-${index}`;
        // Check if the draggable is not currently placed in any droppable
        const isInDroppable = Object.values(parent).some((draggableList) =>
            draggableList.includes(id)
        );
        if (!isInDroppable) {
            return (
                <Draggable key={id} id={id}>
                    {draggableName}
                </Draggable>
            );
        }
        return null;
    });

    // Render droppable areas with their respective draggable items (if any)
    const droppable = droppableAreas.map((droppableName, index) => {
        const id = `droppable-${index}`;
        return (
            <Droppable key={id} id={id}>
                {/* If the droppable contains draggable items, render them. Otherwise, show the default text */}
                {parent[id].length > 0 ? (
                    parent[id].map((draggableId) => (
                        <Draggable key={draggableId} id={draggableId}>
                            {draggableItems[parseInt(draggableId.split('-')[1])]}
                        </Draggable>
                    ))
                ) : (
                    'Drop here'
                )}
            </Droppable>
        );
    });

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex">
                <div className="w-1/2 p-5 m-2 text-center text-2xl font-semibold border border-gray-200 shadow-md hover:shadow-lg">
                    <h2>Draggable Items</h2>
                    {draggable}
                </div>
                <div className="w-1/2 p-5 m-2 text-center text-2xl font-semibold border border-gray-200 shadow-md hover:shadow-lg">
                    <h2>Droppable Areas</h2>
                    {droppable}
                </div>
            </div>
        </DndContext>
    );
};

export default Container;
