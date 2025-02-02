import React from "react";

interface GameEndingProps {
  onRestart: () => void;
}

const GameEnding: React.FC<GameEndingProps> = ({ onRestart }) => {
  return (
    <div className="bg-yellow-500 text-white p-6 rounded-lg text-center text-2xl font-bold">
      🎉 축하합니다! 100만 팬을 달성하여 세계적인 아이돌 그룹이 되었습니다! 🎉
      <div className="mt-4">
        <button
          className="bg-gray-800 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-gray-700"
          onClick={onRestart}
        >
          다시 시작하기
        </button>
      </div>
    </div>
  );
};

export default GameEnding;
