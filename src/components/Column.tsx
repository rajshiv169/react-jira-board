import React from 'react';
import { useDrop } from 'react-dnd';
import { Column as ColumnType, Task } from '../types';
import TaskCard from './TaskCard';
import './Column.css';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onMoveTask: (taskId: string, sourceColumnId: string, targetColumnId: string, targetIndex: number) => void;
}

const Column: React.FC<ColumnProps> = ({ column, tasks, onMoveTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: string, sourceColumnId: string }) => {
      onMoveTask(item.id, item.sourceColumnId, column.id, tasks.length);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className="column">
      <h2 className="column-title">{column.title}</h2>
      <div
        ref={drop}
        className={`task-list ${isOver ? 'dragging-over' : ''}`}
      >
        {tasks.map((task, index) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            index={index}
            sourceColumnId={column.id}
            onMoveTask={onMoveTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;