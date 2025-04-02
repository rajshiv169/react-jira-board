import React from 'react';
import { useDrop } from 'react-dnd';
import { Column as ColumnType, Task } from '../types';
import TaskCard from './TaskCard';
import './Column.css';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onMoveTask: (taskId: string, sourceColumnId: string, targetColumnId: string, targetIndex: number) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updatedTask: Partial<Task>) => void;
}

const getPriorityValue = (priority: string): number => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 3;
    case 'medium':
      return 2;
    case 'low':
      return 1;
    default:
      return 0;
  }
};

const Column: React.FC<ColumnProps> = ({ column, tasks, onMoveTask, onDeleteTask, onUpdateTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: string, sourceColumnId: string }) => {
      onMoveTask(item.id, item.sourceColumnId, column.id, tasks.length);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Sort tasks by priority (High > Medium > Low)
  const sortedTasks = [...tasks].sort((a, b) => {
    return getPriorityValue(b.priority) - getPriorityValue(a.priority);
  });

  return (
    <div className="column">
      <h2 className="column-title">{column.title}</h2>
      <div
        ref={drop}
        className={`task-list ${isOver ? 'dragging-over' : ''}`}
      >
        {sortedTasks.map((task, index) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            index={index}
            sourceColumnId={column.id}
            onMoveTask={onMoveTask}
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;