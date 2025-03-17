import React from 'react';
import { Board as BoardType } from '../types';
import Column from './Column';
import './Board.css';

interface BoardProps {
  board: BoardType;
  onMoveTask: (taskId: string, sourceColumnId: string, targetColumnId: string, targetIndex: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onMoveTask }) => {
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
          />
        );
      })}
    </div>
  );
};

export default Board;