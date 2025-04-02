import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Task } from '../types';
import EditTaskForm from './EditTaskForm';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  index: number;
  sourceColumnId: string;
  onMoveTask: (taskId: string, sourceColumnId: string, targetColumnId: string, targetIndex: number) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updatedTask: Partial<Task>) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  index, 
  sourceColumnId, 
  onMoveTask, 
  onDeleteTask,
  onUpdateTask 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, sourceColumnId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteTask(task.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleUpdate = (taskId: string, updatedTask: Partial<Task>) => {
    onUpdateTask(taskId, updatedTask);
    setIsEditing(false);
  };

  return (
    <>
      <div
        ref={drag}
        className={`task-card ${isDragging ? 'dragging' : ''} priority-${task.priority}`}
      >
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <div className="task-controls">
            <span className={`priority-badge ${task.priority}`}>
              {task.priority}
            </span>
            <button 
              className="edit-button"
              onClick={handleEdit}
              title="Edit task"
            >
              ✎
            </button>
            <button 
              className="delete-button"
              onClick={handleDelete}
              title="Delete task"
            >
              ×
            </button>
          </div>
        </div>
        <p className="task-description">{task.description}</p>
        <div className="task-footer">
          <span className="task-date">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      {isEditing && (
        <EditTaskForm
          task={task}
          onSubmit={handleUpdate}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
};

export default TaskCard;