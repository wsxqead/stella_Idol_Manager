import React from "react";
import { releaseSong, songTypes } from "@/lib/releaseSong";
import { Member } from "@/types";

interface SongReleaseModalProps {
  member: Member;
  onClose: () => void;
  onSongReleaseComplete: (updatedMember: Member) => void;
}

const SongReleaseModal: React.FC<SongReleaseModalProps> = ({
  member,
  onClose,
  onSongReleaseComplete,
}) => {
  // 곡 발매 처리 함수
  const handleReleaseSong = (songType: string) => {
    const { member: updatedMember, message } = releaseSong(member, songType);
    onSongReleaseComplete(updatedMember);
    alert(`${member.name}의 ${songType} 발매 결과: ${message}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-[400px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🎵 곡 발매
        </h2>

        {/* 곡 발매 버튼 목록 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.keys(songTypes).map((songType) => (
            <button
              key={songType}
              className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition font-bold shadow-md"
              onClick={() => handleReleaseSong(songType)}
            >
              {songType}
            </button>
          ))}
        </div>

        {/* 닫기 버튼 */}
        <div className="text-center">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition font-bold shadow-md"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongReleaseModal;
