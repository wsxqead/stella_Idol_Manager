import React, { useState } from "react";
import { Member } from "@/types";
import { collabBroadcasts, collabSongs } from "@/lib/constants";

interface CollabBroadcastModalProps {
  members: Member[];
  onClose: () => void;
}

const CollabBroadcastModal: React.FC<CollabBroadcastModalProps> = ({
  members,
  onClose,
}) => {
  const [selectedCollabMembers, setSelectedCollabMembers] = useState<Member[]>(
    []
  );

  // 멤버 선택 핸들러
  const handleSelectMember = (member: Member) => {
    setSelectedCollabMembers(
      (prev) =>
        prev.includes(member)
          ? prev.filter((m) => m.id !== member.id) // 선택 해제
          : [...prev, member] // 선택 추가
    );
  };

  // 합동 방송 실행 (최소 2명 필요)
  const handleCollabBroadcastClick = (broadcastType: string) => {
    if (selectedCollabMembers.length < 2) {
      alert("⚠️ 합동 방송을 진행하려면 최소 2명의 멤버를 선택해야 합니다!");
      return;
    }
    const broadcast =
      collabBroadcasts[broadcastType as keyof typeof collabBroadcasts];
    if (!broadcast) return;

    const fansGained = Math.floor(broadcast.baseFans * broadcast.bonus);
    const revenueGained = Math.floor(broadcast.baseRevenue * broadcast.bonus);

    setSelectedCollabMembers((prev) =>
      prev.map((member) =>
        selectedCollabMembers.includes(member)
          ? {
              ...member,
              fans: member.fans + fansGained / 2,
              balance: member.balance + revenueGained / 2,
            }
          : member
      )
    );

    alert(
      `🎶 ${selectedCollabMembers
        .map((m) => m.name)
        .join(", ")}의 ${broadcastType} 이(가) 성공적으로 진행되었습니다!`
    );
    setSelectedCollabMembers([]); // 선택 초기화
  };

  // 그룹 곡 발매 실행 (최소 2명 필요)
  const handleCollabSongReleaseClick = (songType: string) => {
    if (selectedCollabMembers.length < 2) {
      alert("⚠️ 그룹 곡을 발매하려면 최소 2명의 멤버를 선택해야 합니다!");
      return;
    }

    const song = collabSongs[songType as keyof typeof collabSongs];
    if (!song) return;

    const fansGained = Math.floor(song.baseFans * song.bonus);
    const revenueGained = Math.floor(song.baseRevenue * song.bonus);

    setSelectedCollabMembers((prev) =>
      prev.map((member) =>
        selectedCollabMembers.includes(member)
          ? {
              ...member,
              fans: member.fans + fansGained / 2,
              balance: member.balance + revenueGained / 2,
            }
          : member
      )
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          🎬 합동 방송 & 그룹 곡 발매
        </h2>

        {/* ✅ 합동 방송 멤버 선택 */}
        <h3 className="text-xl font-semibold mb-2">
          👥 합방 멤버 선택 (최소 2명)
        </h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {members.map((member) => (
            <button
              key={member.id}
              className={`p-2 rounded-lg font-bold w-full ${
                selectedCollabMembers.includes(member)
                  ? "bg-green-300"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleSelectMember(member)}
            >
              {member.name}
            </button>
          ))}
        </div>

        {/* ✅ 합동 방송 실행 */}
        <h3 className="text-xl font-semibold mb-2">📺 합동 방송</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Object.keys(collabBroadcasts).map((broadcastType) => (
            <button
              key={broadcastType}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-bold w-full"
              onClick={() => handleCollabBroadcastClick(broadcastType)}
            >
              {broadcastType}
            </button>
          ))}
        </div>

        {/* ✅ 그룹 곡 발매 실행 */}
        <h3 className="text-xl font-semibold mb-2">🎵 그룹 곡 발매</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Object.keys(collabSongs).map((songType) => (
            <button
              key={songType}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 font-bold w-full"
              onClick={() => handleCollabSongReleaseClick(songType)}
            >
              {songType}
            </button>
          ))}
        </div>

        {/* 닫기 버튼 */}
        <div className="text-center">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 font-bold w-full"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollabBroadcastModal;
