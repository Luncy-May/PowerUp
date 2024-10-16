import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        opacity: isOver ? 1 : 0.5,
    };

    return (
        <div ref={setNodeRef} style={style} className='m-1 p-5 border border-gray-600 shadow-md hover:shadow-2xl' id = {props.children}>
            {props.children}
        </div>
    );
}