import React from "react";

type Props = {
  qttl?: string;
};

const WordScreen = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h2 className="text-xs mb-4">
        ４つの内、下の単語に合っている意味を選んでください
      </h2>
      <div className="border-2 border-indigo-500 rounded-lg p-4 mt-6 pl-8 pr-8 flex flex-col items-center">
        <p className="text-lg font-bold mt-4 mb-4">{props.qttl}</p>
      </div>
    </div>
  );
};

export default WordScreen;
