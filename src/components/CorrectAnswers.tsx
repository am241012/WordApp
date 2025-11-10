import React from "react";

type Props = {
  correctCount?: number;
  maxQuestions?: number;
};

const CorrectAnswers = ({ correctCount, maxQuestions }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="flex items-center justify-between w-56 mb-4">
        <p>現在正解数：</p>
        {correctCount !== undefined && (
          <p className="text-sm text-gray-600">{correctCount}問</p>
        )}
      </div>
      <progress
        className="progress progress-primary w-56"
        value={correctCount ?? 0}
        max={maxQuestions ?? 10}
      ></progress>
    </div>
  );
};

export default CorrectAnswers;
