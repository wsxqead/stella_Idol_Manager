import React from "react";
import { Member } from "@/types";
import Image from "next/image";

interface MemberCardProps {
  member: Member;
  onOpenModal: (type: "training" | "broadcast" | "rest" | "fanEvent" | "songRelease", member: Member) => void;
  onOpenDetail: (member: Member) => void;
  onCollabOpen: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({
  member,
  onOpenModal,
  onOpenDetail,
  onCollabOpen,
}) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <Image
        src={member.image}
        alt={member.name}
        width={80}
        height={80}
        className="rounded-full mb-2"
      />
      <h3 className="text-xl font-bold mb-2">{member.name}</h3>
      <p>
        🎤 팬 수:{" "}
        <span className="text-blue-500 font-semibold">{member.fans}</span>
      </p>
      <p>
        💪 스태미나:{" "}
        <span className="text-red-500 font-semibold">{member.stamina}</span>
      </p>
      {member.coverSongs > 0 && <p>🎵 커버곡: {member.coverSongs}개</p>}
      {member.originalSongs > 0 && <p>🎶 오리지널곡: {member.originalSongs}개</p>}

      {/* 버튼 목록 */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
          onClick={() => onOpenModal("training", member)}
        >
          훈련
        </button>
        <button
          className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
          onClick={() => onOpenModal("broadcast", member)}
        >
          방송
        </button>
        <button
          className="bg-purple-500 text-white px-3 py-2 rounded hover:bg-purple-600"
          onClick={() => onOpenModal("songRelease", member)}
        >
          곡 발매
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-yellow-600"
          onClick={() => onOpenModal("fanEvent", member)}
        >
          🎊 팬 이벤트
        </button>
        <button
          className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
          onClick={() => onOpenModal("rest", member)}
        >
          휴식
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600"
          onClick={onCollabOpen}
        >
          🎬 합동 방송 시작
        </button>
        <button
          className="bg-indigo-500 text-white px-3 py-2 rounded hover:bg-indigo-600 col-span-2"
          onClick={() => onOpenDetail(member)}
        >
          📋 상세 정보
        </button>
      </div>
    </div>
  );
};

export default MemberCard;
