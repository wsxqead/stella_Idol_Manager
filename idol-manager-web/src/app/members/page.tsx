"use client";

import React, { useEffect, useState } from "react";
import { canUnlockNewMember } from "@/lib/unlockSystem";
import { Member } from "@/types";
import members from "@/lib/members";
import { TARGET_FANS } from "@/lib/constants";
import TrainingModal from "@/components/TrainingModal";
import BroadcastModal from "@/components/BroadcastModal";
import RestModal from "@/components/RestModal";
import FanEventModal from "@/components/FanEvent";
import SongReleaseModal from "@/components/SongReleaseModal";
import CollabBroadcastModal from "@/components/CollabBroadcastModal";
import GameEnding from "@/components/GameEnding";
import MemberSelection from "@/components/MemberSelection";
import MemberDetail from "@/components/MemberDetail";
import FanEventTrigger from "@/components/FanEventTrigger";
import MemberCard from "@/components/MemberCard";

export default function MembersPage() {
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const [eventMessage, setEventMessage] = useState<string | null>(null);
  const [turnCount, setTurnCount] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const [modalState, setModalState] = useState<{
    type: "training" | "broadcast" | "rest" | "fanEvent" | "songRelease" | null;
    member: Member | null;
  }>({ type: null, member: null });

  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);

  // 스텔라이브 전체 팬 수 및 매출 계산
  const totalFans = selectedMembers.reduce((sum, member) => sum + member.fans, 0);
  const totalRevenue = selectedMembers.reduce((sum, member) => sum + member.balance,0);

  // 목표 팬 수 도달 시 엔딩 체크
  useEffect(() => {
    if (totalFans >= TARGET_FANS) {
      setGameEnded(true);
    }
  }, [totalFans]);

  // 선택되지 않은 멤버 필터링
  const availableMembers = members.filter(
    (m) => !selectedMembers.some((sm) => sm.id === m.id)
  );
  const canUnlock = canUnlockNewMember(totalFans, selectedMembers.length);

  // 멤버 선택
  const handleSelectMember = (member: Member) => {
    setSelectedMembers([...selectedMembers, member]);
  };

  // 특정 멤버 업데이트
  const updateMember = (updatedMember: Member) => {
    setSelectedMembers((prevMembers) =>
      prevMembers.map((m) => (m.id === updatedMember.id ? updatedMember : m))
    );
  };

  // 모달 열기 핸들러
  const openModal = (
    type: "training" | "broadcast" | "rest" | "fanEvent" | "songRelease", member: Member
  ) => {
    setModalState({ type, member });
  };

  // 모달 닫기 핸들러
  const closeModal = () => {
    setModalState({ type: null, member: null });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">
        🎤 아이돌 매니저 게임
      </h1>
      {/* 전체 팬 수 및 매출 정보 */}
      <div className="flex justify-between bg-white p-4 shadow-md rounded-lg mb-6">
        <p className="text-lg font-semibold">
          🎤 전체 팬 수: <span className="text-blue-500">{totalFans}</span>
        </p>
        <p className="text-lg font-semibold">
          💰 전체 매출: <span className="text-green-500">{totalRevenue}₩</span>
        </p>
      </div>

      {/* 엔딩 메시지 */}

      {gameEnded ? (
        <GameEnding onRestart={() => setSelectedMembers([])} />
      ) : selectedMembers.length === 0 ? (
        <MemberSelection availableMembers={members} onSelect={handleSelectMember} />
      ) : (
        <>
          {canUnlock && availableMembers.length > 0 && (
            <MemberSelection availableMembers={availableMembers} onSelect={handleSelectMember} unlockMode />
          )}
        {/* 멤버 카드 리스트 렌더링 */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {selectedMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onOpenModal={openModal}
              onOpenDetail={setSelectedMember}
              onCollabOpen={() => setIsCollabModalOpen(true)}
            />
          ))}
        </div>
          
          {selectedMember && <MemberDetail member={selectedMember} onClose={() => setSelectedMember(null)} />}

          {/* 랜덤 팬 증가 이벤트 */}
          <FanEventTrigger turnCount={turnCount} setSelectedMembers={setSelectedMembers} setEventMessage={setEventMessage} />

          {/* 이벤트 메시지 출력 */}
          {eventMessage && (
            <div className="bg-yellow-300 p-4 rounded-lg shadow text-center text-lg font-bold mb-4">
              {eventMessage}
            </div>
          )}

          {/* 턴 진행 버튼 */}
          <div className="mt-6 text-center">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600" onClick={() => setTurnCount(turnCount + 1)}>
              다음 턴 진행 ({turnCount}턴)
            </button>
          </div>

          {modalState.member && modalState.type === "training" && <TrainingModal member={modalState.member} onClose={closeModal} onTrainComplete={updateMember} />}
          {modalState.member && modalState.type === "broadcast" && <BroadcastModal member={modalState.member} onClose={closeModal} onBroadcastComplete={updateMember} />}
          {modalState.member && modalState.type === "rest" && <RestModal member={modalState.member} onClose={closeModal} onRestComplete={updateMember} />}
          {modalState.member && modalState.type === "fanEvent" && <FanEventModal member={modalState.member} totalFans={totalFans} onClose={closeModal} onFanEventComplete={updateMember} />}
          {modalState.member && modalState.type === "songRelease" && <SongReleaseModal member={modalState.member} onClose={closeModal} onSongReleaseComplete={updateMember} />}
          {isCollabModalOpen && <CollabBroadcastModal members={selectedMembers} onClose={() => setIsCollabModalOpen(false)} />}

          {/* 합동 방송 모달 */}
          {isCollabModalOpen && (
            <CollabBroadcastModal
              members={selectedMembers}
              onClose={() => setIsCollabModalOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
