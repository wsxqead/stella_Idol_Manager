"use client";

import React, { useEffect, useState } from "react";
import { canUnlockNewMember } from "@/lib/unlockSystem";
import { Member } from "@/types";
import members from "@/lib/members";
import {
  collabSongs,
  collabBroadcasts,
  fanEvents,
  TARGET_FANS,
} from "@/lib/constants";
import TrainingModal from "@/components/TrainingModal";
import BroadcastModal from "@/components/BroadcastModal";
import RestModal from "@/components/RestModal";
import FanEventModal from "@/components/FanEvent";
import SongReleaseModal from "@/components/SongReleaseModal";
import CollabBroadcastModal from "@/components/CollabBroadcastModal";

export default function MembersPage() {
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const [selectedPair, setSelectedPair] = useState<Member[]>([]);

  const [eventMessage, setEventMessage] = useState<string | null>(null);
  const [turnCount, setTurnCount] = useState<number>(0);

  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const [selectedTrainingMember, setSelectedTrainingMember] =
    useState<Member | null>(null);
  const [selectedBroadcastMember, setSelectedBroadcastMember] =
    useState<Member | null>(null);
  const [selectedRestMember, setSelectedRestMember] = useState<Member | null>(
    null
  );
  const [selectedFanEventMember, setSelectedFanEventMember] =
    useState<Member | null>(null);

  const [selectedSongReleaseMember, setSelectedSongReleaseMember] =
    useState<Member | null>(null);

  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);

  // 스텔라이브 전체 팬 수 및 매출 계산
  const totalFans = selectedMembers.reduce(
    (sum, member) => sum + member.fans,
    0
  );
  const totalRevenue = selectedMembers.reduce(
    (sum, member) => sum + member.balance,
    0
  );

  // 이벤트 발생 체크 (5턴마다 실행)
  useEffect(() => {
    if (turnCount > 0 && turnCount % 5 === 0) {
      triggerFanEvent();
    }
  }, [turnCount]);

  // 목표 팬 수 도달 시 엔딩 체크
  useEffect(() => {
    if (totalFans >= TARGET_FANS) {
      setGameEnded(true);
    }
  }, [totalFans]);

  // 랜덤 팬 증가 이벤트 발생
  const triggerFanEvent = () => {
    const randomEvent = fanEvents[Math.floor(Math.random() * fanEvents.length)];
    setEventMessage(randomEvent.message);

    // 전체 팬 수 증가 적용
    setSelectedMembers((prevMembers) =>
      prevMembers.map((member) => ({
        ...member,
        fans: member.fans + Math.floor(randomEvent.fans / prevMembers.length),
      }))
    );

    // 3초 후 이벤트 메시지 사라지도록 설정
    setTimeout(() => setEventMessage(null), 3000);
  };

  // 선택되지 않은 멤버 필터링
  const availableMembers = members.filter(
    (m) => !selectedMembers.some((sm) => sm.id === m.id)
  );
  const canUnlock = canUnlockNewMember(totalFans, selectedMembers.length);

  // 멤버 선택
  const handleSelectMember = (member: Member) => {
    setSelectedMembers([...selectedMembers, member]);
  };

  // 협업 방송 실행
  const handleCollabBroadcast = (broadcastType: string) => {
    if (selectedPair.length !== 2) {
      alert("협업 방송을 진행하려면 2명의 멤버를 선택하세요!");
      return;
    }

    const broadcast =
      collabBroadcasts[broadcastType as keyof typeof collabBroadcasts];
    if (!broadcast) return;

    const fansGained = Math.floor(broadcast.baseFans * broadcast.bonus);
    const revenueGained = Math.floor(broadcast.baseRevenue * broadcast.bonus);

    setSelectedMembers((prev) =>
      prev.map((member) =>
        selectedPair.includes(member)
          ? {
              ...member,
              fans: member.fans + fansGained / 2,
              balance: member.balance + revenueGained / 2,
            }
          : member
      )
    );

    alert(
      `🎤 ${selectedPair[0].name} & ${selectedPair[1].name}의 ${broadcastType}이(가) 성공적으로 진행되었습니다!`
    );
    setSelectedPair([]); // 선택 초기화
  };

  // 협업 곡 발매 실행
  const handleCollabSongRelease = (songType: string) => {
    if (selectedPair.length !== 2) {
      alert("협업 곡을 발매하려면 2명의 멤버를 선택하세요!");
      return;
    }

    const song = collabSongs[songType as keyof typeof collabSongs];
    if (!song) return;

    const fansGained = Math.floor(song.baseFans * song.bonus);
    const revenueGained = Math.floor(song.baseRevenue * song.bonus);

    setSelectedMembers((prev) =>
      prev.map((member) =>
        selectedPair.includes(member)
          ? {
              ...member,
              fans: member.fans + fansGained / 2,
              balance: member.balance + revenueGained / 2,
            }
          : member
      )
    );

    alert(
      `🎶 ${selectedPair[0].name} & ${selectedPair[1].name}의 ${songType}이(가) 발매되었습니다!`
    );
    setSelectedPair([]); // 선택 초기화
  };

  // 훈련 완료 시 멤버 업데이트
  const handleTrainingComplete = (updatedMember: Member) => {
    setSelectedMembers(
      selectedMembers.map((m) =>
        m.id === updatedMember.id ? updatedMember : m
      )
    );
  };

  // 방송 완료 시 멤버 업데이트
  const handleBroadcastComplete = (updatedMember: Member) => {
    setSelectedMembers(
      selectedMembers.map((m) =>
        m.id === updatedMember.id ? updatedMember : m
      )
    );
  };

  // 휴식 완료 시 멤버 업데이트
  const handleRestComplete = (updatedMember: Member) => {
    setSelectedMembers(
      selectedMembers.map((m) =>
        m.id === updatedMember.id ? updatedMember : m
      )
    );
  };

  // 곡 발매 결과 업데이트
  const handleSongReleaseComplete = (updatedMember: Member) => {
    setSelectedMembers((prevMembers) =>
      prevMembers.map((m) => (m.id === updatedMember.id ? updatedMember : m))
    );
    setSelectedSongReleaseMember(null);
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
        <div className="bg-yellow-500 text-white p-6 rounded-lg text-center text-2xl font-bold">
          🎉 축하합니다! 100만 팬을 달성하여 세계적인 아이돌 그룹이 되었습니다!
          🎉
        </div>
      ) : selectedMembers.length === 0 ? (
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-semibold">
            🎤 먼저 시작할 멤버를 선택하세요
          </h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {availableMembers.map((member) => (
              <button
                key={member.id}
                className="p-4 bg-white shadow-md rounded-lg text-lg font-bold hover:bg-gray-200 transition"
                onClick={() => handleSelectMember(member)}
              >
                {member.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {canUnlock && availableMembers.length > 0 && (
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-semibold">
                🔓 새로운 멤버 선택 가능!
              </h3>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {availableMembers.map((member) => (
                  <button
                    key={member.id}
                    className="p-4 bg-white shadow-md rounded-lg text-lg font-bold hover:bg-gray-200 transition"
                    onClick={() => handleSelectMember(member)}
                  >
                    {member.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 멤버 카드 */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            {selectedMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white p-4 shadow-md rounded-lg"
              >
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p>
                  🎤 팬 수:{" "}
                  <span className="text-blue-500 font-semibold">
                    {member.fans}
                  </span>
                </p>
                <p>
                  💪 스태미나:{" "}
                  <span className="text-red-500 font-semibold">
                    {member.stamina}
                  </span>
                </p>
                {member.coverSongs > 0 && (
                  <p>🎵 커버곡: {member.coverSongs}개</p>
                )}
                {member.originalSongs > 0 && (
                  <p>🎶 오리지널곡: {member.originalSongs}개</p>
                )}

                {/* 훈련, 방송, 곡 발매, 휴식 버튼 추가 */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                    onClick={() => setSelectedTrainingMember(member)}
                  >
                    훈련
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                    onClick={() => setSelectedBroadcastMember(member)}
                  >
                    방송
                  </button>
                  <button
                    className="bg-purple-500 text-white px-3 py-2 rounded hover:bg-purple-600"
                    onClick={() => setSelectedSongReleaseMember(member)}
                  >
                    곡 발매
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-yellow-600"
                    onClick={() => setSelectedFanEventMember(member)}
                  >
                    🎊 팬 이벤트 관리
                  </button>
                  {/* 합동 방송 버튼 */}
                  <button
                    className="bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600"
                    onClick={() => setIsCollabModalOpen(true)}
                  >
                    🎬 합동 방송 시작
                  </button>

                  <button
                    className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
                    onClick={() => setSelectedRestMember(member)}
                  >
                    휴식
                  </button>

                  {/* ✅ "상세 정보" 버튼만 2칸 차지하도록 수정 */}
                  <button
                    className="bg-indigo-500 text-white px-3 py-2 rounded hover:bg-indigo-600 col-span-2"
                    onClick={() => setSelectedMember(member)}
                  >
                    📋 상세 정보
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 상세 정보 */}
          {selectedMember && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center mb-4 text-indigo-600">
                  {selectedMember.name}의 능력치
                </h2>

                {/* 능력치 리스트 (2열 정렬) */}
                <div className="grid grid-cols-2 gap-3 text-lg">
                  <p>
                    🎤 보컬:{" "}
                    <span className="font-bold">{selectedMember.vocal}</span>
                  </p>
                  <p>
                    💃 댄스:{" "}
                    <span className="font-bold">{selectedMember.dance}</span>
                  </p>
                  <p>
                    🎭 비주얼:{" "}
                    <span className="font-bold">{selectedMember.visual}</span>
                  </p>
                  <p>
                    🎼 작곡:{" "}
                    <span className="font-bold">
                      {selectedMember.composition}
                    </span>
                  </p>
                  <p>
                    🎛 프로듀싱:{" "}
                    <span className="font-bold">
                      {selectedMember.producing}
                    </span>
                  </p>
                  <p>
                    💪 스태미나:
                    <span
                      className={`font-bold ${
                        selectedMember.stamina < 30
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {selectedMember.stamina}
                    </span>
                  </p>
                </div>

                {/* 팬 수 & 곡 정보 */}
                <div className="mt-4 text-lg">
                  <p>
                    📣 개별 팬 수:{" "}
                    <span className="font-bold text-blue-500">
                      {selectedMember.fans}
                    </span>
                  </p>
                  {selectedMember.coverSongs > 0 && (
                    <p>
                      🎵 커버곡:{" "}
                      <span className="font-bold">
                        {selectedMember.coverSongs}개
                      </span>
                    </p>
                  )}
                  {selectedMember.originalSongs > 0 && (
                    <p>
                      🎶 오리지널곡:{" "}
                      <span className="font-bold">
                        {selectedMember.originalSongs}개
                      </span>
                    </p>
                  )}
                </div>

                {/* 닫기 버튼 */}
                <div className="text-center mt-6">
                  <button
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-600 w-full"
                    onClick={() => setSelectedMember(null)}
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 턴 진행 버튼 */}
          <div className="mt-6 text-center">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600"
              onClick={() => setTurnCount(turnCount + 1)}
            >
              다음 턴 진행 ({turnCount}턴)
            </button>
          </div>

          {/* 협업 멤버 선택 */}
          {/* <h3 className="text-xl font-semibold mb-3">
            👥 협업할 멤버 선택 (2명)
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {selectedMembers.map((member) => (
              <button
                key={member.id}
                className={`p-3 bg-white shadow-md rounded-lg text-lg font-bold ${
                  selectedPair.includes(member)
                    ? "bg-green-300"
                    : "hover:bg-gray-200"
                }`}
                onClick={() =>
                  setSelectedPair((prev) =>
                    prev.includes(member)
                      ? prev.filter((m) => m.id !== member.id)
                      : prev.length < 2
                      ? [...prev, member]
                      : prev
                  )
                }
              >
                {member.name}
              </button>
            ))}
          </div> */}

          {/* 협업 방송 실행 */}
          {/* <h3 className="text-xl font-semibold mt-6">📺 협업 방송</h3>
          <div className="grid grid-cols-3 gap-4 mt-3">
            {Object.keys(collabBroadcasts).map((broadcastType) => (
              <button
                key={broadcastType}
                className="bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600"
                onClick={() => handleCollabBroadcast(broadcastType)}
              >
                {broadcastType}
              </button>
            ))}
          </div> */}

          {/* 협업 곡 발매 실행 */}
          {/* <h3 className="text-xl font-semibold mt-6">🎵 듀엣 곡 발매</h3>
          <div className="grid grid-cols-3 gap-4 mt-3">
            {Object.keys(collabSongs).map((songType) => (
              <button
                key={songType}
                className="bg-purple-500 text-white p-3 rounded-lg font-bold hover:bg-purple-600"
                onClick={() => handleCollabSongRelease(songType)}
              >
                {songType}
              </button>
            ))}
          </div> */}

          {/* 훈련 모달 */}
          {selectedTrainingMember && (
            <TrainingModal
              member={selectedTrainingMember}
              onClose={() => setSelectedTrainingMember(null)}
              onTrainComplete={handleTrainingComplete}
            />
          )}

          {/* 방송 모달 */}
          {selectedBroadcastMember && (
            <BroadcastModal
              member={selectedBroadcastMember}
              onClose={() => setSelectedBroadcastMember(null)}
              onBroadcastComplete={handleBroadcastComplete}
            />
          )}

          {/* 휴식 모달 */}
          {selectedRestMember && (
            <RestModal
              member={selectedRestMember}
              onClose={() => setSelectedRestMember(null)}
              onRestComplete={handleRestComplete}
            />
          )}

          {/* 팬 이벤트 모달 */}
          {selectedFanEventMember && (
            <FanEventModal
              member={selectedFanEventMember}
              totalFans={totalFans}
              onClose={() => setSelectedFanEventMember(null)}
              onFanEventComplete={(updatedMember) => {
                setSelectedMembers((prevMembers) =>
                  prevMembers.map((m) =>
                    m.id === updatedMember.id ? updatedMember : m
                  )
                );
              }}
            />
          )}

          {/* 곡 발매 모달 */}
          {selectedSongReleaseMember && (
            <SongReleaseModal
              member={selectedSongReleaseMember}
              onClose={() => setSelectedSongReleaseMember(null)}
              onSongReleaseComplete={handleSongReleaseComplete}
            />
          )}

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
