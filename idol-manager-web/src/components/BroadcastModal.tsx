import React from "react";
import { performBroadcast, broadcastOptions } from "@/lib/performBroadcast";
import { Member } from "@/types";

interface BroadcastModalProps {
  member: Member;
  onClose: () => void;
  onBroadcastComplete: (updatedMember: Member) => void;
}

const BroadcastModal: React.FC<BroadcastModalProps> = ({
  member,
  onClose,
  onBroadcastComplete,
}) => {
  const handleBroadcast = (broadcastType: string) => {
    const { member: updatedMember, message } = performBroadcast(
      member,
      broadcastType
    );
    onBroadcastComplete(updatedMember); // 업데이트된 멤버 반환
    alert(`${member.name}의 ${broadcastType} 방송 결과: ${message}`);
    onClose(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">📺 {member.name} 방송하기</h3>
        {Object.keys(broadcastOptions).map((broadcastType) => (
          <button
            key={broadcastType}
            className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 m-1"
            onClick={() => handleBroadcast(broadcastType)}
          >
            {broadcastType}
          </button>
        ))}
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

export default BroadcastModal;
