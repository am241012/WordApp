import React, { useState } from "react";
import "./style.css";
import WordApp from "./WordApp";
import SelectCat from "./SelectCat";

function App() {
  const [screen, setScreen] = useState<"Home" | "CategorySelect" | "WordApp">(
    "Home"
  );
  const [categoryId, setCategoryId] = useState<number | "all">("all");
  const [maxQuestions, setMaxQuestions] = useState<number>(0);
  const [CorrectCount, setCorrectCount] = useState<number>(0);
  const [ScoreCount, setScoreCount] = useState<number>(0);
  const [streak, setStreak] = useState(0);

  const categories: { id: number | "all"; name: string }[] = [
    { id: "all", name: "すべて" },
    { id: 1, name: "簡単" },
    { id: 2, name: "名詞" },
    { id: 3, name: "動詞" },
    { id: 4, name: "形容詞" },
    { id: 5, name: "副詞" },
  ];

  const handleSelect = (id: number | "all") => {
    setCategoryId(id);
    setScreen("WordApp");
  };

  return (
    <div className="text-center">
      {screen === "Home" && (
        <div>
          <div className="border-b-4 border-indigo-500 pt-4 pb-6 mb-8 sticky top-0 w-full shadow z-50 bg-white">
            <h1 className="mt-8 text-2xl font-bold">英単語 クイズ</h1>
          </div>
          <div className="mt-4 text-[16px]">
            <p>問題数を選んでチャレンジしよう！</p>
            <p>得点は正解するたびに増えていくよ！(Max100点加算)</p>
            <p>間違えたら加算値はリセットされるよ！</p>
          </div>
          <div className="p-8 grid grid-cols-2 gap-2  max-w-[500px] mx-auto">
            <button
              onClick={() => {
                setScreen("CategorySelect");
                setMaxQuestions(10);
                setCorrectCount(0);
              }}
              className="btn m-2 p-2 bg-blue-200"
            >
              10問チャレンジへ
            </button>
            <button
              onClick={() => {
                setScreen("CategorySelect");
                setMaxQuestions(50);
                setCorrectCount(0);
              }}
              className="btn m-2 p-2 bg-blue-200"
            >
              50問チャレンジへ
            </button>
            <button
              onClick={() => {
                setScreen("CategorySelect");
                setMaxQuestions(100);
                setCorrectCount(0);
              }}
              className="btn m-2 p-2 bg-blue-200"
            >
              100問チャレンジへ
            </button>
            <button
              onClick={() => {
                setScreen("CategorySelect");
                setMaxQuestions(200);
                setCorrectCount(0);
              }}
              className="btn m-2 p-2 bg-blue-200"
            >
              200問チャレンジへ
            </button>
          </div>
        </div>
      )}

      {screen === "CategorySelect" && (
        <SelectCat categories={categories} onSelect={handleSelect} />
      )}

      {screen === "WordApp" && (
        <WordApp
          maxQuestions={maxQuestions}
          CorrectCount={CorrectCount}
          setCorrectCount={setCorrectCount}
          setScreen={setScreen}
          categoryId={categoryId}
          scoreCount={ScoreCount}
          setScoreCount={setScoreCount}
          streak={streak}
          setStreak={setStreak}
        />
      )}
    </div>
  );
}

export default App;
