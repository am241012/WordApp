import React from "react";

type Props = {
  categories: { id: number | "all"; name: string }[];
  onSelect: (id: number | "all") => void;
};

export default function SelectCat({ categories, onSelect }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="border-b-4 border-indigo-500 pt-4 pb-6 mb-8 sticky top-0 w-full shadow z-50 bg-white">
        <h1 className="mt-8 text-xl font-bold">英単語 クイズ</h1>
      </div>
      <h2 className="text-2xl mb-6">カテゴリを選択してスタート！</h2>
      <div className="grid grid-cols-2 gap-4 w-72">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="p-3 bg-green-100 hover:bg-green-200 rounded-lg shadow text-lg transition"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
