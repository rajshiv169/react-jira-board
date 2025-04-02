import React, { useState } from 'react';
import { Task } from '../types';
import './AddTaskForm.css';

interface EditTaskFormProps {
  task: Task;
  onSubmit: (taskId: string, updatedTask: Partial<Task>) => void;
  onClose: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onSubmit, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit(task.id, {
      title: title.trim(),
      description: description.trim(),
      priority,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="add-task-form">
          <h2>Edit Task</h2>
          
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task['priority'])}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={!title.trim()}
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm; 