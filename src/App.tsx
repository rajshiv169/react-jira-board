import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
  const [board, setBoard] = useState<Board>(() => {
    const savedBoard = localStorage.getItem('board');
    if (savedBoard) {
      try {
        const parsedBoard = JSON.parse(savedBoard);
        if (!parsedBoard.tasks || !parsedBoard.columns || !parsedBoard.columnOrder) {
          console.error('Invalid board structure in localStorage');
          return initialBoard;
        }
        const isValid = Object.values(parsedBoard.columns).every((column: any) => {
          return column.taskIds.every((taskId: string) => parsedBoard.tasks[taskId]);
        });
        if (!isValid) {
          console.error('Inconsistent task IDs found in localStorage');
          return initialBoard;
        }
        return parsedBoard;
      } catch (error) {
        console.error('Error parsing saved board:', error);
        return initialBoard;
      }
    }
    return initialBoard;
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('board', JSON.stringify(board));
    } catch (error) {
      console.error('Error saving board to localStorage:', error);
    }
  }, [board]);

  const moveTask = (taskId: string, sourceColumnId: string, targetColumnId: string, targetIndex: number) => {
    const sourceColumn = board.columns[sourceColumnId];
    const targetColumn = board.columns[targetColumnId];
    
    if (!sourceColumn || !targetColumn) return;

    const sourceTaskIds = Array.from(sourceColumn.taskIds);
    const targetTaskIds = sourceColumnId === targetColumnId ? sourceTaskIds : Array.from(targetColumn.taskIds);
    const sourceIndex = sourceTaskIds.indexOf(taskId);

    if (sourceIndex === -1) return;

    // Remove from source column
    sourceTaskIds.splice(sourceIndex, 1);

    // If moving within the same column, adjust target index if it's after the source index
    if (sourceColumnId === targetColumnId && targetIndex > sourceIndex) {
      targetIndex--;
    }

    // Add to target column
    targetTaskIds.splice(targetIndex, 0, taskId);

    const task = board.tasks[taskId];
    const newStatus = targetColumn.title.toLowerCase().replace(' ', '-') as Task['status'];

    setBoard({
      ...board,
      tasks: {
        ...board.tasks,
        [taskId]: {
          ...task,
          status: newStatus,
        },
      },
      columns: {
        ...board.columns,
        [sourceColumnId]: {
          ...sourceColumn,
          taskIds: sourceTaskIds,
        },
        [targetColumnId]: {
          ...targetColumn,
          taskIds: sourceColumnId === targetColumnId ? targetTaskIds : targetTaskIds,
        },
      },
    });
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    const taskId = uuidv4();
    const newTask: Task = {
      ...task,
      id: taskId,
      status: 'todo',
      createdAt: new Date().toISOString(),
    };

    const column = board.columns['column-1'];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.push(taskId);

    const newState = {
      ...board,
      tasks: {
        ...board.tasks,
        [taskId]: newTask,
      },
      columns: {
        ...board.columns,
        'column-1': {
          ...column,
          taskIds: newTaskIds,
        },
      },
    };

    setBoard(newState);
    setIsFormOpen(false);
  };

  const deleteTask = (taskId: string) => {
    // Find which column contains the task
    const columnId = Object.keys(board.columns).find(colId => 
      board.columns[colId].taskIds.includes(taskId)
    );

    if (!columnId || !board.columns[columnId]) return;

    const column = board.columns[columnId];
    const newTaskIds = column.taskIds.filter(id => id !== taskId);
    
    const newTasks = { ...board.tasks };
    delete newTasks[taskId];

    setBoard({
      ...board,
      tasks: newTasks,
      columns: {
        ...board.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    });
  };

  const updateTask = (taskId: string, updatedTask: Partial<Task>) => {
    const task = board.tasks[taskId];
    if (!task) return;

    setBoard({
      ...board,
      tasks: {
        ...board.tasks,
        [taskId]: {
          ...task,
          ...updatedTask,
        },
      },
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <header className="app-header">
          <h1>React Jira Board</h1>
          <button className="add-task-button" onClick={() => setIsFormOpen(true)}>
            Add Task
          </button>
        </header>
        <BoardComponent 
          board={board} 
          onMoveTask={moveTask} 
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
        />
        {isFormOpen && (
          <AddTaskForm onSubmit={addTask} onClose={() => setIsFormOpen(false)} />
        )}
      </div>
    </DndProvider>
  );
};

export default App;