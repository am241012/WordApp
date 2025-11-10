import React, { useEffect, useState, useCallback } from "react";
import Header from "./components/Header";
import CorrectAnswers from "./components/CorrectAnswers";
import WordScreen from "./components/WordScreen";
import AnswerArea from "./components/AnswerArea";
import ScoreArea from "./components/ScoreArea";

type WordData = [number, string, string];

type Props = {
  maxQuestions: number;
  CorrectCount: number;
  setCorrectCount: React.Dispatch<React.SetStateAction<number>>;
  setScreen: React.Dispatch<
    React.SetStateAction<"Home" | "CategorySelect" | "WordApp">
  >;
  categoryId: number | "all";
  scoreCount: number;
  setScoreCount: React.Dispatch<React.SetStateAction<number>>;
  streak: number;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
};

function WordApp({
  maxQuestions,
  CorrectCount,
  setCorrectCount,
  setScreen,
  categoryId,
  scoreCount,
  setScoreCount,
  streak,
  setStreak,
}: Props) {
  const [data, setData] = useState<WordData[]>([]);
  const [question, setQuestion] = useState<WordData | null>(null);
  const [options, setOptions] = useState<WordData[]>([]);

  const SHEET_ID = "1EMKeKmGgCtzSO7v1CtfXAD6cop0mM3XHHN-VMVLVTXw";
  const API_KEY = "CreateYourAPI";
  const RANGE = "B:D";

  // データ取得
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
      const response = await fetch(url);
      const json = await response.json();
      const values = json.values || [];

      let words: WordData[] = values.slice(1) as WordData[];

      if (categoryId !== "all") {
        words = words.filter((word) => Number(word[0]) === categoryId);
      }

      setData(words);
    };

    fetchData();
  }, [categoryId]);

  // 問題作成
  const makeQuestion = useCallback(() => {
    if (data.length < 4) return;
    const pool = [...data].sort(() => Math.random() - 0.5);
    const correct = pool[0];
    const others = pool.slice(1, 4);
    const choices = [correct, ...others].sort(() => Math.random() - 0.5);

    setQuestion(correct);
    setOptions(choices);
  }, [data]);

  // data更新時に最初の問題を作る
  useEffect(() => {
    if (data.length > 0) {
      makeQuestion();
    }
  }, [data, makeQuestion]);

  // 回答処理
  const handleAnswer = (choice: WordData) => {
    const isCorrect = choice[1] === question?.[1];

    if (isCorrect) {
      let points = 5 * (streak + 1) ** 2;

      points = Math.min(points, 100);

      alert(`✅ 正解！ +${points}点`);

      setCorrectCount((prev) => prev + 1);
      setScoreCount((prev) => prev + points);
      setStreak((prev) => prev + 1);
    } else {
      const penalty = 10;
      alert(`❌ 不正解… 正解は「${question?.[2]}」です\n-${penalty}点`);

      setScoreCount((prev) => Math.max(prev - penalty, 0));
      setStreak(0);
    }

    makeQuestion();
  };

  return (
    <div className="h-screen overflow-hidden min-h-screen bg-white">
      {maxQuestions === CorrectCount ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <h2 className="text-2xl font-bold mb-4">おめでとうございます！</h2>
          <p className="text-lg mb-8">全問正解しました！</p>
          <p className="mb-8">スコアは {scoreCount}点でした！</p>
          <button
            onClick={() => (
              setScreen("Home"),
              setCorrectCount(0),
              setScoreCount(0),
              setStreak(0)
            )}
            className="btn p-2 bg-blue-200"
          >
            ホームに戻る
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-8">
          <Header />
          <CorrectAnswers
            correctCount={CorrectCount}
            maxQuestions={maxQuestions}
          />
          <ScoreArea scoreCount={scoreCount} />
          <WordScreen qttl={question ? question[1] : "読み込み中..."} />
          <AnswerArea options={options} onAnswer={handleAnswer} />
        </div>
      )}
    </div>
  );
}

export default WordApp;


