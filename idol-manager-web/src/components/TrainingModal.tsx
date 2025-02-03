import React from "react";
import { trainMember, trainingOptions } from "@/lib/trainMember";
import { Member } from "@/types";

interface TrainingModalProps {
  member: Member;
  onClose: () => void;
  onTrainComplete: (updatedMember: Member) => void;
}

const TrainingModal: React.FC<TrainingModalProps> = ({
  member,
  onClose,
  onTrainComplete,
}) => {
  const handleTraining = (trainingType: string) => {
    if (member.stamina <= 0) {
      alert(`${member.name}의 스태미나가 부족하여 훈련할 수 없습니다!`);
      return;
    }

    const updatedMember = trainMember(member, trainingType);
    onTrainComplete(updatedMember); // 업데이트된 멤버 반환
    onClose(); // 모달 닫기
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-2xl font-bold text-center mb-4">
        🎯 {member.name} 훈련하기
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(trainingOptions).map((trainingType) => (
          <div
            key={trainingType}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center border border-gray-300"
          >
            <h3 className="text-lg font-bold text-center"> {trainingType}</h3>
            <button
              key={trainingType}
              className="bg-blue-500 text-white w-full p-2 rounded mt-2 hover:bg-blue-600"
              onClick={() => handleTraining(trainingType)}
              disabled={member.stamina <= 0}
            >
              훈련하기
            </button>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 mt-4"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default TrainingModal;
