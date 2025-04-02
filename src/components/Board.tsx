import React from 'react';
import { Board as BoardType, Task } from '../types';
import Column from './Column';
import './Board.css';

interface BoardProps {
  board: BoardType;
  onMoveTask: (taskId: string, sourceColumnId: string, targetColumnId: string, targetIndex: number) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updatedTask: Partial<Task>) => void;
}

const Board: React.FC<BoardProps> = ({ board, onMoveTask, onDeleteTask, onUpdateTask }) => {
  return (
    <div className="board">
      {board.columnOrder.map((columnId) => {
        const column = board.columns[columnId];
        const tasks = column.taskIds.map((taskId) => board.tasks[taskId]);
        return (
          <Column 
            key={column.id} 
            column={column} 
            tasks={tasks} 
            onMoveTask={onMoveTask}
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
          />
        );
      })}
    </div>
  );
};

export default Board;