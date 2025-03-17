import React from 'react';
import { Board as BoardType } from '../types';
import Column from './Column';
import './Board.css';

interface BoardProps {
  board: BoardType;
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div className="board">
      {board.columnOrder.map((columnId) => {
        const column = board.columns[columnId];
        const tasks = column.taskIds.map((taskId) => board.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </div>
  );
};

export default Board;