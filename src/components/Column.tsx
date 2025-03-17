import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Column as ColumnType, Task } from '../types';
import TaskCard from './TaskCard';
import './Column.css';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  return (
    <div className="column">
      <h2 className="column-title">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;