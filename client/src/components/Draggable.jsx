import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
      }}
      className="p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none active:bg-blue-700"
    >
      {props.children}
    </button>
  );
}


