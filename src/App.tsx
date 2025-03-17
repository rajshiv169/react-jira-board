import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { Board, Task } from './types';
import BoardComponent from './components/Board';
import AddTaskForm from './components/AddTaskForm';
import './App.css';

const initialBoard: Board = {
  tasks: {},
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Todo',
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const App: React.FC = () => {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const savedBoard = localStorage.getItem('board');
    if (savedBoard) {
      setBoard(JSON.parse(savedBoard));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('board', JSON.stringify(board));
  }, [board]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = board.columns[source.droppableId];
    const destColumn = board.columns[destination.droppableId];

    // Moving within the same column
    if (sourceColumn === destColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      };

      setBoard({
        ...board,
        columns: {
          ...board.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    // Moving to different column
    const sourceTaskIds = Array.from(sourceColumn.taskIds);
    sourceTaskIds.splice(source.index, 1);
    const newSourceColumn = {
      ...sourceColumn,
      taskIds: sourceTaskIds,
    };

    const destTaskIds = Array.from(destColumn.taskIds);
    destTaskIds.splice(destination.index, 0, draggableId);
    const newDestColumn = {
      ...destColumn,
      taskIds: destTaskIds,
    };

    // Update task status
    const task = board.tasks[draggableId];
    const newStatus = destColumn.title.toLowerCase().replace(' ', '-') as Task['status'];
    
    setBoard({
      ...board,
      tasks: {
        ...board.tasks,
        [draggableId]: {
          ...task,
          status: newStatus,
        },
      },
      columns: {
        ...board.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestColumn.id]: newDestColumn,
      },
    });
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      status: 'todo',
      createdAt: new Date().toISOString(),
    };

    const column = board.columns['column-1'];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.push(newTask.id);

    setBoard({
      ...board,
      tasks: {
        ...board.tasks,
        [newTask.id]: newTask,
      },
      columns: {
        ...board.columns,
        'column-1': {
          ...column,
          taskIds: newTaskIds,
        },
      },
    });
    setIsFormOpen(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Jira Board</h1>
        <button className="add-task-button" onClick={() => setIsFormOpen(true)}>
          Add Task
        </button>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardComponent board={board} />
      </DragDropContext>
      {isFormOpen && (
        <AddTaskForm onSubmit={addTask} onClose={() => setIsFormOpen(false)} />
      )}
    </div>
  );
};

export default App;