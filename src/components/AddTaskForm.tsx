import React, { useState } from 'react';
import { Task } from '../types';
import './AddTaskForm.css';

interface AddTaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => void;
  onClose: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="add-task-form">
          <h2>Add New Task</h2>
          
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
            <button type="submit" className="submit-button">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;