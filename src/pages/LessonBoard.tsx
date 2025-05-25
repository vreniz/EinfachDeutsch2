import React, { useState } from "react";
import "./LessonBoard.css";

type Board = {
  title: string;
  content: React.ReactNode;
};

interface LessonBoardProps {
  boards: Board[];
}

const LessonBoard: React.FC<LessonBoardProps> = ({ boards }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div>
      <div className="lesson-board-card">
        <h2 className="lesson-board-title">{boards[current].title}</h2>
        <div className="lesson-board-content">{boards[current].content}</div>
      </div>
      <div className="lesson-board-nav">
        <button
          className="lesson-board-arrow"
          onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
          disabled={current === 0}
        >
          &lt;
        </button>
        <div className="lesson-board-pager">
          {boards.map((_, idx) => (
            <button
              key={idx}
              className={`lesson-board-dot${current === idx ? " active" : ""}`}
              onClick={() => setCurrent(idx)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <button
          className="lesson-board-arrow"
          onClick={() => setCurrent((prev) => Math.min(prev + 1, boards.length - 1))}
          disabled={current === boards.length - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default LessonBoard;
