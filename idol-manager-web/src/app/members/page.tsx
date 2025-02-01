"use client";

import React, { useState } from "react";
import { performBroadcast, broadcastOptions } from "@/lib/performBroadcast";
import { trainMember, trainingOptions } from "@/lib/trainMember";
import { restMember, restOptions } from "@/lib/restMember";
import { releaseSong, songTypes } from "@/lib/releaseSong";
import { canUnlockNewMember } from "@/lib/unlockSystem";
import { holdConcert } from "@/lib/holdConcert";
import { Member } from "@/types";
import members from "@/lib/members";
import memberSpecialties from "@/lib/memberSpecialties";

export default function MembersPage() {
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // 스텔라이브 전체 팬 수 및 매출 계산
  const totalFans = selectedMembers.reduce(
    (sum, member) => sum + member.fans,
    0
  );
  const totalRevenue = selectedMembers.reduce(
    (sum, member) => sum + member.balance,
    0
  );

  // 선택되지 않은 멤버 필터링
  const availableMembers = members.filter(
    (m) => !selectedMembers.some((sm) => sm.id === m.id)
  );
  const canUnlock = canUnlockNewMember(totalFans, selectedMembers.length);

  // 멤버 선택
  const handleSelectMember = (member: Member) => {
    setSelectedMembers([...selectedMembers, member]);
  };

  // 훈련 기능
  const handleTraining = (member: Member, trainingType: string) => {
    if (member.stamina <= 0) {
      alert(`${member.name}의 스태미나가 부족하여 훈련할 수 없습니다!`);
      return;
    }
    const updatedMember = trainMember(member, trainingType);
    setSelectedMembers(
      selectedMembers.map((m) => (m.id === member.id ? updatedMember : m))
    );

    if (selectedMember?.id === member.id) {
      setSelectedMember(updatedMember);
    }
  };

  // 곡 발매 기능
  const handleReleaseSong = (member: Member, songType: string) => {
    const { member: updatedMember, message } = releaseSong(member, songType);
    setSelectedMembers(
      selectedMembers.map((m) => (m.id === member.id ? updatedMember : m))
    );
    alert(`${member.name}의 ${songType} 발매 결과: ${message}`);
  };

  // 콘서트 개최 기능
  const handleHoldConcert = (member: Member) => {
    const { member: updatedMember, message } = holdConcert(member);
    setSelectedMembers(
      selectedMembers.map((m) => (m.id === member.id ? updatedMember : m))
    );
    alert(`${member.name}의 콘서트 결과: ${message}`);
  };

  // 휴식 기능
  const handleRest = (member: Member, restType: string) => {
    const { member: updatedMember, message } = restMember(member, restType);
    setSelectedMembers(
      selectedMembers.map((m) => (m.id === member.id ? updatedMember : m))
    );
    alert(`${member.name}의 ${restType} 결과: ${message}`);
  };

  // 방송 기능
  const handleBroadcast = (member: Member, broadcastType: string) => {
    const { member: updatedMember, message } = performBroadcast(
      member,
      broadcastType
    );
    setSelectedMembers(
      selectedMembers.map((m) => (m.id === member.id ? updatedMember : m))
    );
    alert(`${member.name}의 ${broadcastType} 방송 결과: ${message}`);
  };

  return (
    <div className="member-container">
      <h2>아이돌 매니저 게임 🎤</h2>
      <p>🎤 **스텔라이브 전체 팬 수**: {totalFans}</p>
      <p>💰 **스텔라이브 전체 매출**: {totalRevenue}₩</p>

      {selectedMembers.length === 0 ? (
        <div>
          <h3>🎤 먼저 시작할 멤버를 선택하세요</h3>
          <ul>
            {availableMembers.map((member) => (
              <li key={member.id}>
                <button
                  className="btn-primary"
                  onClick={() => handleSelectMember(member)}
                >
                  {member.name} 선택하기
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          {canUnlock && availableMembers.length > 0 && (
            <div>
              <h3>🔓 새로운 멤버 선택 가능!</h3>
              <ul>
                {availableMembers.map((member) => (
                  <li key={member.id}>
                    <button
                      className="btn-secondary"
                      onClick={() => handleSelectMember(member)}
                    >
                      {member.name} 추가하기
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 훈련 기능 */}
          <h3>🎯 훈련하기</h3>
          {selectedMembers.map((member) => (
            <div key={member.id} className="training-section">
              <p>
                👤 {member.name} (스태미나: {member.stamina}, 팬 수:{" "}
                {member.fans})
              </p>
              {Object.keys(trainingOptions).map((trainingType) => (
                <button
                  key={trainingType}
                  className="btn-training"
                  onClick={() => handleTraining(member, trainingType)}
                  disabled={member.stamina <= 0}
                >
                  {trainingType}
                </button>
              ))}
            </div>
          ))}

          {/* 곡 발매 기능 추가 */}
          <h3>🎵 곡 발매</h3>
          {selectedMembers.map((member) => (
            <div key={member.id} className="song-section">
              <p>🎶 {member.name}의 곡 발매</p>
              {Object.keys(songTypes).map((songType) => (
                <button
                  key={songType}
                  className="btn-song"
                  onClick={() => handleReleaseSong(member, songType)}
                >
                  {songType}
                </button>
              ))}
            </div>
          ))}

          {/* 콘서트 기능 추가 */}
          <h3>🎤 콘서트 개최</h3>
          {selectedMembers.map((member) => (
            <div key={member.id} className="concert-section">
              <p>🎶 {member.name}의 콘서트</p>
              <button
                className="btn-concert"
                onClick={() => handleHoldConcert(member)}
                disabled={member.originalSongs < 1}
              >
                콘서트 개최
              </button>
            </div>
          ))}

          {/* 휴식 기능 추가 */}
          <h3>🛌 휴식하기</h3>
          {selectedMembers.map((member) => (
            <div key={member.id} className="rest-section">
              <p>
                🧘 {member.name} (스태미나: {member.stamina})
              </p>
              {Object.keys(restOptions).map((restType) => (
                <button
                  key={restType}
                  className="btn-rest"
                  onClick={() => handleRest(member, restType)}
                >
                  {restType}
                </button>
              ))}
            </div>
          ))}

          {/* 방송 기능 추가 */}
          <h3>📺 방송 활동</h3>
          {selectedMembers.map((member) => (
            <div key={member.id} className="broadcast-section">
              <p>📡 {member.name}의 방송</p>
              {Object.keys(broadcastOptions).map((broadcastType) => (
                <button
                  key={broadcastType}
                  className={`btn-broadcast ${
                    memberSpecialties[member.name]?.includes(broadcastType)
                      ? "specialty"
                      : ""
                  }`}
                  onClick={() => handleBroadcast(member, broadcastType)}
                >
                  {broadcastType}
                </button>
              ))}
            </div>
          ))}

          {/* 상세 정보 */}
          {selectedMember && (
            <div className="member-stats">
              <h4>{selectedMember.name}의 능력치</h4>
              <p>보컬: {selectedMember.vocal}</p>
              <p>댄스: {selectedMember.dance}</p>
              <p>비주얼: {selectedMember.visual}</p>
              <p>작곡: {selectedMember.composition}</p>
              <p>프로듀싱: {selectedMember.producing}</p>
              <p>스태미나: {selectedMember.stamina}</p>
              <p>📣 개별 팬 수: {selectedMember.fans}</p>
              {selectedMember.coverSongs > 0 && (
                <p>🎵 커버곡: {selectedMember.coverSongs}개</p>
              )}
              {selectedMember.originalSongs > 0 && (
                <p>🎶 오리지널곡: {selectedMember.originalSongs}개</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
