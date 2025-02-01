import React from "react";
import { restMember, restOptions } from "@/lib/restMember";
import { Member } from "@/types";

interface RestModalProps {
  member: Member;
  onClose: () => void;
  onRestComplete: (updatedMember: Member) => void;
}

const RestModal: React.FC<RestModalProps> = ({
  member,
  onClose,
  onRestComplete,
}) => {
  const handleRest = (restType: string) => {
    const { member: updatedMember, message } = restMember(member, restType);
    onRestComplete(updatedMember); // 업데이트된 멤버 반환
    alert(`${member.name}의 ${restType} 결과: ${message}`);
    onClose(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">🛌 {member.name} 휴식하기</h3>
        {Object.keys(restOptions).map((restType) => (
          <button
            key={restType}
            className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 m-1"
            onClick={() => handleRest(restType)}
          >
            {restType}
          </button>
        ))}
        <button
          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 mt-4"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default RestModal;
