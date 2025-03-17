import React from 'react';
import { useDrag } from 'react-dnd';
import { Task } from '../types';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  index: number;
  sourceColumnId: string;
  onMoveTask: (taskId: string, sourceColumnId: string, targetColumnId: string, targetIndex: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, sourceColumnId, onMoveTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, sourceColumnId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`task-card ${isDragging ? 'dragging' : ''} priority-${task.priority}`}
    >
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`priority-badge ${task.priority}`}>
          {task.priority}
        </span>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-footer">
        <span className="task-date">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;