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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          🎯 {member.name} 훈련하기
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-4">
          {Object.keys(trainingOptions).map((trainingType) => (
            <button
              key={trainingType}
              className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 m-1"
              onClick={() => handleTraining(trainingType)}
              disabled={member.stamina <= 0}
            >
              {trainingType}
            </button>
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
    </div>
  );
};

export default TrainingModal;
