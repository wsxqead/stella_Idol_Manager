import React from "react";
import { Member } from "@/types";
import Image from "next/image";

interface MemberSelectionProps {
  availableMembers: Member[];
  onSelect: (member: Member) => void;
  title?: string; // 타이틀을 동적으로 변경 가능
  unlockMode?: boolean; // 추가 선택 모드 여부 (기본값 false)
}

const MemberSelection: React.FC<MemberSelectionProps> = ({
  availableMembers,
  onSelect,
  title = "🎤 먼저 시작할 멤버를 선택하세요", // 기본 타이틀 설정
  unlockMode = false,
}) => {
  return (
    <div className="mt-6 text-center">
      <h3 className="text-2xl font-semibold">
        {unlockMode ? "🔓 새로운 멤버 선택 가능!" : title}
      </h3>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {availableMembers.map((member) => (
          <button
            key={member.id}
            className="p-4 bg-white shadow-md rounded-lg text-lg font-bold hover:bg-gray-200 transition"
            onClick={() => onSelect(member)}
          >
            <Image
              src={member.image}
              alt={member.name}
              width={80}
              height={80}
              className="rounded-full mb-2"
            />
            {member.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemberSelection;
