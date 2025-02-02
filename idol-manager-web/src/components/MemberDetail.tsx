import React from "react";
import { Member } from "@/types";
import Image from "next/image";

interface MemberDetailProps {
  member: Member;
  onClose: () => void;
}

const MemberDetail: React.FC<MemberDetailProps> = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-4 text-indigo-600">
          {member.name}의 능력치
        </h2>

        {/* 맴버 프로필 이미지 */}
        <div className="flex justify-center mb-4">
          <Image
            src={member.image}
            alt={member.name}
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>

        {/* 능력치 리스트 (2열 정렬) */}
        <div className="grid grid-cols-2 gap-3 text-lg">
          <p>🎤 보컬: <span className="font-bold">{member.vocal}</span></p>
          <p>💃 댄스: <span className="font-bold">{member.dance}</span></p>
          <p>🎭 비주얼: <span className="font-bold">{member.visual}</span></p>
          <p>🎼 작곡: <span className="font-bold">{member.composition}</span></p>
          <p>🎛 프로듀싱: <span className="font-bold">{member.producing}</span></p>
          <p>
            💪 스태미나:
            <span className={`font-bold ${member.stamina < 30 ? "text-red-500" : "text-green-600"}`}>
              {member.stamina}
            </span>
          </p>
        </div>

        {/* 팬 수 & 곡 정보 */}
        <div className="mt-4 text-lg">
          <p>📣 개별 팬 수: <span className="font-bold text-blue-500">{member.fans}</span></p>
          {member.coverSongs > 0 && <p>🎵 커버곡: <span className="font-bold">{member.coverSongs}개</span></p>}
          {member.originalSongs > 0 && <p>🎶 오리지널곡: <span className="font-bold">{member.originalSongs}개</span></p>}
        </div>

        {/* 닫기 버튼 */}
        <div className="text-center mt-6">
          <button className="bg-gray-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-600 w-full" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
