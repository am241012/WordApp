import React from "react";

type Props = {
  scoreCount?: number;
};

const ScoreArea = ({ scoreCount }: Props) => {
  return (
    <div className="flex items-center justify-between mt-2 w-32 text-[12px]">
      <p>スコア</p>
      <span>{scoreCount}点</span>
    </div>
  );
};
export default ScoreArea;
