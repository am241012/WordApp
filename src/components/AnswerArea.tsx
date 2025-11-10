import React from "react";

type Props = {
  options: [number, string, string][];
  onAnswer: (choice: [number, string, string]) => void;
};

export default function AnswerArea({ options, onAnswer }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-5 w-64 mx-auto">
      {options.map((opt, i) => (
        <button
          key={`${opt[0]}-${i}`}
          onClick={() => onAnswer(opt)}
          className="p-3 bg-blue-100 hover:bg-blue-200 rounded-lg shadow text-lg"
        >
          {opt[2]}
        </button>
      ))}
    </div>
  );
}
