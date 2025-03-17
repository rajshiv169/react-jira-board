import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../types';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task-card ${snapshot.isDragging ? 'dragging' : ''} priority-${task.priority}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
      )}
    </Draggable>
  );
};

export default TaskCard;